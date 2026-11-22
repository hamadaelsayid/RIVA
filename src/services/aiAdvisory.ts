import { StructuralParameters, ScenarioResult } from '../types';

export function calculateDeterministicScenarios(params: StructuralParameters): ScenarioResult {
  const { length, width, depth, ageYears, exposure, structureType } = params;
  const areaM2 = Math.round(length * width);
  const volumeM3 = Math.round((areaM2 * (depth / 100)) * 10) / 10;
  
  // Scanning velocity: RIVA scans roughly 220 m² per hour
  const scanDurationHours = Math.max(0.5, Math.round((areaM2 / 220) * 10) / 10);

  // Exposure multiplier
  const expMultiplier = exposure === 'coastal' ? 1.25 : exposure === 'industrial' ? 1.15 : 1.0;
  
  // Scenario 1: RIVA
  const baseRatePerM2 = 65 * expMultiplier;
  const rivaServiceCostEgp = Math.round(areaM2 * baseRatePerM2);
  const rivaServiceCostUsd = Math.round(rivaServiceCostEgp / 50);
  
  // Hardware ROI calculation (comparing savings vs recurring inspection/coring)
  const hardwareUnitCostEgp = 480000; // ~ $9,600 USD
  const monthlySavings = (rivaServiceCostEgp * 1.6);
  const rivaHardwareRoiMonths = Math.max(1.8, Math.round((hardwareUnitCostEgp / Math.max(monthlySavings, 30000)) * 10) / 10);

  // Scenario 2: Traditional Core Drilling (ECP 203 requires 1 core per 20-30 m²)
  const coresRequired = Math.max(4, Math.round(areaM2 / 25));
  // 4,200 EGP per core (drilling, lab crush test, high-strength non-shrink grout patching) + traffic/facility detour loss
  const trafficDelayEgp = Math.round(areaM2 * 65);
  const traditionalCostEgp = Math.round(coresRequired * 4200 + trafficDelayEgp);
  const traditionalCostUsd = Math.round(traditionalCostEgp / 50);
  const traditionalDowntimeDays = coresRequired > 15 ? 4 : 2;

  // Scenario 3: Do Nothing (De Sitter's Law of Fives)
  // 1 EGP early detection -> 5 EGP spalling repair -> 25 EGP structural replacement
  const projected3YrEscalationEgp = Math.round(rivaServiceCostEgp * 5.2);
  const projected5YrEscalationEgp = Math.round(rivaServiceCostEgp * 24.5);
  
  // Volumetric expansion of rust
  const corrosionVolumeMultiplier = exposure === 'coastal' ? 5.4 : exposure === 'industrial' ? 4.8 : 3.8;

  // Spalling risk score
  const exposureRisk = exposure === 'coastal' ? 38 : exposure === 'industrial' ? 28 : 18;
  const ageRisk = Math.min(55, Math.round(ageYears * 2.1));
  const coverRisk = depth < 25 ? 15 : 5;
  const spallingRiskScore = Math.min(98, Math.max(12, exposureRisk + ageRisk + coverRisk));

  // Advisory text in Arabic and English
  const advisoryTextAr = `بناءً على أبعاد المنشأة (${length}م × ${width}م بسُمك ${depth}سم) وعمرها البالغ ${ageYears} عاماً في بيئة ${
    exposure === 'coastal' ? 'ساحلية مشبعة بالكلوريدات' : exposure === 'industrial' ? 'صناعية معرضة للمواد الكيميائية' : 'حضرية'
  }، تشير المعايير الهندسية إلى وصول مؤشر خطورة تشظي الغطاء الخرساني إلى ${spallingRiskScore}%. نوصي بمسح راداري فوري لكشف بؤر تمدد حديد التسليح قبل تفاقم التكلفة بنسبة 500% خلال 36 شهراً، مع توفير ${Math.round(traditionalCostEgp - rivaServiceCostEgp).toLocaleString('ar-EG')} جنيه مصري مقارنة بأخذ القلوب الإتلافية.`;

  const advisoryTextEn = `Based on dimensions (${length}m × ${width}m × ${depth}cm) and an operating age of ${ageYears} years in a ${exposure} environment, structural vulnerability is evaluated at a risk level of ${spallingRiskScore}%. We strongly recommend an immediate non-destructive RIVA radar pass to map active steel oxidation fronts before volumetric rust expansion triggers spalling, saving an estimated ${(traditionalCostEgp - rivaServiceCostEgp).toLocaleString('en-US')} EGP compared to destructive core extraction.`;

  return {
    areaM2,
    volumeM3,
    scanDurationHours,
    rivaServiceCostEgp,
    rivaServiceCostUsd,
    rivaHardwareRoiMonths,
    rivaDamagePercent: 0,
    rivaAccuracyPercent: 98,
    coresRequired,
    traditionalCostEgp,
    traditionalCostUsd,
    traditionalDowntimeDays,
    traditionalDamagePercent: 22,
    projected3YrEscalationEgp,
    projected5YrEscalationEgp,
    corrosionVolumeMultiplier,
    spallingRiskScore,
    advisoryTextAr,
    advisoryTextEn,
  };
}

export async function generateGeminiAdvisory(
  params: StructuralParameters,
  deterministic: ScenarioResult
): Promise<{ ar: string; en: string }> {
  try {
    const res = await fetch('/api/gemini/advisory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ params, deterministic }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.ar && data.en) {
        return { ar: data.ar, en: data.en };
      }
    }
  } catch (error) {
    console.warn('Server Gemini advisory call failed, using deterministic baseline:', error);
  }

  return {
    ar: deterministic.advisoryTextAr,
    en: deterministic.advisoryTextEn,
  };
}

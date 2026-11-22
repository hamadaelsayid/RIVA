import React, { useState, useMemo } from 'react';
import { ScenarioResult, Language, StructuralParameters } from '../types';
import { content } from '../data/translations';
import { generateRivaPdfReport } from '../services/pdfGenerator';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Clock,
  Activity,
  Download,
  AlertOctagon,
  FileText,
  Radio,
  Check,
  Building,
  Layers,
} from 'lucide-react';

interface ScenarioComparisonProps {
  scenarios: ScenarioResult;
  language: Language;
  params: StructuralParameters;
  onSelectScenario: (scenarioType: 'riva_service' | 'riva_hardware' | 'traditional') => void;
  onScrollToForm: () => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({
  scenarios,
  language,
  params,
  onSelectScenario,
  onScrollToForm,
}) => {
  const t = content[language].simulator;
  const isArabic = language === 'ar';
  const [currency, setCurrency] = useState<'EGP' | 'USD'>('EGP');

  const formatCost = (egp: number, usd: number) => {
    if (currency === 'USD') {
      return `$${usd.toLocaleString('en-US')}`;
    }
    return isArabic
      ? `${egp.toLocaleString('ar-EG')} ج.م`
      : `${egp.toLocaleString('en-US')} EGP`;
  };

  const handleDownloadPdf = () => {
    generateRivaPdfReport({
      params,
      scenarios,
      language,
      clientInfo: {
        organization: isArabic ? 'مؤسسة المشروعات الهندسية المعتمدة' : 'Infrastructure Consulting Bureau',
        contactName: isArabic ? 'المهندس الاستشاري المعتمد' : 'Lead Structural Consultant',
        location: isArabic ? 'مشروع الجسور والأنفاق' : 'Bridge & Concrete Deck Site',
      },
    });
  };

  // Savings calculation vs traditional methods
  const netSavingsEgp = Math.max(0, scenarios.traditionalCostEgp - scenarios.rivaServiceCostEgp);
  const netSavingsUsd = Math.max(0, scenarios.traditionalCostUsd - scenarios.rivaServiceCostUsd);
  const savingsPercent = Math.round((netSavingsEgp / Math.max(scenarios.traditionalCostEgp, 1)) * 100);

  // 5-Year Projected Cumulative Savings calculation for Recharts Line Chart
  const fiveYearSavingsData = useMemo(() => {
    const divisor = currency === 'USD' ? 50 : 1;
    // Year 1: Direct savings vs traditional coring & traffic downtime
    const y1 = Math.round(netSavingsEgp / divisor);
    // Year 2: Prevented micro-crack development & localized moisture ingress
    const y2 = Math.round((netSavingsEgp + scenarios.rivaServiceCostEgp * 1.6) / divisor);
    // Year 3: Prevented De Sitter Level 2 spalling and localized carbonation repairs
    const y3 = Math.round((scenarios.projected3YrEscalationEgp - scenarios.rivaServiceCostEgp * 1.2) / divisor);
    // Year 4: Prevented accelerated rebar section loss
    const y4 = Math.round((scenarios.projected3YrEscalationEgp * 1.5 - scenarios.rivaServiceCostEgp * 1.5) / divisor);
    // Year 5: Prevented major deck spalling / reconstruction ($25x multiplier avoided)
    const y5 = Math.round((scenarios.projected5YrEscalationEgp - scenarios.rivaServiceCostEgp * 2) / divisor);

    return [
      {
        year: isArabic ? 'س1' : 'Y1',
        fullYear: isArabic ? 'السنة الأولى' : 'Year 1',
        savings: y1,
        benchmark: isArabic ? 'توفير فوري بالفحص' : 'Initial NDT Savings',
      },
      {
        year: isArabic ? 'س2' : 'Y2',
        fullYear: isArabic ? 'السنة الثانية' : 'Year 2',
        savings: y2,
        benchmark: isArabic ? 'منع الشروخ الميكروية' : 'Micro-crack Mitigation',
      },
      {
        year: isArabic ? 'س3' : 'Y3',
        fullYear: isArabic ? 'السنة الثالثة' : 'Year 3',
        savings: y3,
        benchmark: isArabic ? 'منع تشظي الخرسانة' : 'Spalling Prevention',
      },
      {
        year: isArabic ? 'س4' : 'Y4',
        fullYear: isArabic ? 'السنة الرابعة' : 'Year 4',
        savings: y4,
        benchmark: isArabic ? 'حماية حديد التسليح' : 'Rebar Rust Shielding',
      },
      {
        year: isArabic ? 'س5' : 'Y5',
        fullYear: isArabic ? 'السنة الخامسة' : 'Year 5',
        savings: y5,
        benchmark: isArabic ? 'تجنب الاستبدال الكامل' : 'Reconstruction Avoided',
      },
    ];
  }, [scenarios, netSavingsEgp, currency, isArabic]);

  return (
    <div className="w-full space-y-8">
      {/* 1. ENTERPRISE DASHBOARD HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>EXECUTIVE FINANCIAL & RISK AUDIT</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {isArabic ? 'مصفوفة مقارنة التكاليف وسيناريوهات المخاطر الإنشائية' : 'Executive Cost Comparison & Risk Scenarios'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            {isArabic
              ? 'تحليل مالي وهندسي مقارن مبني على أبعاد المنشأة وفق قانون دي سيتر (De Sitter\'s Law) والكود المصري ECP 203'
              : 'Comparative civil and financial model calibrated to structural dimensions via De Sitter\'s Law and ECP 203'}
          </p>
        </div>

        {/* Currency Switcher & PDF Download Button */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isArabic ? 'تحميل التقرير المعتمد (PDF)' : 'Download PDF Report'}</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
            <button
              onClick={() => setCurrency('EGP')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'EGP' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇪🇬 EGP
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇺🇸 USD
            </button>
          </div>
        </div>
      </div>

      {/* Dimensions & Scale Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-medium">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-slate-500" />
          <span>
            {isArabic ? 'المنشأة قيد التحليل:' : 'Structure Under Assessment:'}{' '}
            <strong className="text-slate-900">{t.types[params.structureType]}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-600 font-mono text-[11px]">
          <span>{params.length}m × {params.width}m</span>
          <span>·</span>
          <span>{scenarios.areaM2} m²</span>
          <span>·</span>
          <span>{scenarios.volumeM3} m³</span>
          <span>·</span>
          <span>{isArabic ? `عمر ${params.ageYears} عاماً` : `${params.ageYears} Years Old`}</span>
        </div>
      </div>

      {/* 2. THE 3 DISTINCT SCENARIO CARDS (CLEAN CORPORATE SEPARATION) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* ============================================================ */}
        {/* CARD 1: RIVA SMART METHOD (Recommended Enterprise Choice)    */}
        {/* ============================================================ */}
        <div className="relative bg-white rounded-3xl border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 p-7 flex flex-col justify-between transition-all hover:shadow-2xl hover:border-cyan-400">
          {/* Top Recommendation Tag */}
          <div className="absolute -top-3.5 right-6 bg-cyan-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الخيار الهندسي الأمثل · توفير 70%+' : 'Recommended Option · 70%+ Savings'}</span>
          </div>

          <div className="space-y-6">
            {/* Header: Title & Architecture */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{t.sc1Title}</h3>
                <p className="text-xs text-cyan-700 font-bold mt-0.5">1.0–2.6 GHz SFCW Autonomous Radar Rover</p>
              </div>
            </div>

            {/* Visual Illustrative Mockup: RIVA Rover on Concrete with Radar Wave Beams */}
            <div className="relative h-36 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-3 overflow-hidden border border-slate-800 flex items-center justify-center">
              <div className="absolute inset-0 radar-grid opacity-20 pointer-events-none" />
              <svg className="w-full h-full" viewBox="0 0 320 130" fill="none">
                {/* Concrete slab background */}
                <rect x="15" y="75" width="290" height="50" rx="4" fill="#334155" />
                
                {/* Concrete top surface line */}
                <line x1="15" y1="75" x2="305" y2="75" stroke="#64748B" strokeWidth="2" />
                
                {/* Internal Rebars (Intact Steel Grid) */}
                <line x1="30" y1="100" x2="290" y2="100" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 4" />
                <circle cx="80" cy="100" r="6" fill="#00CFFF" />
                <circle cx="160" cy="100" r="6" fill="#00CFFF" />
                <circle cx="240" cy="100" r="6" fill="#00CFFF" />

                {/* Radar Waves (Conical Pulse from Rover) */}
                <path d="M 160 55 L 115 110 L 205 110 Z" fill="rgba(0, 207, 255, 0.18)" stroke="#00CFFF" strokeWidth="1" strokeDasharray="3 2" />
                <path d="M 160 62 Q 160 85 140 92" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 160 62 Q 160 85 180 92" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round" />

                {/* Autonomous RIVA Rover Chassis */}
                <rect x="135" y="38" width="50" height="22" rx="4" fill="#0F172A" stroke="#00CFFF" strokeWidth="1.5" />
                <circle cx="145" cy="62" r="5" fill="#1E293B" stroke="#00CFFF" strokeWidth="1" />
                <circle cx="175" cy="62" r="5" fill="#1E293B" stroke="#00CFFF" strokeWidth="1" />
                {/* Rover Antenna */}
                <line x1="160" y1="38" x2="160" y2="28" stroke="#00CFFF" strokeWidth="2" />
                <circle cx="160" cy="26" r="2.5" fill="#38BDF8" />

                {/* HUD Live Telemetry Overlay */}
                <rect x="25" y="10" width="85" height="18" rx="3" fill="rgba(15, 23, 42, 0.85)" stroke="#0284C7" strokeWidth="1" />
                <text x="32" y="22" fill="#38BDF8" fontSize="8" fontFamily="monospace" fontWeight="bold">0% CORING DAMAGE</text>
              </svg>
              <span className="absolute bottom-2 right-3 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                100% NON-DESTRUCTIVE
              </span>
            </div>

            {/* Prominent Price & Savings Hero Callout */}
            <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-1">
              <span className="text-xs font-semibold text-slate-600 block">{t.sc1Cost}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-cyan-950 font-mono tracking-tight">
                  {formatCost(scenarios.rivaServiceCostEgp, scenarios.rivaServiceCostUsd)}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-md">
                  {isArabic ? `وفر ${savingsPercent}%` : `Save ${savingsPercent}%`}
                </span>
              </div>
              <p className="text-[11px] text-cyan-800 font-medium pt-1">
                {isArabic
                  ? `توفير صافي قدره ${formatCost(netSavingsEgp, netSavingsUsd)} مقارنة بالحفر الإتلافي`
                  : `Net estimated savings of ${formatCost(netSavingsEgp, netSavingsUsd)} vs core drilling`}
              </p>
            </div>

            {/* Unboxed Engineering Metrics List */}
            <div className="space-y-3 text-xs text-slate-700 divide-y divide-slate-100">
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t.sc1Duration}</span>
                </span>
                <span className="font-bold text-slate-900 font-mono">
                  {scenarios.scanDurationHours} {isArabic ? 'ساعات فقط' : 'Hours'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.sc1Damage}</span>
                </span>
                <span className="font-bold text-emerald-700 font-mono">
                  0% ({isArabic ? 'صفر تكسير للخرسانة' : 'Zero Damage'})
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t.sc1Accuracy}</span>
                </span>
                <span className="font-bold text-cyan-800 font-mono">
                  {scenarios.rivaAccuracyPercent}% ({isArabic ? 'دقة ±1 ملم' : '±1mm Precision'})
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.sc1Roi}</span>
                </span>
                <span className="font-bold text-slate-900 font-mono">
                  {scenarios.rivaHardwareRoiMonths} {isArabic ? 'أشهر استرداد' : 'Months Payback'}
                </span>
              </div>
            </div>

            {/* 5-Year Projected Cumulative Savings Recharts Line Chart */}
            <div className="p-3.5 rounded-2xl bg-cyan-50/50 border border-cyan-100/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{isArabic ? 'منحنى التوفير المالي (5 سنوات)' : '5-Year Projected Cost Savings'}</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  {fiveYearSavingsData[4]
                    ? formatCost(
                        fiveYearSavingsData[4].savings * (currency === 'USD' ? 50 : 1),
                        fiveYearSavingsData[4].savings
                      )
                    : ''}
                </span>
              </div>

              <div className="w-full h-28 pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fiveYearSavingsData} margin={{ top: 8, right: 6, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="savingsCyanGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="year"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 9, fill: '#64748b' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 9, fill: '#94a3b8' }}
                      tickFormatter={(val) => (val >= 1000 ? `${Math.round(val / 1000)}k` : `${val}`)}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-xl border border-slate-700 shadow-xl text-[11px] space-y-0.5">
                              <div className="font-bold text-cyan-300">{d.fullYear}</div>
                              <div className="font-mono text-white font-bold">
                                {currency === 'USD'
                                  ? `$${d.savings.toLocaleString('en-US')}`
                                  : `${d.savings.toLocaleString('en-US')} EGP`}
                              </div>
                              <div className="text-[10px] text-emerald-400">{d.benchmark}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stroke="#0284c7"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#savingsCyanGrad)"
                      dot={{ r: 3, fill: '#0284c7', strokeWidth: 1.5, stroke: '#ffffff' }}
                      activeDot={{ r: 5, fill: '#00cfff' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[10px] text-slate-500 leading-tight">
                {isArabic
                  ? 'نمذجة مالية تراكمية مبنية على تجنب تكاليف تشظي الخرسانة (قانون دي سيتر)'
                  : 'Cumulative financial forecast based on avoided spalling repairs via De Sitter\'s Law'}
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-8 space-y-2">
            <button
              onClick={() => {
                onSelectScenario('riva_service');
                onScrollToForm();
              }}
              className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
            >
              <span>{t.bookThisPlanBtn}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
            <p className="text-[11px] text-center text-slate-500">
              {isArabic ? 'معاينة مجانية للتقرير التشخيصي المعتمد' : 'Includes certified ECP 203 report'}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CARD 2: TRADITIONAL CORE DRILLING (Destructive Point-Sampling) */}
        {/* ============================================================ */}
        <div className="bg-slate-50/80 rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-6">
            {/* Header: Title & Warning Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{t.sc2Title}</h3>
                <span className="text-xs text-amber-800 font-semibold">{t.sc2Badge}</span>
              </div>
            </div>

            {/* Visual Illustrative Mockup: Concrete Core Drilling with Severed Rebar & Hazard Tape */}
            <div className="relative h-36 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-3 overflow-hidden border border-slate-700/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 320 130" fill="none">
                {/* Concrete slab */}
                <rect x="15" y="65" width="290" height="60" rx="4" fill="#475569" />
                
                {/* Severed Rebars Grid */}
                <line x1="30" y1="95" x2="110" y2="95" stroke="#94A3B8" strokeWidth="3" />
                <line x1="150" y1="95" x2="230" y2="95" stroke="#94A3B8" strokeWidth="3" />
                <line x1="270" y1="95" x2="295" y2="95" stroke="#94A3B8" strokeWidth="3" />

                {/* Drilled Core Hole 1 (Empty cylindrical void) */}
                <rect x="110" y="65" width="40" height="60" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <ellipse cx="130" cy="65" rx="20" ry="6" fill="#334155" stroke="#EF4444" strokeWidth="1.5" />
                <line x1="110" y1="95" x2="114" y2="95" stroke="#EF4444" strokeWidth="3" />
                <line x1="146" y1="95" x2="150" y2="95" stroke="#EF4444" strokeWidth="3" />

                {/* Drilled Core Hole 2 */}
                <rect x="230" y="65" width="40" height="60" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
                <ellipse cx="250" cy="65" rx="20" ry="6" fill="#334155" stroke="#EF4444" strokeWidth="1.5" />

                {/* Diamond Core Drill Rig */}
                <rect x="122" y="20" width="16" height="45" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                <rect x="115" y="14" width="30" height="10" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
                <line x1="130" y1="14" x2="130" y2="6" stroke="#94A3B8" strokeWidth="2" />

                {/* Hazard Road Block Cones */}
                <polygon points="50,65 58,45 66,65" fill="#F97316" stroke="#C2410C" strokeWidth="1" />
                <rect x="47" y="63" width="22" height="3" fill="#FFFFFF" />

                {/* Core hole annotation */}
                <rect x="15" y="10" width="85" height="18" rx="3" fill="rgba(15, 23, 42, 0.9)" stroke="#EF4444" strokeWidth="1" />
                <text x="22" y="22" fill="#FCA5A5" fontSize="8" fontFamily="monospace" fontWeight="bold">CUT REBAR & CORES</text>
              </svg>
              <span className="absolute bottom-2 right-3 text-[10px] font-mono text-amber-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                DESTRUCTIVE CORING
              </span>
            </div>

            {/* Cost Breakdown Callout */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1">
              <span className="text-xs font-semibold text-slate-600 block">{t.sc2Cost}</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-amber-950 font-mono tracking-tight">
                  {formatCost(scenarios.traditionalCostEgp, scenarios.traditionalCostUsd)}
                </span>
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                  {isArabic ? '3.8× أضعاف تكلفة ريفا' : '3.8× Cost of RIVA'}
                </span>
              </div>
              <p className="text-[11px] text-amber-900 font-medium pt-1">
                {isArabic
                  ? 'تشمل تكلفة حفر القلوب، الفحص المعملي، ومونة الترميم الإيبوكسية غير المنكمشة'
                  : 'Includes diamond coring, lab crushing fees, and structural repair mortars'}
              </p>
            </div>

            {/* Unboxed Traditional Metrics List */}
            <div className="space-y-3 text-xs text-slate-700 divide-y divide-slate-200/70">
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.sc2Cores}</span>
                </span>
                <span className="font-bold text-slate-900 font-mono">
                  {scenarios.coresRequired} {isArabic ? 'عينات أسطوانية إتلافية' : 'Drilled Core Holes'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.sc2Downtime}</span>
                </span>
                <span className="font-bold text-amber-800 font-mono">
                  {scenarios.traditionalDowntimeDays} {isArabic ? 'أيام تعطيل وإغلاق للمسار' : 'Days Lane Closure'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>{t.sc2Damage}</span>
                </span>
                <span className="font-bold text-red-600 font-mono">
                  {scenarios.traditionalDamagePercent}% {isArabic ? 'ضعف موضعي دائم' : 'Permanent Scarring'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isArabic ? 'نسبة تغطية الفحص' : 'Scan Coverage Area'}</span>
                </span>
                <span className="font-bold text-slate-800 font-mono">
                  &lt; 8% ({isArabic ? 'فحص نقطي متباعد' : 'Isolated Spot Checks'})
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="mt-8 p-3 rounded-xl bg-amber-100/60 text-amber-900 text-xs font-medium leading-relaxed">
            ⚠️ {t.sc2Blindspots}
          </div>
        </div>

        {/* ============================================================ */}
        {/* CARD 3: "DO NOTHING" (De Sitter’s Law of Fives Breakdown)     */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl border-2 border-rose-900/60 p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Subtle Red Warning Flare in Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 blur-[100px] pointer-events-none" />

          <div className="relative space-y-6">
            {/* Header: Title & Critical Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{t.sc3Title}</h3>
                <span className="text-xs text-rose-400 font-bold">{t.sc3Badge}</span>
              </div>
            </div>

            {/* VISUAL MOCKUP: DE SITTER'S "LAW OF FIVES" STAIRCASE GRAPHIC */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t.sc3LawTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">1 → 5 → 25 MULTIPLIER</span>
              </div>

              {/* Staircase Steps */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                {/* Step 1: Prevention */}
                <div className="p-2 rounded-xl bg-slate-800/80 border border-cyan-800/60">
                  <span className="text-[10px] font-mono text-cyan-300 font-bold block">1X TODAY</span>
                  <span className="text-xs font-black text-white block mt-0.5">
                    {formatCost(scenarios.rivaServiceCostEgp, scenarios.rivaServiceCostUsd)}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-1">
                    {isArabic ? 'كشف بريفا' : 'RIVA NDT'}
                  </span>
                </div>

                {/* Step 2: 3-Year Maintenance */}
                <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-800/60">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block">5X (YEAR 3)</span>
                  <span className="text-xs font-black text-amber-300 block mt-0.5">
                    {formatCost(scenarios.projected3YrEscalationEgp, Math.round(scenarios.projected3YrEscalationEgp / 50))}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-1">
                    {isArabic ? 'ترميم شروخ' : 'Patching'}
                  </span>
                </div>

                {/* Step 3: 5-Year Reconstruction */}
                <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-800">
                  <span className="text-[10px] font-mono text-rose-400 font-bold block">25X (YEAR 5)</span>
                  <span className="text-xs font-black text-rose-200 block mt-0.5">
                    {formatCost(scenarios.projected5YrEscalationEgp, Math.round(scenarios.projected5YrEscalationEgp / 50))}
                  </span>
                  <span className="text-[9px] text-slate-400 block mt-1">
                    {isArabic ? 'استبدال كامل' : 'Rebuild'}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed px-1">
                {t.sc3LawDesc}
              </p>
            </div>

            {/* Dynamic Spalling Risk Score & Rebar Expansion Gauge */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/80 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-rose-200 font-semibold">{t.sc3RiskLevel}</span>
                <span className="text-base font-black text-rose-400 font-mono">
                  {scenarios.spallingRiskScore} / 100
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-full transition-all duration-1000"
                  style={{ width: `${scenarios.spallingRiskScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400">{t.sc3Expansion}</span>
                <span className="font-bold text-orange-400 font-mono">
                  {scenarios.corrosionVolumeMultiplier}x (300%–600%)
                </span>
              </div>
            </div>

            {/* Unboxed Deterioration Metrics List */}
            <div className="space-y-3 text-xs text-slate-300 divide-y divide-slate-800">
              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400">{t.sc3Cost3Yr}</span>
                <span className="font-bold text-amber-400 font-mono">
                  {formatCost(scenarios.projected3YrEscalationEgp, Math.round(scenarios.projected3YrEscalationEgp / 50))}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400">{t.sc3Cost5Yr}</span>
                <span className="font-bold text-rose-400 font-mono text-sm">
                  {formatCost(scenarios.projected5YrEscalationEgp, Math.round(scenarios.projected5YrEscalationEgp / 50))}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-400">{isArabic ? 'ضغط التمدد الداخلي' : 'Tensile Bursting Stress'}</span>
                <span className="font-bold text-white font-mono">
                  35–50 MPa ({isArabic ? 'يتجاوز مقاومة الخرسانة' : 'Exceeds Tensile Limit'})
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Warning Alert */}
          <div className="mt-8 p-3 rounded-xl bg-rose-950/80 text-rose-300 border border-rose-800/80 text-center text-xs font-bold flex items-center justify-center gap-2">
            <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{isArabic ? 'خطر تشظي الغطاء الخرساني وسقوط أجزاء إنشائية' : 'Critical Concrete Spalling Risk'}</span>
          </div>
        </div>

      </div>

      {/* 3. EXECUTIVE AI STRUCTURAL ADVISORY PANEL */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base sm:text-lg font-bold text-white">{t.aiAdvisoryTitle}</h4>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded border border-cyan-800 font-bold">
                  ECP 203 & ASTM D6432
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isArabic
                  ? 'توصية فنية استشارية مبنية على معايير الكود المصري للخرسانة المسلحة ونمذجة الترددات'
                  : 'Certified civil diagnostic assessment calibrated to Egyptian concrete code ECP 203'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{isArabic ? 'تصدير التقرير الفني المعتمد' : 'Export Full Technical Report'}</span>
            </button>
          </div>
        </div>

        {/* Advisory Text Output */}
        <div className="relative pt-6">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {isArabic ? scenarios.advisoryTextAr : scenarios.advisoryTextEn}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{isArabic ? 'دقة متناهية ±1 ملم دون أي ثقب للخرسانة' : '±1mm Precision with Zero Core Holes'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isArabic
                  ? `توفير صافي قدره ${formatCost(netSavingsEgp, netSavingsUsd)}`
                  : `Net Estimated Savings: ${formatCost(netSavingsEgp, netSavingsUsd)}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{isArabic ? 'جاهز للمطابقة الرسمية مع جهاز التفتيش' : 'Compliant with Egyptian Inspection Authority'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

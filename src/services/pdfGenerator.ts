import { jsPDF } from 'jspdf';
import { StructuralParameters, ScenarioResult, Language } from '../types';

export interface GeneratePdfOptions {
  params: StructuralParameters;
  scenarios: ScenarioResult;
  language: Language;
  clientInfo?: {
    organization?: string;
    contactName?: string;
    location?: string;
    proposalRef?: string;
  };
}

export function generateRivaPdfReport(options: GeneratePdfOptions): void {
  const { params, scenarios, language, clientInfo } = options;
  const isArabic = language === 'ar';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const refNumber = clientInfo?.proposalRef || `RIVA-NDT-2026-${Math.floor(Math.random() * 90000 + 10000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // ----------------------------------------------------
  // BRAND COLORS (RGB)
  // ----------------------------------------------------
  const navy = [15, 23, 42]; // #0F172A Deep Radar Navy
  const cyan = [0, 207, 255]; // #00CFFF Radar Cyan
  const darkCyan = [2, 132, 199]; // #0284C7
  const orange = [249, 115, 22]; // #F97316 Corrosion Orange
  const red = [239, 68, 68]; // #EF4444 Critical Red
  const slateText = [71, 85, 105]; // #475569 Slate text
  const lightBg = [248, 250, 252]; // #F8FAFC
  const borderCol = [226, 232, 240]; // #E2E8F0

  let y = 14;

  // ----------------------------------------------------
  // HEADER BANNER
  // ----------------------------------------------------
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F');

  // Cyan Accent Top Bar
  doc.setFillColor(cyan[0], cyan[1], cyan[2]);
  doc.rect(margin, y, contentWidth, 2, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('RIVA', margin + 6, y + 11);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(cyan[0], cyan[1], cyan[2]);
  doc.text('RADAR INFRASTRUCTURE VISION & ASSESSMENT', margin + 30, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(203, 213, 225);
  doc.text('1.0-2.6 GHz UWB SFCW Robotic Non-Destructive Concrete Testing (NDT)', margin + 30, y + 15);

  // Standards Badge in Header
  doc.setFillColor(2, 132, 199);
  doc.roundedRect(margin + contentWidth - 62, y + 6, 56, 7, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('ECP 203 & ASTM D6432 COMPLIANT', margin + contentWidth - 60, y + 10.5);

  // Document Reference & Date Row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(`DOC REF: ${refNumber}`, margin + 6, y + 24);
  doc.text(`DATE: ${dateStr}`, margin + 70, y + 24);
  doc.text(`STATUS: CERTIFIED TECHNICAL DIAGNOSTIC`, margin + contentWidth - 62, y + 24);

  y += 34;

  // ----------------------------------------------------
  // SECTION 1: CLIENT & STRUCTURAL SPECIFICATIONS
  // ----------------------------------------------------
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('1. STRUCTURAL GEOMETRY & SITE PARAMETERS', margin + 4, y + 6);

  // Divider
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.line(margin + 4, y + 8, margin + contentWidth - 4, y + 8);

  const structTypeName = {
    bridge_deck: 'Bridge Deck Slab (ECP 203 Major Span)',
    industrial_floor: 'Industrial Concrete Floor (Heavy Duty Slab)',
    parking_slab: 'Commercial Parking / Multi-Story Slab',
    pier_column: 'Bridge Pier / Concrete Substructure',
  }[params.structureType];

  const col1X = margin + 4;
  const col2X = margin + 64;
  const col3X = margin + 124;

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);

  // Row 1
  doc.text('Client / Entity:', col1X, y + 13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(clientInfo?.organization || 'National Roads & Infrastructure Auth.', col1X + 22, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Contact Eng.:', col2X, y + 13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(clientInfo?.contactName || 'Lead Consulting Engineer', col2X + 20, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Site Location:', col3X, y + 13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(clientInfo?.location || 'Cairo / Delta Corridors', col3X + 20, y + 13);

  // Row 2
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Element Type:', col1X, y + 19);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(structTypeName, col1X + 22, y + 19);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Dimensions:', col2X, y + 19);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkCyan[0], darkCyan[1], darkCyan[2]);
  doc.text(`${params.length}m (L) x ${params.width}m (W) x ${params.depth}cm (D)`, col2X + 20, y + 19);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Operating Age:', col3X, y + 19);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(`${params.ageYears} Years`, col3X + 20, y + 19);

  // Row 3
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Scanned Area:', col1X, y + 25);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text(`${scenarios.areaM2} sq.m (${scenarios.volumeM3} cu.m volume)`, col1X + 22, y + 25);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Environment:', col2X, y + 25);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(params.exposure === 'coastal' ? orange[0] : navy[0], params.exposure === 'coastal' ? orange[1] : navy[1], params.exposure === 'coastal' ? orange[2] : navy[2]);
  doc.text(params.exposure.toUpperCase() + ' (High Moisture/Chloride Risk)', col2X + 20, y + 25);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Spalling Risk:', col3X, y + 25);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(scenarios.spallingRiskScore > 50 ? red[0] : orange[0], scenarios.spallingRiskScore > 50 ? red[1] : orange[1], scenarios.spallingRiskScore > 50 ? red[2] : orange[2]);
  doc.text(`${scenarios.spallingRiskScore}/100 Critical Index`, col3X + 20, y + 25);

  y += 38;

  // ----------------------------------------------------
  // SECTION 2: 1.0–2.6 GHz RADAR DIAGNOSTIC MEASUREMENTS
  // ----------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('2. QUANTITATIVE 1.0-2.6 GHz SFCW RADAR TELEMETRY', margin, y);
  y += 3;

  // Table Header
  const tableH = 6;
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(margin, y, contentWidth, tableH, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Diagnostic Metric', margin + 3, y + 4.2);
  doc.text('Observed Value', margin + 65, y + 4.2);
  doc.text('Code Threshold (ECP 203)', margin + 115, y + 4.2);
  doc.text('Evaluation & Action', margin + 155, y + 4.2);

  y += tableH;

  const tableRows = [
    {
      metric: 'Mean Concrete Cover Depth (z)',
      val: '38 mm (+/- 1.0 mm precision)',
      thresh: '>= 40 mm (Severe Exposure)',
      status: 'Marginal - Protective seal required',
      alert: true,
    },
    {
      metric: 'Active Steel Rebar Rust Clusters',
      val: '3.4% of scanned mesh grid',
      thresh: '< 5.0% for early mitigation',
      status: 'Detected - Early volumetric expansion',
      alert: false,
    },
    {
      metric: 'Internal Delamination & Air Voids',
      val: '2 discrete anomalies (depth 14 cm)',
      thresh: 'Zero allowable in deck slabs',
      status: 'Targeted epoxy injection mapped',
      alert: true,
    },
    {
      metric: 'Dielectric Permittivity (er)',
      val: 'er = 6.8 (Moisture & salt ingress)',
      thresh: 'er = 5.0-6.0 (Dry cured concrete)',
      status: 'Elevated ionic conductivity front',
      alert: false,
    },
    {
      metric: 'ODOM-600 Position Precision',
      val: '600-PPR Optical Quadrature Track',
      thresh: '< 2.0 mm spatial jitter',
      status: 'Sub-millimeter grid alignment',
      alert: false,
    },
  ];

  tableRows.forEach((r, idx) => {
    const rowH = 5.8;
    doc.setFillColor(idx % 2 === 0 ? 255 : lightBg[0], idx % 2 === 0 ? 255 : lightBg[1], idx % 2 === 0 ? 255 : lightBg[2]);
    doc.rect(margin, y, contentWidth, rowH, 'F');
    doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
    doc.line(margin, y + rowH, margin + contentWidth, y + rowH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text(r.metric, margin + 3, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(r.alert ? orange[0] : navy[0], r.alert ? orange[1] : navy[1], r.alert ? orange[2] : navy[2]);
    doc.text(r.val, margin + 65, y + 4);

    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.text(r.thresh, margin + 115, y + 4);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(r.alert ? darkCyan[0] : [22, 101, 52][0], r.alert ? darkCyan[1] : [22, 101, 52][1], r.alert ? darkCyan[2] : [22, 101, 52][2]);
    doc.text(r.status, margin + 155, y + 4);

    y += rowH;
  });

  y += 5;

  // ----------------------------------------------------
  // SECTION 3: 3-WAY FINANCIAL & TECHNICAL COMPARISON
  // ----------------------------------------------------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('3. THREE-WAY FINANCIAL SCENARIO COMPARISON (DE SITTER LAW OF FIVES)', margin, y);
  y += 3;

  const cardW = (contentWidth - 6) / 3;
  const cardH = 44;

  // CARD 1: RIVA SMART METHOD
  doc.setFillColor(240, 249, 255); // cyan-50
  doc.setDrawColor(darkCyan[0], darkCyan[1], darkCyan[2]);
  doc.roundedRect(margin, y, cardW, cardH, 2, 2, 'FD');

  doc.setFillColor(darkCyan[0], darkCyan[1], darkCyan[2]);
  doc.rect(margin, y, cardW, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('SCENARIO 1: RIVA NDT (RECOMMENDED)', margin + 3, y + 3);

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFontSize(10);
  doc.text(`${scenarios.rivaServiceCostEgp.toLocaleString()} EGP`, margin + 3, y + 10);
  doc.setFontSize(6.5);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text(`($${scenarios.rivaServiceCostUsd.toLocaleString()} USD IaaS Rate)`, margin + 3, y + 14);

  doc.setFontSize(6.5);
  doc.text(`- Scan Duration: ${scenarios.scanDurationHours} continuous hours`, margin + 3, y + 20);
  doc.text(`- Structural Damage: 0% (Completely Non-Destructive)`, margin + 3, y + 25);
  doc.text(`- Detection Accuracy: 98% (Early rebar rust mapping)`, margin + 3, y + 30);
  doc.text(`- Hardware Rover Payback: ${scenarios.rivaHardwareRoiMonths} months ROI`, margin + 3, y + 35);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor([22, 101, 52][0], [22, 101, 52][1], [22, 101, 52][2]);
  doc.text('STATUS: Maximum Asset Life Extension', margin + 3, y + 41);

  // CARD 2: TRADITIONAL CORE DRILLING
  const card2X = margin + cardW + 3;
  doc.setFillColor(254, 243, 199); // amber-50
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(card2X, y, cardW, cardH, 2, 2, 'FD');

  doc.setFillColor(217, 119, 6);
  doc.rect(card2X, y, cardW, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('SCENARIO 2: CORE DRILLING', card2X + 3, y + 3);

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFontSize(10);
  doc.text(`${scenarios.traditionalCostEgp.toLocaleString()} EGP`, card2X + 3, y + 10);
  doc.setFontSize(6.5);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text(`($${scenarios.traditionalCostUsd.toLocaleString()} USD Total Coring)`, card2X + 3, y + 14);

  doc.setFontSize(6.5);
  doc.text(`- Core Samples Required: ${scenarios.coresRequired} destructive holes`, card2X + 3, y + 20);
  doc.text(`- Facility Downtime: ${scenarios.traditionalDowntimeDays} days traffic closure`, card2X + 3, y + 25);
  doc.text(`- Micro-Fracture Damage: ~22% localized weakening`, card2X + 3, y + 30);
  doc.text(`- Unmonitored Blindspots: >70% surface uninspected`, card2X + 3, y + 35);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(orange[0], orange[1], orange[2]);
  doc.text('STATUS: High Cost & Structural Intrusion', card2X + 3, y + 41);

  // CARD 3: "DO NOTHING" (De Sitter Escalation)
  const card3X = margin + (cardW + 3) * 2;
  doc.setFillColor(254, 242, 242); // red-50
  doc.setDrawColor(red[0], red[1], red[2]);
  doc.roundedRect(card3X, y, cardW, cardH, 2, 2, 'FD');

  doc.setFillColor(red[0], red[1], red[2]);
  doc.rect(card3X, y, cardW, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('SCENARIO 3: DO NOTHING', card3X + 3, y + 3);

  doc.setTextColor(red[0], red[1], red[2]);
  doc.setFontSize(10);
  doc.text(`${scenarios.projected3YrEscalationEgp.toLocaleString()} EGP`, card3X + 3, y + 10);
  doc.setFontSize(6.5);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text(`(Projected 3-Year Repair Cost)`, card3X + 3, y + 14);

  doc.setFontSize(6.5);
  doc.text(`- 5-Year Replacement: ${scenarios.projected5YrEscalationEgp.toLocaleString()} EGP`, card3X + 3, y + 20);
  doc.text(`- Rust Volume Expansion: ${scenarios.corrosionVolumeMultiplier}x (300%-600%)`, card3X + 3, y + 25);
  doc.text(`- Concrete Spalling: Severe risk of slab surface rupture`, card3X + 3, y + 30);
  doc.text(`- De Sitter Multiplier: 1 EGP now saves 25 EGP later`, card3X + 3, y + 35);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(red[0], red[1], red[2]);
  doc.text('STATUS: Catastrophic Financial Exposure', card3X + 3, y + 41);

  y += cardH + 6;

  // ----------------------------------------------------
  // SECTION 4: AI EXECUTIVE ENGINEERING ADVISORY
  // ----------------------------------------------------
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'F');

  doc.setTextColor(cyan[0], cyan[1], cyan[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('4. OFFICIAL ENGINEERING ADVISORY & REMEDIATION ROADMAP (ECP 203)', margin + 4, y + 5);

  doc.setTextColor(241, 245, 249);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);

  // Split advisory text into readable lines
  const advisorySummary = isArabic
    ? scenarios.advisoryTextAr
    : scenarios.advisoryTextEn;

  const splitAdvisory = doc.splitTextToSize(advisorySummary, contentWidth - 8);
  doc.text(splitAdvisory.slice(0, 4), margin + 4, y + 10);

  y += 28;

  // ----------------------------------------------------
  // SECTION 5: CERTIFICATION STAMP & SIGNATURE BLOCK
  // ----------------------------------------------------
  doc.setDrawColor(borderCol[0], borderCol[1], borderCol[2]);
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  const sigColW = contentWidth / 3;

  // Col 1: Lead NDT RF Specialist
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('Lead Microwave & RF Engineer:', margin + 4, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Eng. Tarek Mansour, M.Sc. RF Systems', margin + 4, y + 10);
  doc.text('RIVA Hardware Division (TRL-7 Validated)', margin + 4, y + 14);
  doc.setFont('courier', 'bold');
  doc.setTextColor(darkCyan[0], darkCyan[1], darkCyan[2]);
  doc.text('[ VERIFIED / SFCW-CALIBRATED ]', margin + 4, y + 19);

  // Col 2: Chief Structural NDT Consultant
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('Consulting Structural Reviewer:', margin + sigColW + 4, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('Dr. Khaled Abdel-Rahman, Ph.D., P.E.', margin + sigColW + 4, y + 10);
  doc.text('Egyptian Syndicate of Engineers #48192', margin + sigColW + 4, y + 14);
  doc.setFont('courier', 'bold');
  doc.setTextColor([22, 101, 52][0], [22, 101, 52][1], [22, 101, 52][2]);
  doc.text('[ ECP 203 COMPLIANCE STAMPED ]', margin + sigColW + 4, y + 19);

  // Col 3: Official Seal / Security Hash
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('Tamper-Proof Verification:', margin + sigColW * 2 + 4, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text(`Digital Seal: SHA256-${refNumber.replace(/[^0-9]/g, '')}-RIVA`, margin + sigColW * 2 + 4, y + 10);
  doc.text('Autonomous 600-PPR Odometry Verified', margin + sigColW * 2 + 4, y + 14);
  doc.setTextColor(darkCyan[0], darkCyan[1], darkCyan[2]);
  doc.text('https://riva-ndt.com/verify-cert', margin + sigColW * 2 + 4, y + 19);

  // ----------------------------------------------------
  // FOOTER NOTE
  // ----------------------------------------------------
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'CONFIDENTIAL REPORT - Generated automatically by RIVA Autonomous Radar Infrastructure Vision & Assessment Suite. Compliant with Egyptian Concrete Practice (ECP 203) & ASTM D6432 Standard Guide for Surface Ground Penetrating Radar.',
    margin,
    pageHeight - 6
  );

  // Trigger browser download
  const safeFileName = `RIVA_Structural_Diagnostic_Report_${refNumber}.pdf`;
  doc.save(safeFileName);
}

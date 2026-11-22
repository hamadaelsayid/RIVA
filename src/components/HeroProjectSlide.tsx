import React, { useState, useEffect } from 'react';
import { Language, PageView } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Radio,
  Layers,
  Sparkles,
  Bot,
  Activity,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface HeroProjectSlideProps {
  language: Language;
  onNavigate: (page: PageView) => void;
}

export const HeroProjectSlide: React.FC<HeroProjectSlideProps> = ({ language, onNavigate }) => {
  const isArabic = language === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 0,
      tagAr: 'منظومة الروبوت الميداني المستقل',
      tagEn: 'AUTONOMOUS FIELD ROBOTIC ROVER',
      titleAr: 'روبوت ريفا أثناء الفحص الميداني لأسطح الكباري والخرسانة',
      titleEn: 'RIVA Autonomous Rover Scanning Reinforced Bridge Decks',
      descAr: 'يتحرك الروبوت رباعي الدفع بشكل ذاتي على سطح المنشأة، مطلقاً موجات ميكروويف متدرجة (1.0–2.6 GHz SFCW) تخترق الخرسانة بأمان حتى عمق 100 سم، مع توجيه دقيق من مشفر المسافات البصري 600-PPR.',
      descEn: 'The 4WD all-terrain rover navigates concrete surfaces autonomously, emitting stepped-frequency microwave signals (1.0–2.6 GHz) penetrating up to 100 cm with sub-millimeter 600-PPR optical odometry tracking.',
      badge1Ar: 'دفع رباعي 4WD للطرق الوعرة',
      badge1En: 'All-Terrain 4WD Mobility',
      badge2Ar: 'تردد 1.0–2.6 GHz فائق النطاق',
      badge2En: '1.0–2.6 GHz UWB SFCW',
      badge3Ar: 'دقة مسار ±1 مم عبر 600-PPR',
      badge3En: '±1 mm Odometry Precision',
      graphicType: 'rover',
    },
    {
      id: 1,
      tagAr: 'الكشف المقطعي عن صدأ التسليح',
      tagEn: 'SUBSURFACE REBAR CORROSION X-RAY',
      titleAr: 'رؤية باطن الخرسانة وكشف صدأ الحديد والشروخ بدون تكسير',
      titleEn: 'Non-Destructive Subsurface Rust & Crack Radiography',
      descAr: 'بينما تبدو الخرسانة سليمة تماماً بالعين المجردة، تكشف أشعة ريفا تمدد أكاسيد الحديد بنسبة 300% إلى 600% وتحدد بؤر التكهفات الهوائية مبكراً قبل حدوث الشروخ السطحية وتساقط الغطاء.',
      descEn: 'While concrete appears visually intact on the surface, RIVA’s radar radiography uncovers internal iron oxide expansion (300%–600%) and delamination voids years before sudden spalling occurs.',
      badge1Ar: '0% تلف إنشائي بالكامل',
      badge1En: '0% Structural Damage',
      badge2Ar: 'رصد تمدد الحديد بنسبة 300%–600%',
      badge2En: '300%–600% Rust Expansion',
      badge3Ar: 'حساب قانون دي سيتر للمضاعفة الخمسية',
      badge3En: 'De Sitter Law of Fives Calibrated',
      graphicType: 'corrosion',
    },
    {
      id: 2,
      tagAr: 'معالجة الإشارات والتوأم الرقمي',
      tagEn: 'DSP SIGNAL PROCESSING & 3D TWIN',
      titleAr: 'تحويل النبضات الرادارية إلى توأم رقمي 3D معتمد للاستشاريين',
      titleEn: 'Converting Radar Chirps into Interactive 3D Digital Twins',
      descAr: 'تخضع إشارات الرادار لخوارزميات Stolt f-k SAR Migration وتحليل طور هيلبرت لرسم نموذج ثلاثي الأبعاد تفاعلي للحديد وحساب الغطاء الخرساني، متوافقاً مع كود الخرسانة المصري ECP 203.',
      descEn: 'Raw hyperbolic reflections are processed through Stolt f-k SAR migration and Hilbert instantaneous phase analysis, yielding certified 3D digital twins and instant downloadable PDF reports.',
      badge1Ar: 'معتمد وفق ECP 203 و ASTM D6432',
      badge1En: 'ECP 203 & ASTM D6432 Certified',
      badge2Ar: 'تقرير PDF فني مختوم وفوري',
      badge2En: 'Instant Stamped PDF Reports',
      badge3Ar: 'تصدير النموذج إلى برامج BIM و Revit',
      badge3En: 'BIM & 3D WebGL Digital Twin',
      graphicType: 'twin',
    },
  ];

  // Auto slide advance every 6s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const active = slides[currentSlide];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] sm:min-h-[460px]">
        {/* TEXT CONTENT COLUMN (6 Cols on lg) */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Slide Tag & Number */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                {isArabic ? active.tagAr : active.tagEn}
              </span>
              <span className="text-xs font-mono text-slate-500">
                0{active.id + 1} / 0{slides.length}
              </span>
            </div>

            {/* Slide Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
              {isArabic ? active.titleAr : active.titleEn}
            </h2>

            {/* Slide Narrative */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isArabic ? active.descAr : active.descEn}
            </p>

            {/* 3 Key Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-[11px] text-slate-200 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{isArabic ? active.badge1Ar : active.badge1En}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-[11px] text-slate-200 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{isArabic ? active.badge2Ar : active.badge2En}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 text-[11px] text-slate-200 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{isArabic ? active.badge3Ar : active.badge3En}</span>
              </span>
            </div>
          </div>

          {/* Slide Footer: Action CTA + Pagination Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate('simulator')}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'تشغيل المحاكاة التفاعلية 3D' : 'Launch 3D Simulation'}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Nav Arrows & Indicators */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2">
                {slides.map((s, sIdx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(sIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === sIdx ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to slide ${sIdx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Previous slide"
              >
                {isArabic ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Next slide"
              >
                {isArabic ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* VISUAL / ILLUSTRATION COLUMN (6 Cols on lg) */}
        <div className="lg:col-span-6 bg-slate-950 p-6 sm:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-800/80 relative overflow-hidden">
          {/* Subtle Radar Wave Grid Background */}
          <div className="absolute inset-0 radar-grid opacity-40 pointer-events-none" />

          {/* SLIDE 1 GRAPHIC: RIVA ROVER ON BRIDGE DECK */}
          {active.graphicType === 'rover' && (
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Telemetry Bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                <span>RIVA ROVER V3 // ACTIVE SCAN</span>
                <span>ODOM: 600-PPR | S11: -16.8dB</span>
              </div>

              {/* Engineering Schematic of Rover & Concrete Deck */}
              <svg className="w-full h-44 my-auto" viewBox="0 0 340 170" fill="none">
                {/* Bridge Deck Concrete Slab */}
                <rect x="20" y="90" width="300" height="70" rx="4" fill="#334155" />
                <rect x="20" y="90" width="300" height="12" fill="#475569" />
                {/* Concrete Cover Dimension Tag */}
                <line x1="12" y1="90" x2="12" y2="125" stroke="#00CFFF" strokeWidth="1.5" />
                <text x="6" y="112" fill="#00CFFF" fontSize="8" fontFamily="monospace" textAnchor="end">Cover: 38mm</text>

                {/* Internal Rebars */}
                <line x1="30" y1="125" x2="310" y2="125" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 3" />
                <line x1="30" y1="145" x2="310" y2="145" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 3" />

                {/* Active Rust Hotspot */}
                <circle cx="130" cy="125" r="7" fill="#F97316" />
                <circle cx="130" cy="125" r="14" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.7" strokeDasharray="3 2" />
                <text x="130" y="158" fill="#F97316" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Rust front</text>

                {/* RIVA Robotic Rover */}
                {/* 4 Wheels */}
                <rect x="178" y="76" width="10" height="18" rx="2" fill="#020617" stroke="#00CFFF" strokeWidth="1" />
                <rect x="228" y="76" width="10" height="18" rx="2" fill="#020617" stroke="#00CFFF" strokeWidth="1" />
                {/* Chassis Body */}
                <rect x="174" y="58" width="68" height="24" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                {/* Cyan stripe */}
                <rect x="174" y="66" width="68" height="3" fill="#00CFFF" />
                {/* LiDAR Dome */}
                <ellipse cx="225" cy="54" rx="8" ry="4" fill="#0284C7" />
                {/* Antenna mast */}
                <line x1="184" y1="58" x2="184" y2="38" stroke="#64748B" strokeWidth="2" />
                <circle cx="184" cy="38" r="3" fill="#F59E0B" />
                {/* Radar Emission Wave Cone into Concrete */}
                <path d="M 208 82 L 150 145 L 266 145 Z" fill="rgba(0, 207, 255, 0.18)" stroke="#00CFFF" strokeWidth="1.2" strokeDasharray="3 3" />
                {/* Wave ripples */}
                <path d="M 180 105 Q 208 115 236 105" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
                <path d="M 165 125 Q 208 138 251 125" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
              </svg>

              <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-1.5">
                <span>1.0–2.6 GHz UWB Penetration</span>
                <span className="text-emerald-400">ECP 203 Calibrated</span>
              </div>
            </div>
          )}

          {/* SLIDE 2 GRAPHIC: BEFORE & AFTER SUBSURFACE X-RAY */}
          {active.graphicType === 'corrosion' && (
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between text-[10px] font-mono text-orange-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                <span>DE SITTER RISK TIMELINE</span>
                <span>VOLUMETRIC EXPANSION: 5.4X</span>
              </div>

              <svg className="w-full h-44 my-auto" viewBox="0 0 340 170" fill="none">
                {/* Split View Divider */}
                <line x1="170" y1="15" x2="170" y2="155" stroke="#00CFFF" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Left Side: Intact External View */}
                <rect x="20" y="30" width="140" height="110" rx="3" fill="#475569" />
                <text x="90" y="75" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
                  {isArabic ? 'السطح الظاهري' : 'Visible Concrete'}
                </text>
                <text x="90" y="95" fill="#94A3B8" fontSize="7.5" textAnchor="middle">
                  {isArabic ? 'يبدو سليماً تماماً' : 'Looks pristine to eye'}
                </text>

                {/* Right Side: RIVA Subsurface X-Ray */}
                <rect x="180" y="30" width="140" height="110" rx="3" fill="#0B1120" stroke="#0284C7" strokeWidth="1" />
                {/* Hyperbolic rebar reflections */}
                <path d="M 195 90 Q 220 55 245 90" stroke="#00CFFF" strokeWidth="2.5" fill="none" />
                {/* Active Corroded Rebar Hyperbola in Orange with Glow */}
                <path d="M 245 95 Q 275 50 305 95" stroke="#F97316" strokeWidth="4" fill="none" filter="drop-shadow(0 0 6px #F97316)" />
                {/* Internal Delamination Void */}
                <ellipse cx="230" cy="115" rx="20" ry="7" fill="rgba(0, 207, 255, 0.3)" stroke="#38BDF8" strokeWidth="1.5" />
                <text x="250" y="138" fill="#F97316" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
                  {isArabic ? 'تآكل نشط (فقدان 3.4%)' : 'Active rust hotspot'}
                </text>
              </svg>

              <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-1.5">
                <span>Before/After Radiography</span>
                <span className="text-orange-400">Early Detection Saves 85%</span>
              </div>
            </div>
          )}

          {/* SLIDE 3 GRAPHIC: 3D DIGITAL TWIN & CERTIFICATION */}
          {active.graphicType === 'twin' && (
            <div className="relative w-full max-w-md aspect-[16/10] bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                <span>3D DIGITAL TWIN MODEL</span>
                <span>ECP 203 CERTIFIED STAMP</span>
              </div>

              <svg className="w-full h-44 my-auto" viewBox="0 0 340 170" fill="none">
                {/* Isometric 3D Slab Representation */}
                {/* Bottom Face */}
                <path d="M 80 120 L 220 120 L 290 80 L 150 80 Z" fill="#1E293B" stroke="#0284C7" strokeWidth="1" />
                {/* Front Face */}
                <path d="M 80 120 L 220 120 L 220 90 L 80 90 Z" fill="#334155" stroke="#00CFFF" strokeWidth="1.2" />
                {/* Top Translucent Face */}
                <path d="M 80 90 L 220 90 L 290 50 L 150 50 Z" fill="rgba(14, 165, 233, 0.25)" stroke="#00CFFF" strokeWidth="1.5" />

                {/* 3D Rebar Grid Lines inside */}
                <line x1="100" y1="85" x2="240" y2="85" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="120" y1="75" x2="260" y2="75" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 2" />
                {/* Glowing Orange Hotspot in 3D Grid */}
                <ellipse cx="170" cy="80" rx="14" ry="7" fill="#F97316" fillOpacity="0.8" />
                <ellipse cx="170" cy="80" rx="22" ry="11" stroke="#F97316" strokeWidth="1.2" strokeDasharray="3 2" />

                {/* Official Certified Stamp Seal */}
                <circle cx="280" cy="120" r="22" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
                <text x="280" y="118" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle">ECP 203</text>
                <text x="280" y="126" fill="#34D399" fontSize="5.5" fontFamily="monospace" textAnchor="middle">CERTIFIED</text>
              </svg>

              <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-1.5">
                <span>Stolt f-k SAR Reconstructed</span>
                <span className="text-cyan-400">PDF Report Ready</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

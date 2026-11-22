import React, { useState } from 'react';
import { Language, PageView } from '../../types';
import { content } from '../../data/translations';
import { EXPERTS_DATA, ExpertProfile } from '../../data/expertsData';
import { HeroProjectSlide } from '../HeroProjectSlide';
import { ExpertModal } from '../ExpertModal';
import {
  ShieldCheck,
  Radio,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bot,
  Activity,
  Layers,
  Cpu,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Compass,
  Users,
  Award,
  BookOpen,
  Linkedin,
} from 'lucide-react';

interface HomePageProps {
  language: Language;
  onNavigate: (page: PageView) => void;
  onOpenRDModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ language, onNavigate, onOpenRDModal }) => {
  const t = content[language].home;
  const isArabic = language === 'ar';

  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);

  return (
    <div className="w-full space-y-16 py-6">
      {/* 1. SOOTHING HERO INTRODUCTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-12 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 text-cyan-300 border border-slate-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>{t.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-snug">
            {t.headline}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.subheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('simulator')}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>{t.ctaSimulator}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onNavigate('offerings')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>{t.ctaServices}</span>
            </button>
          </div>
        </div>

        {/* 3 Quick Impact Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto">
          <div className="text-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono block">0%</span>
            <span className="text-xs text-slate-400 mt-1 block">
              {isArabic ? 'تلف إنشائي (بدون تكسير خرسانة)' : 'Structural Damage (100% NDT)'}
            </span>
          </div>

          <div className="text-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono block">1.0–2.6 GHz</span>
            <span className="text-xs text-slate-400 mt-1 block">
              {isArabic ? 'تردد راداري فائق النطاق (SFCW)' : 'Stepped-Frequency UWB Radar'}
            </span>
          </div>

          <div className="text-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">±1 mm</span>
            <span className="text-xs text-slate-400 mt-1 block">
              {isArabic ? 'دقة قياس الغطاء وفق ECP 203' : 'Cover Depth Precision (ECP 203)'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. FIRST SLIDE OF THE WEBSITE: VISUAL PICTURES ILLUSTRATING THE PROJECT */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {isArabic ? 'استعراض مصور لمشروع ريفا في الميدان' : 'RIVA In-Action Project Showcase'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            1.0–2.6 GHz FIELD ROBOTICS
          </span>
        </div>

        {/* Interactive Multi-Slide Component */}
        <HeroProjectSlide language={language} onNavigate={onNavigate} />
      </section>

      {/* 3. ABOUT THE PROJECT (MISSION & HOW IT WORKS) */}
      <section className="max-w-5xl mx-auto px-1 sm:px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider block mb-1">
              THE RIVA TECHNOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.missionTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed max-w-3xl">
              {t.missionText}
            </p>
          </div>

          {/* 3 Step Process */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{t.howItWorksTitle}</h3>
            <p className="text-xs text-slate-500 mb-6">{t.howItWorksSubtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-bold text-sm text-slate-900">{t.steps.step1Title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{t.steps.step1Desc}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-bold text-sm text-slate-900">{t.steps.step2Title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{t.steps.step2Desc}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-bold text-sm text-slate-900">{t.steps.step3Title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{t.steps.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL USE CASES (4 CARDS WITH SUPPORTIVE ENGINEERING ART) */}
      <section className="max-w-5xl mx-auto px-1 sm:px-4 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-cyan-700 uppercase tracking-wider block mb-1">
            FIELD APPLICATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.useCasesTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">{t.useCasesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Bridges & Overpasses */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="relative h-44 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-4">
              <svg className="w-full h-full" viewBox="0 0 340 160" fill="none">
                <path d="M 20 120 L 320 120" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                <path d="M 50 120 L 50 155" stroke="#334155" strokeWidth="12" />
                <path d="M 290 120 L 290 155" stroke="#334155" strokeWidth="12" />
                <rect x="30" y="70" width="280" height="40" rx="4" fill="#64748B" fillOpacity="0.8" />
                <line x1="40" y1="90" x2="300" y2="90" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="6 4" />
                <circle cx="140" cy="90" r="7" fill="#F97316" />
                <circle cx="140" cy="90" r="14" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 2" />
                <rect x="170" y="52" width="36" height="16" rx="3" fill="#0F172A" stroke="#00CFFF" strokeWidth="1.5" />
                <circle cx="178" cy="69" r="4" fill="#00CFFF" />
                <circle cx="198" cy="69" r="4" fill="#00CFFF" />
                <path d="M 188 68 L 150 110 L 226 110 Z" fill="rgba(0, 207, 255, 0.15)" stroke="#00CFFF" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              <span className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-700">
                APPLICATION 01
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{t.useCases.bridgesTitle}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.useCases.bridgesDesc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-800">{t.useCases.bridgesBenefit}</span>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="text-cyan-600 hover:text-cyan-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{isArabic ? 'محاكاة' : 'Simulate'}</span>
                  {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Industrial Floors */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="relative h-44 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-4">
              <svg className="w-full h-full" viewBox="0 0 340 160" fill="none">
                <rect x="25" y="80" width="290" height="60" rx="4" fill="#475569" />
                <ellipse cx="110" cy="115" rx="22" ry="8" fill="rgba(0, 207, 255, 0.25)" stroke="#38BDF8" strokeWidth="1.5" />
                <ellipse cx="230" cy="120" rx="18" ry="6" fill="rgba(249, 115, 22, 0.3)" stroke="#F97316" strokeWidth="1.5" />
                <rect x="80" y="48" width="55" height="30" rx="3" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="95" cy="78" r="7" fill="#1E293B" />
                <circle cx="122" cy="78" r="7" fill="#1E293B" />
                <path d="M 85 45 L 95 30 L 125 30 L 135 48" stroke="#F59E0B" strokeWidth="2" />
                <rect x="180" y="62" width="34" height="16" rx="3" fill="#0F172A" stroke="#00CFFF" strokeWidth="1.5" />
                <path d="M 197 78 L 165 130 L 230 130 Z" fill="rgba(0, 207, 255, 0.15)" stroke="#00CFFF" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              <span className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-700">
                APPLICATION 02
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{t.useCases.floorsTitle}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.useCases.floorsDesc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-800">{t.useCases.floorsBenefit}</span>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="text-cyan-600 hover:text-cyan-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{isArabic ? 'محاكاة' : 'Simulate'}</span>
                  {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Parking Slabs & Buildings */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="relative h-44 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-4">
              <svg className="w-full h-full" viewBox="0 0 340 160" fill="none">
                <rect x="30" y="25" width="280" height="28" rx="3" fill="#64748B" />
                <rect x="70" y="53" width="30" height="90" fill="#475569" />
                <rect x="240" y="53" width="30" height="90" fill="#475569" />
                <rect x="30" y="140" width="280" height="15" fill="#334155" />
                <path d="M 150 25 Q 160 38 150 53" stroke="#00CFFF" strokeWidth="2.5" strokeDasharray="3 2" />
                <circle cx="150" cy="53" r="4" fill="#00CFFF" />
                <rect x="140" y="47" width="40" height="6" fill="#F97316" />
                <rect x="180" y="10" width="30" height="14" rx="2" fill="#0F172A" stroke="#00CFFF" strokeWidth="1.2" />
                <path d="M 195 24 L 175 52 L 215 52 Z" fill="rgba(0, 207, 255, 0.2)" stroke="#00CFFF" strokeWidth="1" />
              </svg>
              <span className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-700">
                APPLICATION 03
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{t.useCases.parkingTitle}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.useCases.parkingDesc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-800">{t.useCases.parkingBenefit}</span>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="text-cyan-600 hover:text-cyan-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{isArabic ? 'محاكاة' : 'Simulate'}</span>
                  {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Coastal & Marine Piers */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="relative h-44 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden p-4">
              <svg className="w-full h-full" viewBox="0 0 340 160" fill="none">
                <path d="M 20 110 Q 90 100 160 110 T 320 110 L 320 160 L 20 160 Z" fill="#0369A1" fillOpacity="0.4" />
                <rect x="50" y="40" width="80" height="90" rx="3" fill="#64748B" />
                <rect x="180" y="40" width="80" height="90" rx="3" fill="#64748B" />
                <line x1="50" y1="95" x2="130" y2="95" stroke="#F97316" strokeWidth="2.5" strokeDasharray="4 3" />
                <line x1="180" y1="95" x2="260" y2="95" stroke="#F97316" strokeWidth="2.5" strokeDasharray="4 3" />
                <rect x="85" y="24" width="30" height="14" rx="2" fill="#0F172A" stroke="#00CFFF" strokeWidth="1.2" />
                <path d="M 100 38 L 70 85 L 130 85 Z" fill="rgba(0, 207, 255, 0.2)" stroke="#00CFFF" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              <span className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-700">
                APPLICATION 04
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{t.useCases.marineTitle}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.useCases.marineDesc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-800">{t.useCases.marineBenefit}</span>
                <button
                  onClick={() => onNavigate('simulator')}
                  className="text-cyan-600 hover:text-cyan-700 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{isArabic ? 'محاكاة' : 'Simulate'}</span>
                  {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. EXECUTIVE FINANCIAL COMPARISON & DE SITTER'S LAW TEASER */}
      <section className="max-w-5xl mx-auto px-1 sm:px-4">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none" />

          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>{isArabic ? 'مصفوفة التكاليف والمخاطر الإنشائية' : 'COST & RISK SCENARIO AUDIT'}</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {isArabic
                ? 'قارن تكاليف فحص ريفا بالأساليب التقليدية وقانون دي سيتر (Law of Fives)'
                : 'Benchmark RIVA vs Destructive Coring & De Sitter\'s Law of Fives'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isArabic
                ? 'اكتشف كيف يوفر الفحص الراداري أكثر من 70% من التكاليف المباشرة ويحمي من مضاعف التدهور الإنشائي التراكمي (1 → 5 → 25) قبل حدوث تشظي الخرسانة.'
                : 'See how non-destructive radar saves 70%+ direct budget while protecting against exponential decay multipliers (1 → 5 → 25) before spalling occurs.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => onNavigate('simulator')}
                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
              >
                <span>{isArabic ? 'تشغيل المحاكي وحساب التكاليف' : 'Launch 3D Simulator & Scenarios'}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Metrics Visual Box */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0 font-mono text-center">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-800/60">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">+70%</span>
              <span className="text-[11px] text-slate-400 font-sans mt-1 block">
                {isArabic ? 'توفير ميزانية الفحص' : 'Cost Savings vs Coring'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">0%</span>
              <span className="text-[11px] text-slate-400 font-sans mt-1 block">
                {isArabic ? 'ضرر إنشائي بالخرسانة' : 'Structural Damage'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-2xl sm:text-3xl font-black text-white block">1 → 5 → 25</span>
              <span className="text-[11px] text-slate-400 font-sans mt-1 block">
                {isArabic ? 'قانون دي سيتر للتدهور' : 'De Sitter Multiplier'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-800/60">
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 block">±1 mm</span>
              <span className="text-[11px] text-slate-400 font-sans mt-1 block">
                {isArabic ? 'دقة غطاء ECP 203' : 'ECP 203 Precision'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 'MEET THE EXPERTS' SECTION (INTERACTIVE PROFILE CARDS WITH HOVER STATES) */}
      <section className="max-w-5xl mx-auto px-1 sm:px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>MEET THE EXPERTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isArabic ? 'فريق الخبراء والمهندسين المؤسسين' : 'Meet the R&D Engineering Experts'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isArabic
                ? 'كفاءات وطنية متخصصة في الترددات اللاسلكية الميكروويفية، الروبوتات الميدانية، ومعالجة الإشارات الرقمية'
                : 'Specialists in microwave RF front-ends, autonomous robotics, and synthetic aperture radar DSP.'}
            </p>
          </div>

          <button
            onClick={onOpenRDModal}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{isArabic ? 'معمارية أبحاث R&D' : 'R&D Blueprint'}</span>
          </button>
        </div>

        {/* 4 Expert Profile Cards Grid with Interactive Hover States */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERTS_DATA.map((expert) => (
            <div
              key={expert.id}
              className="group relative bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Avatar with Glow on Group Hover */}
                <div className="relative mb-4 flex items-center justify-between">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${expert.avatarColor} text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 group-hover:ring-4 group-hover:ring-cyan-100 transition-all`}
                  >
                    {expert.initials}
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-cyan-600 transition-colors">
                    {expert.publicationsCount} {isArabic ? 'أبحاث' : 'Pubs'}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="font-bold text-base text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {isArabic ? expert.nameAr : expert.nameEn}
                </h3>
                <p className="text-xs font-semibold text-cyan-800 mt-1 line-clamp-2">
                  {isArabic ? expert.roleAr : expert.roleEn}
                </p>

                {/* Academic Institution Tag */}
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {isArabic ? expert.academicAr : expert.academicEn}
                </p>

                {/* Top 2 Skills Pills */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {expert.skills.slice(0, 2).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-800 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Modal Trigger + Direct Links */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedExpert(expert)}
                  className="text-xs font-bold text-slate-700 group-hover:text-cyan-700 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{isArabic ? 'الملف المهني' : 'Full Bio'}</span>
                  {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={expert.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-cyan-600 hover:text-white text-slate-600 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={expert.scholarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 transition-colors"
                    title={isArabic ? 'أبحاث الباحث' : 'Scholar / Publications'}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Full Profile Modal */}
      <ExpertModal
        expert={selectedExpert}
        isOpen={selectedExpert !== null}
        onClose={() => setSelectedExpert(null)}
        language={language}
      />
    </div>
  );
};

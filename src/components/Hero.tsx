import React from 'react';
import { Language, PersonaMode } from '../types';
import { content } from '../data/translations';
import { ShieldCheck, ArrowRight, ArrowLeft, Bot, ClipboardCheck, Sparkles, Activity, Layers, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  language: Language;
  persona: PersonaMode;
  onSelectTrack: (track: PersonaMode) => void;
  onScrollToSection: (id: string) => void;
  onOpenRDModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  persona,
  onSelectTrack,
  onScrollToSection,
  onOpenRDModal,
}) => {
  const t = content[language].hero;
  const isArabic = language === 'ar';

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-16 sm:pb-24 border-b border-slate-800">
      {/* Background Subtle Radar Wave Grid */}
      <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Standards & ECP 203 Compliance Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/60 shadow-lg shadow-cyan-500/10 text-xs text-cyan-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>{t.badge}</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            <span>{t.titlePart1} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              {t.titleHighlight}
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed pt-2">
            {t.desc}
          </p>
        </div>

        {/* Dual Track Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <button
            onClick={() => {
              onSelectTrack('service');
              onScrollToSection('simulator');
            }}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
              persona === 'service'
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25 ring-2 ring-cyan-300'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-cyan-700" />
            <span>{t.ctaService}</span>
            {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              onSelectTrack('hardware');
              onScrollToSection('simulator');
            }}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
              persona === 'hardware'
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25 ring-2 ring-cyan-300'
                : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>{t.ctaHardware}</span>
            {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Live Summary Telemetry Bar (4 Metrics) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 bg-slate-900/80 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-sm">
          {/* Metric 1 */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono block">
              {t.metric1Val}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium block mt-1">
              {t.metric1Label}
            </span>
          </div>

          {/* Metric 2 */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
              {t.metric2Val}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium block mt-1">
              {t.metric2Label}
            </span>
          </div>

          {/* Metric 3 */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
              {t.metric3Val}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium block mt-1">
              {t.metric3Label}
            </span>
          </div>

          {/* Metric 4 */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono block">
              {t.metric4Val}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium block mt-1">
              {t.metric4Label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

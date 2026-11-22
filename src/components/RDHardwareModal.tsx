import React from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { X, Cpu, Radio, Network, Award, CheckCircle2 } from 'lucide-react';

interface RDHardwareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const RDHardwareModal: React.FC<RDHardwareModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const t = content[language].rdModal;
  const isArabic = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                  {t.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">TRL-7 VALIDATED</span>
              </div>
              <h3 className="font-bold text-lg text-white mt-0.5">{t.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          <p className="text-xs text-cyan-300/80 font-mono bg-cyan-950/40 border border-cyan-900/60 p-3 rounded-xl">
            {t.subtitle}
          </p>

          {/* Section 1: SFCW Synthesizer */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/80 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Radio className="w-5 h-5" />
              <h4>{t.section1Title}</h4>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">{t.section1Text}</p>
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-400">
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Bandwidth: 1.6 GHz</div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Frequency: 1.0–2.6 GHz</div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Steps: 512 points</div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Max Depth: 100 cm</div>
            </div>
          </div>

          {/* Section 2: Vivaldi Antennas & Odometry */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/80 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <Network className="w-5 h-5" />
              <h4>{t.section2Title}</h4>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">{t.section2Text}</p>
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Gain: &gt; 7 dBi</div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Resolution: 600-PPR</div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">S11 Return Loss: &lt; -15 dB</div>
            </div>
          </div>

          {/* Section 3: DSP & Migration */}
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/80 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <Award className="w-5 h-5" />
              <h4>{t.section3Title}</h4>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">{t.section3Text}</p>
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Stolt f-k SAR Migration</div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Hilbert Phase Tracking</div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700/50">Automatic Cover Recognition</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

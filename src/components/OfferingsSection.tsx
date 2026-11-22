import React from 'react';
import { Language, PersonaMode } from '../types';
import { content } from '../data/translations';
import {
  Bot,
  ClipboardCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Download,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  FileCheck2,
} from 'lucide-react';

interface OfferingsSectionProps {
  language: Language;
  persona: PersonaMode;
  onSelectTrack: (track: PersonaMode) => void;
  onOpenReportModal: (type: 'report' | 'datasheet') => void;
  onScrollToForm: () => void;
}

export const OfferingsSection: React.FC<OfferingsSectionProps> = ({
  language,
  persona,
  onSelectTrack,
  onOpenReportModal,
  onScrollToForm,
}) => {
  const t = content[language].offerings;
  const isArabic = language === 'ar';

  return (
    <section id="offerings" className="w-full py-10 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-cyan-600" />
            <span>DUAL COMMERCIAL ENGAGEMENT MODEL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>

        {/* 2 Track Cards with Visual Mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* TRACK A: BUY RIVA ROVER UNIT */}
          <div
            className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all border-2 ${
              persona === 'hardware'
                ? 'border-cyan-500 shadow-2xl shadow-cyan-500/10 bg-slate-900 text-white'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-900'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                    persona === 'hardware' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  <Bot className="w-7 h-7" />
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full ${
                    persona === 'hardware'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  HARDWARE ASSET
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">{t.trackATitle}</h3>
                <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${persona === 'hardware' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.trackASubtitle}
                </p>
              </div>

              {/* Visual Mockup Container: RIVA Rover Hardware Blueprint */}
              <div className="relative h-40 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-3 overflow-hidden border border-slate-800 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 340 140" fill="none">
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="320" y2="20" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="20" y1="70" x2="320" y2="70" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="20" y1="120" x2="320" y2="120" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Rover Chassis Blueprint */}
                  <rect x="70" y="45" width="200" height="55" rx="10" fill="#0F172A" stroke="#00CFFF" strokeWidth="1.5" />
                  
                  {/* Radar Transceiver Radome Belly Pod */}
                  <rect x="110" y="85" width="120" height="22" rx="4" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.2" />
                  <text x="125" y="100" fill="#E0F2FE" fontSize="9" fontFamily="monospace" fontWeight="bold">1.0–2.6 GHz UWB RADOME</text>
                  
                  {/* 4 Wheels */}
                  <rect x="60" y="40" width="16" height="30" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
                  <rect x="60" y="80" width="16" height="30" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
                  <rect x="264" y="40" width="16" height="30" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
                  <rect x="264" y="80" width="16" height="30" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1" />

                  {/* Optical Odometry & LIDAR Turret */}
                  <circle cx="230" cy="55" r="12" fill="#1E293B" stroke="#00CFFF" strokeWidth="1.5" />
                  <circle cx="230" cy="55" r="4" fill="#00CFFF" />

                  {/* Telemetry Labels */}
                  <text x="75" y="65" fill="#94A3B8" fontSize="8" fontFamily="monospace">600 PPR ODOMETRY</text>
                  <text x="75" y="76" fill="#00CFFF" fontSize="8" fontFamily="monospace">LiFePO4 6h SWAPPABLE</text>
                </svg>
                <span className="absolute top-2 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                  AUTONOMOUS HARDWARE ROVER
                </span>
              </div>

              {/* Price Pill */}
              <div
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-mono ${
                  persona === 'hardware'
                    ? 'bg-slate-950/80 border-slate-800 text-cyan-300 font-bold'
                    : 'bg-white border-slate-200 text-slate-800 font-bold'
                }`}
              >
                {t.trackAPrice}
              </div>

              {/* Feature List */}
              <ul className="space-y-3 text-xs sm:text-sm">
                {t.trackAFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        persona === 'hardware' ? 'text-cyan-400' : 'text-cyan-600'
                      }`}
                    />
                    <span className={persona === 'hardware' ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  onSelectTrack('hardware');
                  onScrollToForm();
                }}
                className="w-full py-3 px-5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>{t.trackACta}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onOpenReportModal('datasheet')}
                className={`w-full py-2.5 px-4 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                  persona === 'hardware'
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-white'
                }`}
              >
                <Download className="w-4 h-4 text-cyan-500" />
                <span>{t.trackADatasheetBtn}</span>
              </button>
            </div>
          </div>

          {/* TRACK B: INSPECTION AS A SERVICE (IaaS) */}
          <div
            className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all border-2 ${
              persona === 'service'
                ? 'border-cyan-500 shadow-2xl shadow-cyan-500/10 bg-slate-900 text-white'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-900'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                    persona === 'service' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  <ClipboardCheck className="w-7 h-7" />
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full ${
                    persona === 'service'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  TURNKEY SERVICE (IaaS)
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">{t.trackBTitle}</h3>
                <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${persona === 'service' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.trackBSubtitle}
                </p>
              </div>

              {/* Visual Mockup Container: Field Team & Certified Diagnostic Report */}
              <div className="relative h-40 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-3 overflow-hidden border border-slate-800 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 340 140" fill="none">
                  {/* Field Diagnostic Van / Station */}
                  <rect x="30" y="45" width="110" height="65" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="1.2" />
                  <rect x="100" y="55" width="30" height="25" rx="3" fill="#38BDF8" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="1" />
                  <circle cx="55" cy="110" r="10" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="115" cy="110" r="10" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
                  <text x="40" y="70" fill="#00CFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold">RIVA MOBILE</text>
                  <text x="40" y="82" fill="#94A3B8" fontSize="8" fontFamily="monospace">LAB UNIT 01</text>

                  {/* Certified PDF Report Graphic Sheet */}
                  <rect x="190" y="25" width="110" height="95" rx="6" fill="#FFFFFF" stroke="#00CFFF" strokeWidth="1.5" />
                  <rect x="200" y="35" width="50" height="6" rx="2" fill="#0F172A" />
                  <line x1="200" y1="50" x2="285" y2="50" stroke="#CBD5E1" strokeWidth="2" />
                  <line x1="200" y1="60" x2="275" y2="60" stroke="#CBD5E1" strokeWidth="2" />
                  <line x1="200" y1="70" x2="260" y2="70" stroke="#CBD5E1" strokeWidth="2" />
                  
                  {/* Official Stamp on Sheet */}
                  <circle cx="265" cy="90" r="16" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="2 1" />
                  <text x="252" y="93" fill="#0284C7" fontSize="7" fontFamily="sans-serif" fontWeight="bold">ECP 203</text>

                  {/* Wireless transmission pulse from van to report */}
                  <path d="M 145 65 Q 165 45 185 55" stroke="#00CFFF" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
                <span className="absolute top-2 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                  ON-DEMAND CERTIFIED SCANNING
                </span>
              </div>

              {/* Price Pill */}
              <div
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-mono ${
                  persona === 'service'
                    ? 'bg-slate-950/80 border-slate-800 text-cyan-300 font-bold'
                    : 'bg-white border-slate-200 text-cyan-700 font-bold'
                }`}
              >
                {t.trackBPrice}
              </div>

              {/* Feature List */}
              <ul className="space-y-3 text-xs sm:text-sm">
                {t.trackBFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        persona === 'service' ? 'text-cyan-400' : 'text-cyan-600'
                      }`}
                    />
                    <span className={persona === 'service' ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  onSelectTrack('service');
                  onScrollToForm();
                }}
                className="w-full py-3 px-5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>{t.trackBCta}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onOpenReportModal('report')}
                className={`w-full py-2.5 px-4 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                  persona === 'service'
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 hover:bg-white'
                }`}
              >
                <Download className="w-4 h-4 text-cyan-500" />
                <span>{t.trackBSampleReportBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

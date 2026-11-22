import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { Radio, Scan, Activity, Maximize2, Info, ChevronRight, ChevronLeft } from 'lucide-react';

interface BScanSliderProps {
  language: Language;
}

export const BScanSlider: React.FC<BScanSliderProps> = ({ language }) => {
  const t = content[language].bscan;
  const isArabic = language === 'ar';
  
  const [sliderPos, setSliderPos] = useState(55); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [hoverDepth, setHoverDepth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging && e.buttons !== 1) {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const depth = Math.round((y / rect.height) * 45); // 0 to 45 cm depth
        setHoverDepth(depth);
      }
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pos = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe
    }
  };

  return (
    <section id="bscan" className="w-full py-12 border-t border-slate-200 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
            <Radio className="w-3.5 h-3.5" />
            <span>1.0–2.6 GHz UWB RADAR RADIOGRAPHY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">{t.subtitle}</p>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl select-none">
          {/* Depth Scale Indicators on the Left Axis */}
          <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-14 z-20 bg-slate-950/80 border-r border-slate-800 flex flex-col justify-between py-4 px-1 text-[10px] font-mono text-slate-400 text-right">
            <span>0 cm</span>
            <span>10 cm</span>
            <span className="text-cyan-400 font-bold">20 cm (Rebar)</span>
            <span>30 cm</span>
            <span>40 cm</span>
          </div>

          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative h-[360px] sm:h-[460px] w-full pl-10 sm:pl-14 cursor-ew-resize overflow-hidden"
          >
            {/* UNDER LAYER: RIVA 1.0–2.6 GHz B-Scan Radar Radiography */}
            <div className="absolute inset-0 pl-10 sm:pl-14 flex items-center justify-center bg-[#070d18]">
              {/* Synthetic Radar Canvas representation with Hyperbolas */}
              <div className="relative w-full h-full radar-grid overflow-hidden">
                {/* Hyperbolic reflection arcs for rebars */}
                {/* Healthy Rebar Hyperbolas */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  {/* Rebar 1 */}
                  <path
                    d="M 120 230 Q 200 170 280 230"
                    fill="none"
                    stroke="#00cfff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="opacity-90"
                  />
                  {/* Rebar 2 (Corroded Rebar - Phase shift & orange glow) */}
                  <path
                    d="M 320 235 Q 400 165 480 235"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="opacity-95 filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                  />
                  {/* Rebar 3 */}
                  <path
                    d="M 520 230 Q 600 170 680 230"
                    fill="none"
                    stroke="#00cfff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="opacity-90"
                  />
                  {/* Rebar 4 */}
                  <path
                    d="M 720 230 Q 800 170 880 230"
                    fill="none"
                    stroke="#00cfff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="opacity-90"
                  />

                  {/* Internal Subsurface Crack / Delamination Void at depth 12cm */}
                  <ellipse
                    cx="410"
                    cy="130"
                    rx="85"
                    ry="18"
                    fill="rgba(0, 207, 255, 0.25)"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />

                  {/* Radar Wave Attenuation Lines */}
                  <line x1="0" y1="90" x2="1000" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1="180" x2="1000" y2="180" stroke="#0369a1" strokeDasharray="2 2" strokeWidth="0.8" />
                  <line x1="0" y1="270" x2="1000" y2="270" stroke="#1e293b" strokeDasharray="3 3" />
                </svg>

                {/* Annotation Badges on Radar Layer */}
                <div className="absolute top-24 left-[34%] bg-orange-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-lg border border-orange-400">
                  {isArabic ? 'بؤرة صدأ نشطة: سعة -12 dB' : 'Active Rust Hotspot: -12 dB'}
                </div>

                <div className="absolute top-16 left-[46%] bg-cyan-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-lg border border-cyan-400">
                  {isArabic ? 'شرخ هوائي داخلي (Void)' : 'Internal Air Void (Depth 12cm)'}
                </div>

                <div className="absolute top-3 left-16 bg-slate-900/80 text-cyan-400 text-xs font-mono px-3 py-1 rounded border border-cyan-500/40">
                  {t.afterLabel}
                </div>
              </div>
            </div>

            {/* OVER LAYER (Clipped): Plain Visible Concrete Surface */}
            <div
              className="absolute inset-y-0 left-0 pl-10 sm:pl-14 overflow-hidden border-r-2 border-cyan-400 shadow-[4px_0_24px_rgba(0,207,255,0.4)]"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-[1200px] h-full bg-[#3d4451] flex items-center justify-center">
                {/* Simulated smooth gray concrete texture */}
                <div className="w-full h-full bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 opacity-90 relative">
                  {/* Subtle formwork tie-rod holes */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-slate-800/60 border border-slate-700"></div>
                  <div className="absolute top-1/4 left-3/4 w-4 h-4 rounded-full bg-slate-800/60 border border-slate-700"></div>
                  <div className="absolute bottom-1/4 left-1/2 w-4 h-4 rounded-full bg-slate-800/60 border border-slate-700"></div>

                  <div className="absolute top-3 right-6 bg-slate-900/80 text-slate-200 text-xs font-semibold px-3 py-1 rounded border border-slate-700">
                    {t.beforeLabel}
                  </div>

                  {/* Notice overlay */}
                  <div className="absolute bottom-6 left-12 bg-slate-900/90 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700">
                    {isArabic ? 'تبدو الخرسانة سليمة بالعين المجردة رغم انتشار الصدأ الداخلي!' : 'Concrete looks undamaged to the naked eye despite deep internal corrosion!'}
                  </div>
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-ew-resize">
                <div className="flex items-center -space-x-1">
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom helper instruction */}
          <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">
              {isArabic ? 'التردد: 1.0 إلى 2.6 جيجاهرتز SFCW • الخطوة: 512 نقطة' : 'Frequency: 1.0–2.6 GHz SFCW • 512 discrete steps'}
            </span>
            <span className="text-cyan-400 font-medium">{t.slideInstruction}</span>
          </div>
        </div>

        {/* 3 Technical Feature Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-3">
              <Scan className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">{t.feature1Title}</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.feature1Desc}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">{t.feature2Title}</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.feature2Desc}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Maximize2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">{t.feature3Title}</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{t.feature3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

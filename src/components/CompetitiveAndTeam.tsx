import React from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { Radio, Cpu, Layers, ShieldCheck, XCircle, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CompetitiveAndTeamProps {
  language: Language;
  onOpenRDModal: () => void;
}

export const CompetitiveAndTeam: React.FC<CompetitiveAndTeamProps> = ({ language, onOpenRDModal }) => {
  const tMat = content[language].matrix;
  const tTeam = content[language].team;
  const isArabic = language === 'ar';

  return (
    <section id="comparison" className="w-full py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        {/* PART 1: COMPETITIVE COMPARISON MATRIX */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{tMat.title}</h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">{tMat.subtitle}</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider font-mono">
                  <th className="py-4 px-6 bg-slate-100 text-slate-700 w-1/4">{tMat.colFeature}</th>
                  <th className="py-4 px-6 bg-cyan-600 text-white font-bold w-1/4">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{tMat.colRiva}</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 bg-slate-100 text-slate-700 w-1/4">{tMat.colGpr}</th>
                  <th className="py-4 px-6 bg-slate-100 text-slate-700 w-1/4">{tMat.colCores}</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm divide-y divide-slate-100">
                {Object.entries(tMat.rows).map(([key, row], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-3.5 px-6 font-bold text-slate-800">{row[0]}</td>
                    <td className="py-3.5 px-6 font-bold text-cyan-900 bg-cyan-50/40 border-x border-cyan-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>{row[1]}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">{row[2]}</td>
                    <td className="py-3.5 px-6 text-red-700 font-medium">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PART 2: FOUNDING ENGINEERING DIVISIONS */}
        <div id="team">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
                <Cpu className="w-3.5 h-3.5" />
                <span>MULTIDISCIPLINARY DEEP-TECH CORE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{tTeam.title}</h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">{tTeam.subtitle}</p>
            </div>

            <button
              onClick={onOpenRDModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer shrink-0"
            >
              <span>{isArabic ? 'فتح مواصفات أبحاث وتطوير العتاد (R&D Specs)' : 'View R&D Architecture Blueprint'}</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Division 1: RF & Microwave */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-4">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{tTeam.div1Title}</h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{tTeam.div1Desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 px-2 py-1 rounded border border-cyan-100 block">
                  {tTeam.div1Specs}
                </span>
              </div>
            </div>

            {/* Division 2: Embedded Systems & Robotics */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{tTeam.div2Title}</h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{tTeam.div2Desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200/60 block">
                  {tTeam.div2Specs}
                </span>
              </div>
            </div>

            {/* Division 3: DSP & Software */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{tTeam.div3Title}</h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{tTeam.div3Desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200/60 block">
                  {tTeam.div3Specs}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

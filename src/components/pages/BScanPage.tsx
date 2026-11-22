import React from 'react';
import { Language, PageView } from '../../types';
import { content } from '../../data/translations';
import { BScanSlider } from '../BScanSlider';
import { Radio, ArrowLeft, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface BScanPageProps {
  language: Language;
  onNavigateToSimulator: () => void;
  onNavigateToBooking: () => void;
}

export const BScanPage: React.FC<BScanPageProps> = ({
  language,
  onNavigateToSimulator,
  onNavigateToBooking,
}) => {
  const isArabic = language === 'ar';

  return (
    <div className="w-full space-y-10 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>SYNTHETIC APERTURE RADAR (SAR) B-SCAN</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {isArabic ? 'الأشعة المقطعية الرادارية 1.0–2.6 GHz' : '1.0–2.6 GHz B-Scan Radar Radiography'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isArabic
              ? 'تحويل النبضات الكهرومغناطيسية إلى قطاعات طولية وعرضية دقيقة تكشف ما تحت السطح الخرساني'
              : 'Translating microwave reflections into cross-sectional subsurface imagery with hyperbolic rebar resolution.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToSimulator}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            {isArabic ? 'المحاكي ثلاثي الأبعاد' : '3D Simulator'}
          </button>
          <button
            onClick={onNavigateToBooking}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors shadow cursor-pointer"
          >
            {isArabic ? 'طلب فحص ميداني' : 'Book Field Scan'}
          </button>
        </div>
      </div>

      {/* The Interactive BScan Component */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <BScanSlider language={language} />
      </div>
    </div>
  );
};

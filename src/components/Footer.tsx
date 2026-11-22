import React from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { Radio, ShieldCheck, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenRDModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenRDModal, onScrollToSection }) => {
  const isArabic = language === 'ar';

  return (
    <footer className="w-full bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white tracking-wider">RIVA</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                DEEP-TECH
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              {isArabic
                ? 'ريفا (RIVA) — شركة مصرية رائدة في تقنيات الفحص غير الإتلافي المتقدم للخرسانة والجسور بالروبوتات وموجات الرادار 1.0–2.6 GHz لتوليد التوائم الرقمية ثلاثية الأبعاد.'
                : 'RIVA — Egyptian deep-tech pioneer providing robotic non-destructive testing (NDT) for concrete infrastructure and bridge diagnostics via 1.0–2.6 GHz UWB radar.'}
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ECP 203 & ASTM D6432 Certified Workflow</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm mb-3">
              {isArabic ? 'روابط المنصة السريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onScrollToSection('simulator')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'المحاكي ثلاثي الأبعاد 3D' : '3D Structural Simulator'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('bscan')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'أشعة الرادار B-Scan' : 'B-Scan Radiography'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('offerings')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'باقات المنتج والخدمة' : 'Hardware & Service'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('comparison')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {isArabic ? 'مصفوفة المقارنة الفنية' : 'Competitive Matrix'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRDModal}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer font-mono"
                >
                  <span>{isArabic ? 'معمارية العتاد R&D' : 'R&D Hardware Blueprint'}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Field Labs */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm mb-3">
              {isArabic ? 'المقرات والمختبر الميداني' : 'Contact & Field Labs'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isArabic ? 'القاهرة الجديدة، مصر • برج الأمل الهندسي' : 'New Cairo, Egypt • Innovation Hub'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>diagnostics@riva-ndt.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+20 2 2840 9100 / +20 100 450 8822</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} RIVA Infrastructure Diagnostics Ltd. All rights reserved.</p>
          <p className="font-mono">{isArabic ? 'صنع بفخر في مصر 🇪🇬 للسلامة الإنشائية العالمية' : 'Proudly Engineered in Egypt 🇪🇬 for Global Structural Safety'}</p>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { Language, PersonaMode, PageView } from '../types';
import { content } from '../data/translations';
import {
  Radio,
  Globe,
  Bot,
  ClipboardCheck,
  Menu,
  X,
  Home,
  Box,
  Scan,
  CreditCard,
  Cpu,
  ArrowRight,
  ArrowLeft,
  FileText,
} from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  persona: PersonaMode;
  onPersonaChange: (persona: PersonaMode) => void;
  onOpenRDModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activePage,
  onNavigate,
  persona,
  onPersonaChange,
  onOpenRDModal,
}) => {
  const t = content[language].nav;
  const isArabic = language === 'ar';
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePageSelect = (page: PageView) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePageSelect('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Radio className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black tracking-wider text-white">RIVA</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  NDT
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => handlePageSelect('home')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'home'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.home}</span>
            </button>

            <button
              onClick={() => handlePageSelect('simulator')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'simulator'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>{t.simulator}</span>
            </button>

            <button
              onClick={() => handlePageSelect('bscan')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'bscan'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{t.bscan}</span>
            </button>

            <button
              onClick={() => handlePageSelect('offerings')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === 'offerings'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{t.offerings}</span>
            </button>
          </nav>

          {/* Right Action Icons: Language Toggle + Hamburger Button ("ثلاث شرط") */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(isArabic ? 'en' : 'ar')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isArabic ? 'English' : 'عربي'}</span>
            </button>

            {/* Direct Quick CTA to Simulator */}
            <button
              onClick={() => handlePageSelect('simulator')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>{isArabic ? 'تشغيل المحاكي 3D' : 'Launch 3D'}</span>
            </button>

            {/* The 3-Bar Hamburger Menu Button ("ثلاث شرط") */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Toggle Pages Menu"
              title={isArabic ? 'قائمة الصفحات والأقسام' : 'Pages Menu'}
            >
              {menuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN / SLIDE-DOWN NAVIGATION DRAWER ("ثلاث شرط") */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-16 z-50 bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 text-white p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                {isArabic ? 'تنقل سريع بين صفحات RIVA' : 'RIVA DIRECT PAGES NAVIGATION'}
              </span>
              <span className="text-xs text-slate-500">ECP 203 & ASTM D6432</span>
            </div>

            {/* 4 Large Page Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Tile 1: Home */}
              <button
                onClick={() => handlePageSelect('home')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  activePage === 'home'
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PAGE 01</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.home}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isArabic ? 'تعريف بالمشروع والاستخدامات والمؤسسين' : 'Overview, use cases & team'}
                  </p>
                </div>
              </button>

              {/* Tile 2: 3D Simulator */}
              <button
                onClick={() => handlePageSelect('simulator')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  activePage === 'simulator'
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Box className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PAGE 02</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.simulator}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isArabic ? 'المحاكي ثلاثي الأبعاد وتقرير PDF' : '3D digital twin & PDF export'}
                  </p>
                </div>
              </button>

              {/* Tile 3: B-Scan */}
              <button
                onClick={() => handlePageSelect('bscan')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  activePage === 'bscan'
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Scan className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PAGE 03</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.bscan}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isArabic ? 'الأشعة المقطعية ومقارنة السطح' : 'Radar cross-section X-Ray'}
                  </p>
                </div>
              </button>

              {/* Tile 4: Offerings & Booking */}
              <button
                onClick={() => handlePageSelect('offerings')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  activePage === 'offerings'
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-lg'
                    : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PAGE 04</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.offerings}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isArabic ? 'شراء روبوت، فحص معتمد، عرض سعر' : 'Hardware, IaaS & proposal'}
                  </p>
                </div>
              </button>
            </div>

            {/* Quick Actions Row in Drawer */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-800/80">
              <button
                onClick={() => {
                  onOpenRDModal();
                  setMenuOpen(false);
                }}
                className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>{isArabic ? 'المعمارية الهندسية ومواصفات أبحاث وتطوير R&D' : 'R&D Hardware Blueprint'}</span>
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-900 border border-slate-800"
              >
                {isArabic ? 'إغلاق القائمة ✕' : 'Close Menu ✕'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

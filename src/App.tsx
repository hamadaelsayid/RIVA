import React, { useState, useEffect } from 'react';
import {
  Language,
  PersonaMode,
  PageView,
  StructuralParameters,
  ScenarioResult,
} from './types';
import { calculateDeterministicScenarios } from './services/aiAdvisory';
import { Header } from './components/Header';
import { HomePage } from './components/pages/HomePage';
import { SimulatorPage } from './components/pages/SimulatorPage';
import { BScanPage } from './components/pages/BScanPage';
import { OfferingsPage } from './components/pages/OfferingsPage';
import { ReportModal } from './components/ReportModal';
import { RDHardwareModal } from './components/RDHardwareModal';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [activePage, setActivePage] = useState<PageView>('home');
  const [persona, setPersona] = useState<PersonaMode>('service');

  // Active Structural Parameters (Shared across 3D simulator, PDF generator, and quote form)
  const [params, setParams] = useState<StructuralParameters>({
    structureType: 'bridge_deck',
    length: 30, // 30 meters
    width: 12, // 12 meters
    depth: 40, // 40 cm
    ageYears: 18,
    exposure: 'coastal',
    rebarDiameterMm: 20,
  });

  // Active calculated scenarios
  const [scenarios, setScenarios] = useState<ScenarioResult>(() =>
    calculateDeterministicScenarios(params)
  );

  // Modals state
  const [reportModalType, setReportModalType] = useState<'report' | 'datasheet' | null>(null);
  const [isRDModalOpen, setIsRDModalOpen] = useState(false);

  // Sync HTML dir and lang
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const isArabic = language === 'ar';

  const navigateTo = (page: PageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between ${
        isArabic ? 'font-cairo' : 'font-sans'
      }`}
    >
      {/* 1. Header with 3-bar Hamburger Menu ("ثلاث شرط") and Page Navigation */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        activePage={activePage}
        onNavigate={navigateTo}
        persona={persona}
        onPersonaChange={setPersona}
        onOpenRDModal={() => setIsRDModalOpen(true)}
      />

      {/* 2. Main Page Content (Switchable, no long endless scroll) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        {activePage === 'home' && (
          <HomePage
            language={language}
            onNavigate={navigateTo}
            onOpenRDModal={() => setIsRDModalOpen(true)}
          />
        )}

        {activePage === 'simulator' && (
          <SimulatorPage
            language={language}
            params={params}
            scenarios={scenarios}
            onUpdateParams={setParams}
            onUpdateScenarios={setScenarios}
            onNavigateToBooking={(scenarioType) => {
              if (scenarioType === 'riva_hardware') {
                setPersona('hardware');
              } else {
                setPersona('service');
              }
              navigateTo('offerings');
            }}
          />
        )}

        {activePage === 'bscan' && (
          <BScanPage
            language={language}
            onNavigateToSimulator={() => navigateTo('simulator')}
            onNavigateToBooking={() => navigateTo('offerings')}
          />
        )}

        {activePage === 'offerings' && (
          <OfferingsPage
            language={language}
            persona={persona}
            params={params}
            scenarios={scenarios}
            onSelectTrack={setPersona}
            onOpenReportModal={(type) => setReportModalType(type)}
            onOpenRDModal={() => setIsRDModalOpen(true)}
          />
        )}

        {activePage === 'specs' && (
          <div className="py-12 max-w-4xl mx-auto">
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
              <h2 className="text-2xl font-black text-cyan-400">
                {isArabic ? 'المعمارية الهندسية ومواصفات أبحاث وتطوير RIVA' : 'R&D Hardware & DSP Architecture'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isArabic
                  ? 'يعتمد نظام ريفا على مولد تردد متدرج متصل (1.0–2.6 GHz SFCW) مع هوائيات فيفالدي مزدوجة ومحدد مسافات بصري 600-PPR، مع خوارزميات Stolt f-k SAR Migration للتحليل ثلاثي الأبعاد.'
                  : 'RIVA is built on a 1.0–2.6 GHz Stepped Frequency Continuous Wave (SFCW) architecture with antipodal Vivaldi antennas, 600-PPR optical odometry, and Stolt f-k SAR migration.'}
              </p>
              <button
                onClick={() => setIsRDModalOpen(true)}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow cursor-pointer"
              >
                {isArabic ? 'عرض وثيقة المواصفات الهندسية الكاملة' : 'Open Full Technical Blueprint'}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        language={language}
        onOpenRDModal={() => setIsRDModalOpen(true)}
        onScrollToSection={(id) => {
          if (id === 'simulator') navigateTo('simulator');
          else if (id === 'bscan') navigateTo('bscan');
          else if (id === 'offerings' || id === 'comparison') navigateTo('offerings');
        }}
      />

      {/* 4. Modals */}
      <ReportModal
        isOpen={reportModalType !== null}
        onClose={() => setReportModalType(null)}
        type={reportModalType || 'report'}
        language={language}
        params={params}
        scenarios={scenarios}
      />

      <RDHardwareModal
        isOpen={isRDModalOpen}
        onClose={() => setIsRDModalOpen(false)}
        language={language}
      />
    </div>
  );
}

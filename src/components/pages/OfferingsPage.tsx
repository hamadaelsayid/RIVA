import React from 'react';
import { Language, PersonaMode, StructuralParameters, ScenarioResult } from '../../types';
import { OfferingsSection } from '../OfferingsSection';
import { CompetitiveAndTeam } from '../CompetitiveAndTeam';
import { QuoteBookingForm } from '../QuoteBookingForm';

interface OfferingsPageProps {
  language: Language;
  persona: PersonaMode;
  params: StructuralParameters;
  scenarios: ScenarioResult;
  onSelectTrack: (track: PersonaMode) => void;
  onOpenReportModal: (type: 'report' | 'datasheet') => void;
  onOpenRDModal: () => void;
}

export const OfferingsPage: React.FC<OfferingsPageProps> = ({
  language,
  persona,
  params,
  scenarios,
  onSelectTrack,
  onOpenReportModal,
  onOpenRDModal,
}) => {
  const isArabic = language === 'ar';

  const scrollToQuoteForm = () => {
    const el = document.getElementById('quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-12 py-6">
      {/* 1. Track A & B Offerings */}
      <OfferingsSection
        language={language}
        persona={persona}
        onSelectTrack={onSelectTrack}
        onOpenReportModal={onOpenReportModal}
        onScrollToForm={scrollToQuoteForm}
      />

      {/* 2. Competitive Matrix */}
      <CompetitiveAndTeam
        language={language}
        onOpenRDModal={onOpenRDModal}
      />

      {/* 3. Pre-Filled Quote & Booking Form */}
      <QuoteBookingForm
        language={language}
        persona={persona}
        params={params}
        scenarios={scenarios}
        onTrackChange={onSelectTrack}
      />
    </div>
  );
};

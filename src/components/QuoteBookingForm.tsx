import React, { useState } from 'react';
import { Language, PersonaMode, StructuralParameters, ScenarioResult } from '../types';
import { content } from '../data/translations';
import { generateRivaPdfReport } from '../services/pdfGenerator';
import { Send, CheckCircle2, FileCheck, Building2, User, Mail, Phone, MapPin, MessageSquare, Download, Printer } from 'lucide-react';

interface QuoteBookingFormProps {
  language: Language;
  persona: PersonaMode;
  params: StructuralParameters;
  scenarios: ScenarioResult;
  onTrackChange: (track: PersonaMode) => void;
}

export const QuoteBookingForm: React.FC<QuoteBookingFormProps> = ({
  language,
  persona,
  params,
  scenarios,
  onTrackChange,
}) => {
  const t = content[language].form;
  const isArabic = language === 'ar';

  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    track: persona,
    location: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [proposalRef, setProposalRef] = useState('');

  // Keep track in sync if changed from props
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, track: persona }));
  }, [persona]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate backend booking generation
    setTimeout(() => {
      const generatedRef = `RIVA-Q-${Math.floor(Math.random() * 90000 + 10000)}`;
      setProposalRef(generatedRef);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleDownloadPdf = () => {
    generateRivaPdfReport({
      params,
      scenarios,
      language,
      clientInfo: {
        organization: formData.organization || (isArabic ? 'شركة هندسية معتمدة' : 'Partner Contracting Co.'),
        contactName: formData.contactName || (isArabic ? 'المهندس الاستشاري المسؤول' : 'Principal Consultant'),
        location: formData.location || (isArabic ? 'القاهرة - مصر' : 'Cairo, Egypt'),
        proposalRef: proposalRef || `RIVA-Q-${Math.floor(Math.random() * 90000 + 10000)}`,
      },
    });
  };

  return (
    <section id="quote-form" className="w-full py-16 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            <span>INSTANT PROPOSAL & SCHEDULING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.title}</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">{t.subtitle}</p>
        </div>

        {/* Pre-filled Simulation Data Banner */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 mb-8 border border-slate-800 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-bold text-cyan-400 font-mono">{t.prefilledNotice}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              ECP 203 & ASTM D6432 CALIBRATED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-xs">
            <div>
              <span className="text-slate-400 block">{isArabic ? 'أبعاد المنشأة:' : 'Dimensions:'}</span>
              <span className="font-bold font-mono text-cyan-300">
                {params.length}m × {params.width}m × {params.depth}cm
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">{isArabic ? 'المساحة الإجمالية:' : 'Total Area:'}</span>
              <span className="font-bold font-mono text-slate-200">{scenarios.areaM2} m²</span>
            </div>
            <div>
              <span className="text-slate-400 block">{isArabic ? 'تكلفة ريفا التقديرية:' : 'Estimated RIVA Cost:'}</span>
              <span className="font-bold font-mono text-emerald-400">
                {scenarios.rivaServiceCostEgp.toLocaleString(isArabic ? 'ar-EG' : 'en-US')} {isArabic ? 'ج.م' : 'EGP'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">{isArabic ? 'وفر التكلفة المباشر:' : 'Direct Savings:'}</span>
              <span className="font-bold font-mono text-cyan-400">
                {(scenarios.traditionalCostEgp - scenarios.rivaServiceCostEgp).toLocaleString(isArabic ? 'ar-EG' : 'en-US')} {isArabic ? 'ج.م' : 'EGP'}
              </span>
            </div>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Organization */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-cyan-600" />
                  <span>{t.orgLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? 'مثال: شركة المقاولون العرب / مكتب استشاري' : 'e.g. Arab Contractors / Engineering Bureau'}
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-cyan-600" />
                  <span>{t.contactLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? 'م. أحمد الشريف' : 'Eng. Ahmed El-Sherif'}
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-cyan-600" />
                  <span>{t.emailLabel}</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="engineer@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-cyan-600" />
                  <span>{t.phoneLabel}</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+20 100 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Track Selector & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t.trackSelectLabel}
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => {
                    const val = e.target.value as PersonaMode;
                    setFormData({ ...formData, track: val });
                    onTrackChange(val);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold"
                >
                  <option value="service">{t.trackServiceOption}</option>
                  <option value="hardware">{t.trackHardwareOption}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-600" />
                  <span>{t.projectLocationLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isArabic ? 'القاهرة / الجيزة / الإسكندرية / أخرى' : 'Cairo, Giza, Alexandria, etc.'}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-600" />
                <span>{t.notesLabel}</span>
              </label>
              <textarea
                rows={3}
                placeholder={isArabic ? 'أي متطلبات تسليم خاصة، طبيعة الحركة المرورية، أو رغبة في ربط النموذج بنظام BIM...' : 'Any specific delivery constraints, live traffic schedules, or BIM export integration requirements...'}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-black rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t.submitting}</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{t.submitBtn}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* SUCCESS SUBMISSION CARD WITH INSTANT PROPOSAL DOWNLOAD */
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{t.successTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">{t.successDesc}</p>
            </div>

            {/* Generated Quote Summary Card */}
            <div className="max-w-md mx-auto bg-white p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-2">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-bold text-slate-800">PROPOSAL REFERENCE:</span>
                <span className="font-mono font-bold text-cyan-700">{proposalRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client:</span>
                <span className="font-bold text-slate-900">{formData.organization || 'Valued Partner'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Track:</span>
                <span className="font-bold text-cyan-800">
                  {formData.track === 'hardware' ? 'RIVA Rover Hardware Procurement' : 'Inspection-as-a-Service (IaaS)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Structure:</span>
                <span className="font-mono font-bold text-slate-900">{params.length}m × {params.width}m ({scenarios.areaM2} m²)</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-emerald-800 font-bold">
                <span>Estimated Value:</span>
                <span>{scenarios.rivaServiceCostEgp.toLocaleString()} EGP</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadPdf}
                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{isArabic ? 'تحميل التقرير الفني الشامل (PDF Report)' : 'Download Certified PDF Report'}</span>
              </button>

              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-300 transition-colors cursor-pointer"
              >
                {isArabic ? 'تعديل أو إرسال طلب جديد' : 'Submit Another Request'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

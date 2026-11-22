import React from 'react';
import { ExpertProfile } from '../data/expertsData';
import { Language } from '../types';
import {
  X,
  Award,
  ExternalLink,
  BookOpen,
  Cpu,
  Linkedin,
  Globe,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

interface ExpertModalProps {
  expert: ExpertProfile | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ExpertModal: React.FC<ExpertModalProps> = ({ expert, isOpen, onClose, language }) => {
  if (!isOpen || !expert) return null;
  const isArabic = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${expert.avatarColor} text-white flex items-center justify-center font-black text-base shadow-md`}
            >
              {expert.initials}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                {isArabic ? expert.nameAr : expert.nameEn}
              </h3>
              <p className="text-xs text-cyan-400 font-medium">
                {isArabic ? expert.roleAr : expert.roleEn}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 text-xs sm:text-sm">
          {/* Academic Credentials */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
            <span className="text-[11px] font-mono text-cyan-700 font-bold uppercase block">
              {isArabic ? 'المؤهلات الأكاديمية والاعتمادات' : 'Academic & Professional Credentials'}
            </span>
            <p className="font-semibold text-slate-900 leading-relaxed">
              {isArabic ? expert.academicAr : expert.academicEn}
            </p>
            <p className="text-slate-500 text-xs mt-1">
              {isArabic ? expert.divisionAr : expert.divisionEn}
            </p>
          </div>

          {/* Detailed Biography */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              {isArabic ? 'الخلفية الهندسية والخبرة الميدانية' : 'Engineering Background & Field Expertise'}
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {isArabic ? expert.bioAr : expert.bioEn}
            </p>
          </div>

          {/* Key Inventions in RIVA */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-600" />
              <span>{isArabic ? 'أبرز الابتكارات وبراءات الاختراع في RIVA' : 'Key Inventions & Patents in RIVA'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {(isArabic ? expert.innovationsAr : expert.innovationsEn).map((inn, i) => (
                <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-cyan-50/60 border border-cyan-100 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{inn}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Technical Disciplines */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              {isArabic ? 'المهارات الهندسية الدقيقة' : 'Core Technical Disciplines'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {expert.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-medium rounded-lg border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer: Portfolio Links */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookOpen className="w-4 h-4 text-cyan-600" />
            <span>
              {expert.publicationsCount} {isArabic ? 'ورقة بحثية منشورة' : 'Peer-Reviewed Publications'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={expert.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={expert.scholarUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              <span>{isArabic ? 'الأبحاث والمنشورات' : 'Scholar / Research'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

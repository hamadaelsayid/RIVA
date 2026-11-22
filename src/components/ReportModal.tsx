import React from 'react';
import { Language, StructuralParameters, ScenarioResult } from '../types';
import { generateRivaPdfReport } from '../services/pdfGenerator';
import { X, Download, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'report' | 'datasheet';
  language: Language;
  params?: StructuralParameters;
  scenarios?: ScenarioResult;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  type,
  language,
  params,
  scenarios,
}) => {
  if (!isOpen) return null;
  const isArabic = language === 'ar';

  const handleDownloadPdf = () => {
    if (params && scenarios) {
      generateRivaPdfReport({
        params,
        scenarios,
        language,
        clientInfo: {
          organization: isArabic ? 'الهيئة العامة للطرق والكباري' : 'National Roads & Bridges Authority',
          contactName: isArabic ? 'م. رئيس قسم صيانة المنشآت' : 'Chief Structural Maintenance Eng.',
          location: isArabic ? 'القاهرة - كوبري 6 أكتوبر' : 'Cairo - 6th October Corridor',
        },
      });
    } else {
      window.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {type === 'report'
                  ? (isArabic ? 'نموذج تقرير الفحص الإنشائي المعتمد' : 'Sample Certified Structural Inspection Report')
                  : (isArabic ? 'ورقة المواصفات الهندسية لروبوت RIVA Rover' : 'RIVA Radar Rover Technical Datasheet')}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {type === 'report' ? 'DOC REF: RIVA-NDT-2026-ECP203' : 'SPEC REF: RIVA-HW-SFCW-V3'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 text-xs sm:text-sm">
          {type === 'report' ? (
            /* CERTIFIED REPORT PREVIEW */
            <div className="space-y-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
              {/* Report Header */}
              <div className="flex justify-between items-start border-b border-slate-300 pb-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">RIVA NDT CONSULTING</h1>
                  <p className="text-xs text-slate-500">Radar Infrastructure Vision & Assessment Ltd.</p>
                  <p className="text-xs text-cyan-700 font-semibold mt-1">
                    {isArabic ? 'معتمد وفق الكود المصري للخرسانة ECP 203 ومعايير ASTM D6432' : 'Compliant with ECP 203 & ASTM D6432'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded">
                    {isArabic ? 'معتمد رسمياً' : 'OFFICIALLY CERTIFIED'}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Date: November 2026</p>
                </div>
              </div>

              {/* Project Scope */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 text-[11px] block">{isArabic ? 'المشروع:' : 'Project:'}</span>
                  <span className="font-bold text-slate-900">{isArabic ? 'كوبري 6 أكتوبر - باكية 4' : '6th October Bridge'}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">{isArabic ? 'طريقة الفحص:' : 'Methodology:'}</span>
                  <span className="font-bold text-cyan-700">1.0–2.6 GHz SFCW</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">{isArabic ? 'المساحة الممسوحة:' : 'Scanned Area:'}</span>
                  <span className="font-bold text-slate-900">450 m² (100% Non-destructive)</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">{isArabic ? 'حالة التلف الإنشائي:' : 'Structural Damage:'}</span>
                  <span className="font-bold text-emerald-700">0% (Zero Core Holes)</span>
                </div>
              </div>

              {/* Quantitative Diagnostic Findings */}
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-2">{isArabic ? 'نتائج القياسات والمسح الراداري:' : 'Diagnostic Findings:'}</h4>
                <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="p-2 border border-slate-200">{isArabic ? 'المعامل الإنشائي' : 'Parameter'}</th>
                      <th className="p-2 border border-slate-200">{isArabic ? 'القيمة المرصودة' : 'Observed Value'}</th>
                      <th className="p-2 border border-slate-200">{isArabic ? 'المعيار المرجعي ECP 203' : 'Standard'}</th>
                      <th className="p-2 border border-slate-200">{isArabic ? 'التقييم الفني' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-slate-200">{isArabic ? 'متوسط عمق الغطاء الخرساني' : 'Average Concrete Cover'}</td>
                      <td className="p-2 border border-slate-200 font-mono">38 mm ± 1 mm</td>
                      <td className="p-2 border border-slate-200 font-mono">≥ 40 mm (Coastal/Bridge)</td>
                      <td className="p-2 border border-slate-200 text-amber-700 font-bold">{isArabic ? 'حد حرج (Marginal)' : 'Marginal'}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200">{isArabic ? 'بؤر تآكل حديد التسليح النشطة' : 'Active Rebar Oxidation'}</td>
                      <td className="p-2 border border-slate-200 font-mono">3.4% of total grid</td>
                      <td className="p-2 border border-slate-200 font-mono">&lt; 5.0% early phase</td>
                      <td className="p-2 border border-slate-200 text-cyan-700 font-bold">{isArabic ? 'مرحلة مبكرة قابلة للعلاج' : 'Early Stage'}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200">{isArabic ? 'شروخ التكربن والفجوات الهوائية' : 'Subsurface Air Delamination'}</td>
                      <td className="p-2 border border-slate-200 font-mono">2 discrete voids (depth 14cm)</td>
                      <td className="p-2 border border-slate-200 font-mono">Zero allowed in deck</td>
                      <td className="p-2 border border-slate-200 text-orange-700 font-bold">{isArabic ? 'يوصى بحقن موضعي' : 'Injection Needed'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Engineering Recommendation */}
              <div className="bg-cyan-50 p-3.5 rounded-lg border border-cyan-200 text-cyan-900 text-xs">
                <span className="font-bold block mb-1">{isArabic ? 'التوصية الاستشارية الرسمية:' : 'Official Recommendation:'}</span>
                <p>
                  {isArabic
                    ? 'يُنصح بحقن الإيبوكسي منخفض اللزوجة في البؤرتين المرصودتين عند الإحداثيات (X: 12.4m, Y: 4.8m) مع تطبيق دهان مانع لنفاذية الكلوريدات على مساحة الباكية، مما يمنع تفاقم الصدأ بنسبة 95% ويوفر ما يقارب 350,000 ج.م من تكلفة الاستبدال المستقبلي وفق قانون دي سيتر.'
                    : 'Low-viscosity epoxy injection is recommended at the mapped void coordinates (X: 12.4m, Y: 4.8m), followed by a silane-based hydrophobic seal coating, halting chloride progression and avoiding ~350,000 EGP in premature bridge slab replacement.'}
                </p>
              </div>
            </div>
          ) : (
            /* HARDWARE DATASHEET PREVIEW */
            <div className="space-y-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200">
              <div className="border-b border-slate-300 pb-4">
                <span className="text-cyan-700 font-bold text-xs uppercase tracking-wider">HARDWARE SPECIFICATION SHEET</span>
                <h1 className="text-xl font-black text-slate-900 mt-1">RIVA ROVER V3 AUTONOMOUS NDT UNIT</h1>
                <p className="text-xs text-slate-500">1.0–2.6 GHz Stepped Frequency Continuous Wave (SFCW) Ground Penetrating Radar</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase text-cyan-700">{isArabic ? 'مواصفات الرادار RF' : 'RF & Microwave Specs'}</h4>
                  <ul className="text-xs space-y-1 text-slate-600">
                    <li>• <strong>Frequency Range:</strong> 1.0 GHz to 2.6 GHz</li>
                    <li>• <strong>Modulation:</strong> Stepped Frequency Continuous Wave (SFCW)</li>
                    <li>• <strong>Frequency Steps:</strong> 512 discrete channels</li>
                    <li>• <strong>Dynamic Range:</strong> &gt; 102 dB</li>
                    <li>• <strong>Antenna Type:</strong> Dual Antipodal Bowtie-Vivaldi</li>
                    <li>• <strong>Penetration Depth:</strong> 15 cm up to 100 cm in reinforced concrete</li>
                    <li>• <strong>Axial Resolution:</strong> 18 mm (εr = 6.5)</li>
                  </ul>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase text-cyan-700">{isArabic ? 'المنصة الروبوتية الميدانية' : 'Robotic Mobility Specs'}</h4>
                  <ul className="text-xs space-y-1 text-slate-600">
                    <li>• <strong>Drive System:</strong> 4WD all-terrain torque vectoring</li>
                    <li>• <strong>Position Encoder:</strong> 600-PPR optical quadrature odometry</li>
                    <li>• <strong>Scanning Velocity:</strong> 0.2 m/s to 0.8 m/s (auto-grid)</li>
                    <li>• <strong>Obstacle Clearance:</strong> Up to 35 mm steps / expansion joints</li>
                    <li>• <strong>Battery Life:</strong> 7.5 hours continuous autonomous scanning</li>
                    <li>• <strong>Weight & Chassis:</strong> 8.2 kg anodized aluminum & carbon fiber</li>
                    <li>• <strong>Ingress Protection:</strong> IP65 dust and water resistant</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase text-cyan-700 mb-1">{isArabic ? 'البرمجيات والتوأم الرقمي' : 'Software & 3D Analytics'}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Includes RIVA Studio suite with automated Stolt f-k migration, Hilbert instantaneous phase analysis, automatic rebar pitch recognition, export to BIM/Revit, and 3D Digital Twin web viewer.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            {isArabic ? 'وثيقة هندسية معتمدة من ريفا للأنظمة المتقدمة' : 'Certified document by RIVA Deep-Tech Systems'}
          </span>
          <button
            onClick={handleDownloadPdf}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-white" />
            <span>{isArabic ? 'تحميل تقرير التشخيص الفني (PDF Download)' : 'Download Certified PDF Report'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

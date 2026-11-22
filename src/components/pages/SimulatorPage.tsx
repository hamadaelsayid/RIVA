import React, { useState } from 'react';
import {
  Language,
  StructuralParameters,
  ScenarioResult,
  StructureType,
  EnvironmentExposure,
  PageView,
} from '../../types';
import { content } from '../../data/translations';
import { calculateDeterministicScenarios, generateGeminiAdvisory } from '../../services/aiAdvisory';
import { StructuralTwin3D } from '../StructuralTwin3D';
import { ScenarioComparison } from '../ScenarioComparison';
import { generateRivaPdfReport } from '../../services/pdfGenerator';
import {
  Sliders,
  Play,
  Sparkles,
  Building,
  Ruler,
  Clock,
  Compass,
  Layers,
  Download,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface SimulatorPageProps {
  language: Language;
  params: StructuralParameters;
  scenarios: ScenarioResult;
  onUpdateParams: (newParams: StructuralParameters) => void;
  onUpdateScenarios: (newScenarios: ScenarioResult) => void;
  onNavigateToBooking: (scenarioType?: 'riva_service' | 'riva_hardware' | 'traditional') => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({
  language,
  params,
  scenarios,
  onUpdateParams,
  onUpdateScenarios,
  onNavigateToBooking,
}) => {
  const t = content[language].simulator;
  const isArabic = language === 'ar';

  const [inputState, setInputState] = useState<StructuralParameters>(params);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    onUpdateParams(inputState);

    const result = calculateDeterministicScenarios(inputState);
    onUpdateScenarios(result);

    try {
      const aiAdvisory = await generateGeminiAdvisory(inputState, result);
      onUpdateScenarios({
        ...result,
        advisoryTextAr: aiAdvisory.ar,
        advisoryTextEn: aiAdvisory.en,
      });
    } catch {
      // fallback
    } finally {
      setIsSimulating(false);
    }
  };

  const handleDownloadPdf = () => {
    generateRivaPdfReport({
      params,
      scenarios,
      language,
      clientInfo: {
        organization: isArabic ? 'مؤسسة المشروعات الهندسية المعتمدة' : 'Civil Engineering Consulting Bureau',
        contactName: isArabic ? 'م. كبير مهندسي الفحص الميداني' : 'Senior Civil Diagnostics Engineer',
        location: isArabic ? 'القاهرة - كوبري 6 أكتوبر' : 'Cairo, Egypt Corridor',
      },
    });
  };

  return (
    <div className="w-full space-y-10 py-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D DIGITAL TWIN & RISK ENGINE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">{t.title}</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.subtitle}</p>
        </div>

        <button
          onClick={handleDownloadPdf}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{isArabic ? 'تحميل التقرير المعتمد (PDF Report)' : 'Download PDF Report'}</span>
        </button>
      </div>

      {/* Main Workspace Split: Left Parameters + Right 3D Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Panel (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base text-white">{t.paramsTitle}</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {scenarios.areaM2} m² • {scenarios.volumeM3} m³
            </span>
          </div>

          {/* Structure Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-cyan-400" />
              <span>{t.structureTypeLabel}</span>
            </label>
            <select
              value={inputState.structureType}
              onChange={(e) =>
                setInputState({ ...inputState, structureType: e.target.value as StructureType })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold"
            >
              <option value="bridge_deck">{t.types.bridge_deck}</option>
              <option value="industrial_floor">{t.types.industrial_floor}</option>
              <option value="parking_slab">{t.types.parking_slab}</option>
              <option value="pier_column">{t.types.pier_column}</option>
            </select>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-1">
            {/* Length */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.lengthLabel}</span>
                </span>
                <span className="font-mono font-bold text-cyan-300">{inputState.length} m</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={inputState.length}
                onChange={(e) => setInputState({ ...inputState, length: Number(e.target.value) })}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5m</span>
                <span>50m</span>
                <span>100m</span>
              </div>
            </div>

            {/* Width */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.widthLabel}</span>
                </span>
                <span className="font-mono font-bold text-cyan-300">{inputState.width} m</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={inputState.width}
                onChange={(e) => setInputState({ ...inputState, width: Number(e.target.value) })}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2m</span>
                <span>15m</span>
                <span>30m</span>
              </div>
            </div>

            {/* Depth */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.depthLabel}</span>
                </span>
                <span className="font-mono font-bold text-cyan-300">{inputState.depth} cm</span>
              </div>
              <input
                type="range"
                min="15"
                max="100"
                step="1"
                value={inputState.depth}
                onChange={(e) => setInputState({ ...inputState, depth: Number(e.target.value) })}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>15cm</span>
                <span>50cm</span>
                <span>100cm</span>
              </div>
            </div>
          </div>

          {/* Age & Exposure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.ageLabel}</span>
              </label>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl">
                <input
                  type="number"
                  min="1"
                  max="80"
                  value={inputState.ageYears}
                  onChange={(e) =>
                    setInputState({ ...inputState, ageYears: Math.max(1, Number(e.target.value)) })
                  }
                  className="w-full bg-transparent font-mono font-bold text-white focus:outline-none text-xs"
                />
                <span className="text-xs text-slate-400">{isArabic ? 'سنة' : 'Yrs'}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.exposureLabel}</span>
              </label>
              <select
                value={inputState.exposure}
                onChange={(e) =>
                  setInputState({
                    ...inputState,
                    exposure: e.target.value as EnvironmentExposure,
                  })
                }
                className="w-full px-2.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-semibold"
              >
                <option value="coastal">{t.exposures.coastal}</option>
                <option value="urban">{t.exposures.urban}</option>
                <option value="industrial">{t.exposures.industrial}</option>
              </select>
            </div>
          </div>

          {/* Run Action */}
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            {isSimulating ? (
              <span>{t.generatingAi}</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{t.runSimBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Right 3D Viewport (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <StructuralTwin3D params={params} isArabic={isArabic} />
          <div className="flex items-center justify-between text-xs text-slate-500 px-2 font-mono">
            <span>{t.viewportLiveBadge}</span>
            <span>{t.roverScanning}</span>
          </div>
        </div>
      </div>

      {/* Scenario Comparison Panel */}
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
        <ScenarioComparison
          scenarios={scenarios}
          language={language}
          params={params}
          onSelectScenario={(scenarioType) => onNavigateToBooking(scenarioType)}
          onScrollToForm={() => onNavigateToBooking('riva_service')}
        />
      </div>
    </div>
  );
};

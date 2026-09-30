import React, { useState } from 'react';
import { ExecutionPhase } from '../types';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Flag 
} from 'lucide-react';

interface RoadmapPhasesProps {
  phases: ExecutionPhase[];
}

export const RoadmapPhases: React.FC<RoadmapPhasesProps> = ({ phases }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const phaseColors = [
    'border-blue-500 text-blue-600',
    'border-indigo-500 text-indigo-600',
    'border-purple-500 text-purple-600',
    'border-amber-500 text-amber-600',
    'border-emerald-500 text-emerald-600',
    'border-teal-500 text-teal-600',
    'border-rose-500 text-rose-600',
    'border-cyan-500 text-cyan-600',
    'border-slate-800 text-slate-800',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-700" />
            <span>Section 25: 9-Phase Step-by-Step Execution Sequence</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            A battle-tested phased roadmap guiding the venture from initial discovery to sustainable break-even scale.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          9 Milestone Phases
        </div>
      </div>

      {/* Horizontal Phase Milestone Bar */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1.5 sm:grid sm:grid-cols-5 md:grid-cols-9 sm:gap-1.5">
        {phases.map((p, idx) => {
          const isActive = activePhaseIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all shrink-0 min-w-[125px] sm:min-w-0 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                Phase {p.phaseNumber || idx + 1}
              </div>
              <div className="text-xs font-semibold truncate mt-0.5">
                {p.title.split('—')[1]?.trim() || p.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Detail Focus Card */}
      {phases[activePhaseIndex] && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Phase {phases[activePhaseIndex].phaseNumber} Milestone Deliverables
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {phases[activePhaseIndex].title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Timeframe: {phases[activePhaseIndex].timeframe}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Key Actionable Deliverables & Exit Criteria:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {phases[activePhaseIndex].keyDeliverables.map((deliv, dIdx) => (
                <div
                  key={dIdx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full 9-Phase Overview Timeline */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
          Full Lifecycle Roadmap
        </h3>

        <div className="space-y-4">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border transition-all ${
                activePhaseIndex === i
                  ? 'border-slate-800 bg-slate-50/70 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {phase.phaseNumber}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {phase.title}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {phase.timeframe}
                </span>
              </div>

              <ul className="text-xs text-slate-600 pl-8 space-y-1">
                {phase.keyDeliverables.map((d, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

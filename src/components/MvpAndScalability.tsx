import React from 'react';
import { MvpStrategy, ScalabilityStage } from '../types';
import { 
  Rocket, 
  TrendingUp, 
  ShieldAlert, 
  Layers, 
  Check, 
  Clock, 
  TestTube2,
  AlertTriangle
} from 'lucide-react';

interface MvpAndScalabilityProps {
  mvp: MvpStrategy;
  scalability: ScalabilityStage[];
  risksAndMitigations: { risk: string; severity: 'High' | 'Medium' | 'Low'; mitigation: string }[];
}

export const MvpAndScalability: React.FC<MvpAndScalabilityProps> = ({
  mvp,
  scalability,
  risksAndMitigations,
}) => {
  return (
    <div className="space-y-6">
      {/* Section 20: MVP Engine */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Rocket className="w-4 h-4 text-slate-700" />
              <span>Section 20: Minimum Viable Product (MVP) Engine</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Prevent premature capital burn by separating Day-1 necessities from staged future enhancements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Launch Now */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Launch Now (Day 1 Core)
              </div>
            </div>
            <ul className="text-xs text-emerald-950 space-y-1.5 pt-1">
              {mvp.launchNow.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Test First */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Test First (Pre-Capital Validation)
              </div>
            </div>
            <ul className="text-xs text-amber-950 space-y-1.5 pt-1">
              {mvp.testFirst.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <TestTube2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Later */}
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Add Later (Post-Revenue Phase)
              </div>
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
              {mvp.addLater.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section 21: Scalability Engine */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-700" />
              <span>Section 21: Growth & Scalability Trajectory</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Infrastructure and headcount requirements across small, medium, and enterprise scale.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scalability.map((stg, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {stg.stage}
                </span>
                <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold">
                  {stg.costMultiplierOrEstimate}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-snug">
                {stg.description}
              </p>

              <div className="text-xs space-y-1 pt-2 border-t border-slate-200">
                <div>
                  <span className="font-semibold text-slate-800">Operational Capacity: </span>
                  <span className="text-slate-600">{stg.capacity}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Team Footprint: </span>
                  <span className="text-slate-600">{stg.requiredTeam}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-700 block mb-1">Key Infrastructure:</span>
                <ul className="text-[11px] text-slate-600 space-y-0.5">
                  {stg.keyInfrastructure.map((inf, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{inf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risks & Mitigations */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-700" />
            <span>Operational Risk Assessment & Mitigation Strategies</span>
          </h3>
        </div>

        <div className="space-y-3">
          {risksAndMitigations.map((rm, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{rm.risk}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  rm.severity === 'High'
                    ? 'bg-rose-100 text-rose-800'
                    : rm.severity === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {rm.severity} Risk
                </span>
              </div>
              <div className="text-xs text-slate-600">
                <strong className="text-slate-800">Strategic Mitigation: </strong>
                {rm.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

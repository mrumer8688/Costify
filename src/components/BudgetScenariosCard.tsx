import React, { useState } from 'react';
import { 
  BusinessPlanData, 
  CurrencyCode, 
  BudgetScenario 
} from '../types';
import { formatCurrency, convertCurrency } from '../utils/currencies';
import { 
  DollarSign, 
  Check, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  Clock, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface BudgetScenariosCardProps {
  plan: BusinessPlanData;
  displayCurrency: CurrencyCode;
  onApplyOptimizedBudget?: (target: number) => void;
}

export const BudgetScenariosCard: React.FC<BudgetScenariosCardProps> = ({
  plan,
  displayCurrency,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'Starter' | 'Recommended' | 'Premium'>('Recommended');
  const [targetBudgetInput, setTargetBudgetInput] = useState<string>('');
  const [optimizing, setOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  const planCurr = plan.currency || 'USD';

  const val = (num: number = 0) => {
    return convertCurrency(num, planCurr, displayCurrency).convertedAmount;
  };

  const scenarios: BudgetScenario[] = [
    plan.budgetScenarios?.starter || {
      name: 'Starter',
      label: 'Minimum Realistic Setup',
      setupCost: 0,
      initialOperatingCost: 0,
      initialCashRequirement: 0,
      monthlyRecurringCost: 0,
      annualRecurringCost: 0,
      summary: 'Lean barebones bootstrap entry',
      includedFeatures: [],
    },
    plan.budgetScenarios?.recommended || {
      name: 'Recommended',
      label: 'Balanced Production Setup',
      setupCost: 0,
      initialOperatingCost: 0,
      initialCashRequirement: 0,
      monthlyRecurringCost: 0,
      annualRecurringCost: 0,
      summary: 'Optimal quality and operating buffer balance',
      includedFeatures: [],
    },
    plan.budgetScenarios?.premium || {
      name: 'Premium',
      label: 'High-Spec Flagship Setup',
      setupCost: 0,
      initialOperatingCost: 0,
      initialCashRequirement: 0,
      monthlyRecurringCost: 0,
      annualRecurringCost: 0,
      summary: 'Top tier equipment and high initial capacity',
      includedFeatures: [],
    },
  ];

  const handleRunOptimizer = async () => {
    const num = parseFloat(targetBudgetInput);
    if (isNaN(num) || num <= 0) return;

    setOptimizing(true);
    try {
      const res = await fetch('/api/optimize-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPlan: plan,
          targetBudget: num,
          currency: displayCurrency,
        }),
      });
      const data = await res.json();
      setOptimizationResult(data);
    } catch (err) {
      console.error('Optimization error:', err);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3-Tier Budget Scenario Matrix */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-slate-700" />
              <span>Section 13: Three Realistic Budget Scenarios</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Distinguishing initial one-time capital from 3-month operating cash cushion and recurring burn.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Currency: {displayCurrency}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {scenarios.map((sc) => {
            const isSelected = selectedScenario === sc.name;
            const isRecommended = sc.name === 'Recommended';

            return (
              <div
                key={sc.name}
                onClick={() => setSelectedScenario(sc.name)}
                className={`rounded-2xl p-5 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? isRecommended
                      ? 'border-slate-900 bg-white shadow-md ring-2 ring-slate-900/10'
                      : 'border-slate-800 bg-white shadow-md'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 right-6 bg-slate-900 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Recommended Sweet Spot
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {sc.name} Scenario
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {sc.label}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {sc.summary}
                  </p>

                  {/* Primary Cash Requirement Highlight */}
                  <div className="my-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">
                      Total Initial Cash Required
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 break-words">
                      {formatCurrency(val(sc.initialCashRequirement), displayCurrency)}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Setup Capital + Operating Runway
                    </div>
                  </div>

                  {/* Math Breakdown Table */}
                  <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>One-Time Setup Hardware:</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(val(sc.setupCost), displayCurrency)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span>Initial Reserve Buffer:</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(val(sc.initialOperatingCost), displayCurrency)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span>Monthly Recurring Burn:</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(val(sc.monthlyRecurringCost), displayCurrency)}/mo
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span>Annualized Recurring:</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(val(sc.annualRecurringCost), displayCurrency)}/yr
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Included Scope:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {sc.includedFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScenario(sc.name);
                    }}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Active Plan Baseline' : 'Select Baseline'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 19: Budget Optimization Engine (I have $X) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Section 19: Budget Optimization & Allocation Engine</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">
              Fit your venture into a specific capital ceiling without sacrificing core viability
            </h3>
          </div>
          <span className="text-xs text-slate-400">Keep · Reduce · Replace · Delay</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-72">
            <span className="absolute left-3 top-2.5 text-slate-400 font-semibold text-xs">
              {displayCurrency}
            </span>
            <input
              type="number"
              min="100"
              placeholder={`e.g. 5000`}
              value={targetBudgetInput}
              onChange={(e) => setTargetBudgetInput(e.target.value)}
              className="w-full pl-12 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-slate-900 min-h-[44px]"
            />
          </div>

          <button
            onClick={handleRunOptimizer}
            disabled={optimizing || !targetBudgetInput}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs disabled:opacity-50 transition-colors min-h-[44px] cursor-pointer"
          >
            {optimizing ? (
              <span>Analyzing Reallocation...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Optimize For My Budget</span>
              </>
            )}
          </button>
        </div>

        {/* Static Plan Pre-computed Optimization (If not yet run interactive) */}
        {!optimizationResult && plan.optimization && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-xl">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                KEEP (Critical Quality)
              </div>
              <ul className="text-xs text-emerald-900 space-y-1">
                {plan.optimization.keep.map((k, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="font-bold">•</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                REDUCE & REPLACE
              </div>
              <ul className="text-xs text-amber-900 space-y-1">
                {plan.optimization.reduce.concat(plan.optimization.replace || []).slice(0, 4).map((r, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                DELAY & UPGRADE LATER
              </div>
              <ul className="text-xs text-slate-700 space-y-1">
                {plan.optimization.delay.concat(plan.optimization.upgradeLater || []).slice(0, 4).map((d, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="font-bold">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Live Interactive Optimization Result */}
        {optimizationResult && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 mt-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900">
                Custom Target Optimization Result ({displayCurrency} {targetBudgetInput})
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                optimizationResult.feasibleAtTarget ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {optimizationResult.feasibleAtTarget ? 'Feasible with Strategic Adjustments' : 'Requires Phased Entry'}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {optimizationResult.optimizationSummary}
            </p>

            {optimizationResult.optimization && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-xs">
                {optimizationResult.optimization.keep && (
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-emerald-700 uppercase text-[10px]">Must Keep:</div>
                    <ul className="mt-1 space-y-0.5 text-slate-600 text-[11px]">
                      {optimizationResult.optimization.keep.map((x: string, i: number) => (
                        <li key={i}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {optimizationResult.optimization.reduce && (
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-amber-700 uppercase text-[10px]">Reduce:</div>
                    <ul className="mt-1 space-y-0.5 text-slate-600 text-[11px]">
                      {optimizationResult.optimization.reduce.map((x: string, i: number) => (
                        <li key={i}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {optimizationResult.optimization.replace && (
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-blue-700 uppercase text-[10px]">Replace:</div>
                    <ul className="mt-1 space-y-0.5 text-slate-600 text-[11px]">
                      {optimizationResult.optimization.replace.map((x: string, i: number) => (
                        <li key={i}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {optimizationResult.optimization.delay && (
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-600 uppercase text-[10px]">Delay:</div>
                    <ul className="mt-1 space-y-0.5 text-slate-600 text-[11px]">
                      {optimizationResult.optimization.delay.map((x: string, i: number) => (
                        <li key={i}>• {x}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

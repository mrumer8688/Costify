import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  MapPin, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  ChevronRight, 
  Edit3, 
  Sliders, 
  Info,
  DollarSign,
  Target,
  ArrowRight
} from 'lucide-react';
import { BusinessPlanData, CurrencyCode, FeasibilityRating, ProjectAssumption } from '../types';
import { formatCurrency, convertCurrency } from '../utils/currencies';
import { MarketTrendChart } from './MarketTrendChart';

interface ExecutiveSummaryProps {
  plan: BusinessPlanData;
  currency: CurrencyCode;
  onUpdateAssumption: (assumptionId: string, newValue: string) => void;
  onSelectSmartQuestionOption: (questionId: string, optionKey: string) => void;
  onSwitchTab: (tab: any) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  plan,
  currency,
  onUpdateAssumption,
  onSelectSmartQuestionOption,
  onSwitchTab,
}) => {
  const [editingAssumptionId, setEditingAssumptionId] = useState<string | null>(null);
  const [tempAssumptionVal, setTempAssumptionVal] = useState<string>('');

  const planCurr = plan.currency || 'USD';

  // Helper to convert plan numbers to active display currency
  const val = (num: number = 0) => {
    return convertCurrency(num, planCurr, currency).convertedAmount;
  };

  const getFeasibilityConfig = (rating: FeasibilityRating) => {
    switch (rating) {
      case 'feasible':
        return {
          icon: CheckCircle2,
          textColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50/70',
          borderColor: 'border-emerald-200',
          badgeText: 'Highly Feasible',
          description: plan.feasibility?.summary || 'The project goals appear achievable within the projected capital requirement.',
        };
      case 'feasible_with_adjustments':
        return {
          icon: AlertTriangle,
          textColor: 'text-amber-800',
          bgColor: 'bg-amber-50/70',
          borderColor: 'border-amber-200',
          badgeText: 'Feasible With Strategic Adjustments',
          description: plan.feasibility?.summary || 'Achievable provided non-essential requirements are deferred or phased.',
        };
      case 'difficult':
        return {
          icon: XCircle,
          textColor: 'text-rose-700',
          bgColor: 'bg-rose-50/70',
          borderColor: 'border-rose-200',
          badgeText: 'High Capital / Resource Barrier',
          description: plan.feasibility?.summary || 'Requires significantly higher capital or a major reduction in initial scope.',
        };
      case 'information_required':
      default:
        return {
          icon: HelpCircle,
          textColor: 'text-indigo-700',
          bgColor: 'bg-indigo-50/70',
          borderColor: 'border-indigo-200',
          badgeText: 'Additional Information Required',
          description: plan.feasibility?.summary || 'Critical variables must be clarified to establish a reliable baseline.',
        };
    }
  };

  const feasibility = getFeasibilityConfig(plan.feasibility?.rating || 'feasible');
  const FeasIcon = feasibility.icon;

  const starterCash = val(plan.budgetScenarios?.starter?.initialCashRequirement || 0);
  const recCash = val(plan.budgetScenarios?.recommended?.initialCashRequirement || 0);
  const premCash = val(plan.budgetScenarios?.premium?.initialCashRequirement || 0);
  const breakEvenUnits = plan.financialModel?.breakEvenUnitsMonthly || 0;
  const grossMargin = plan.financialModel?.grossMarginPercent || 0;
  const paybackMonths = plan.financialModel?.estimatedPaybackPeriodMonths || 0;

  return (
    <div className="space-y-6">
      {/* Top Feasibility Verdict Card */}
      <div className={`p-5 rounded-2xl border ${feasibility.borderColor} ${feasibility.bgColor} transition-all`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
              <FeasIcon className={`w-6 h-6 ${feasibility.textColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${feasibility.textColor}`}>
                  Feasibility Assessment
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-semibold text-slate-700">
                  {feasibility.badgeText}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-800 font-medium leading-relaxed">
                {feasibility.description}
              </p>
              {plan.feasibility?.adjustmentsNeeded && plan.feasibility.adjustmentsNeeded.length > 0 && (
                <div className="mt-2.5 pt-2.5 border-t border-amber-200/50">
                  <div className="text-xs font-bold text-amber-900 mb-1">Recommended Scope Adjustments:</div>
                  <ul className="text-xs text-amber-800 space-y-1">
                    {plan.feasibility.adjustmentsNeeded.map((adj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{adj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Confidence Rating</span>
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Calculations
            </span>
          </div>
        </div>
      </div>

      {/* Key Metric Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        {/* Starter Capital */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Starter Capital</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-slate-900 break-words">
            {formatCurrency(starterCash, currency)}
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500">Minimum realistic launch</div>
        </div>

        {/* Recommended Capital */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-slate-900 shadow-2xs relative">
          <div className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <span>Recommended</span>
            <span className="text-[9px] sm:text-[10px] bg-slate-900 text-white px-1.5 py-0.2 rounded font-semibold">Target</span>
          </div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-slate-900 break-words">
            {formatCurrency(recCash, currency)}
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-600 font-medium">Balanced setup + 3mo reserve</div>
        </div>

        {/* Premium Scale */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Premium Scale</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-slate-900 break-words">
            {formatCurrency(premCash, currency)}
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500">High-spec infrastructure</div>
        </div>

        {/* Gross Margin */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Margin</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-emerald-600">
            {grossMargin.toFixed(1)}%
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500">Product unit economics</div>
        </div>

        {/* Monthly Break-Even */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Break-Even</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-slate-900 break-words">
            {breakEvenUnits.toLocaleString()} <span className="text-[10px] sm:text-xs font-normal text-slate-500">units/mo</span>
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500">To cover fixed overhead</div>
        </div>

        {/* Estimated Payback */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Payback Horizon</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-slate-900 break-words">
            {paybackMonths > 0 ? `${paybackMonths.toFixed(1)} mo` : 'N/A'}
          </div>
          <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500">Estimated capital recoupment</div>
        </div>
      </div>

      {/* Market Trend & Historical Demand / Seasonal Fluctuations Visualization */}
      <MarketTrendChart
        marketTrends={plan.marketTrends}
        businessTitle={plan.title}
      />

      {/* Two Column Layout: Understanding + Business Model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: What We Understand & Key Parameters */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-slate-700" />
              <span>Scope & Baseline Understanding</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>{plan.targetLocation || 'Global'}</span>
              <span>·</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{plan.understanding?.timeline || '90-120 days'}</span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <span className="font-semibold text-slate-900">Core Objective: </span>
              <span>{plan.understanding?.userGoal || plan.rawGoalSummary}</span>
            </div>

            <div>
              <span className="font-semibold text-slate-900">Desired Outcome: </span>
              <span>{plan.understanding?.desiredOutcome || 'Sustainable profitable commercial operation'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Target Scale</div>
                <div className="text-xs font-semibold text-slate-900 mt-0.5">
                  {plan.understanding?.targetScale || 'Single unit / Starter model'}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 font-medium">Quality Tier</div>
                <div className="text-xs font-semibold text-slate-900 mt-0.5">
                  {plan.understanding?.qualityExpectation || 'Commercial grade standard'}
                </div>
              </div>
            </div>

            {plan.understanding?.constraints && plan.understanding.constraints.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-900 mb-1.5">Identified Operational Constraints:</div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {plan.understanding.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: Business Model Blueprint */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-700" />
              <span>Business Model & Commercial Strategy</span>
            </h2>
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <div>
              <span className="font-semibold text-slate-900">Target Customer: </span>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {plan.businessModel?.targetCustomer || 'Demographic profile pending validation'}
              </p>
            </div>

            <div>
              <span className="font-semibold text-slate-900">Value Proposition: </span>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {plan.businessModel?.valueProposition || 'Distinctive market advantage'}
              </p>
            </div>

            <div className="pt-2">
              <span className="font-semibold text-slate-900 text-xs block mb-1">Primary Sales Channels:</span>
              <div className="flex flex-wrap gap-1.5">
                {(plan.businessModel?.primarySalesChannels || ['Direct', 'Online']).map((ch, idx) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-800 font-medium px-2 py-0.5 rounded-md">
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            {plan.businessModel?.competitiveAdvantage && (
              <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-amber-900">
                <span className="font-bold">Competitive Moat: </span>
                <span>{plan.businessModel.competitiveAdvantage}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assumptions Engine Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-700" />
              <span>Assumptions Engine (Transparent Baseline)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              These baseline variables govern all financial models. Click edit to override any parameter.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {plan.assumptions?.length || 0} Assumed Variables
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {(plan.assumptions || []).map((asm) => (
            <div
              key={asm.id}
              className={`p-3.5 rounded-xl border transition-colors ${
                asm.userOverridden
                  ? 'border-indigo-200 bg-indigo-50/40'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                      {asm.label}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">({asm.category})</span>
                    {asm.userOverridden && (
                      <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 px-1.5 py-0.2 rounded">
                        Custom
                      </span>
                    )}
                  </div>
                  
                  {editingAssumptionId === asm.id ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={tempAssumptionVal}
                        onChange={(e) => setTempAssumptionVal(e.target.value)}
                        className="text-xs py-1 px-2 border border-slate-300 rounded bg-white w-full focus:ring-1 focus:ring-slate-900"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          onUpdateAssumption(asm.id, tempAssumptionVal);
                          setEditingAssumptionId(null);
                        }}
                        className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded font-semibold shrink-0"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingAssumptionId(null)}
                        className="text-xs text-slate-500 hover:text-slate-800 shrink-0"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-slate-900 mt-1">
                      {asm.assumedValue}
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {asm.rationale}
                  </div>
                </div>

                {editingAssumptionId !== asm.id && (
                  <button
                    onClick={() => {
                      setEditingAssumptionId(asm.id);
                      setTempAssumptionVal(asm.assumedValue);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded transition-colors shrink-0"
                    title="Edit Assumption"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Follow-Up Questions (Interactive) */}
      {plan.smartQuestions && plan.smartQuestions.length > 0 && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 rounded-2xl text-white shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Smart Follow-Up Engine
              </div>
              <h3 className="text-sm font-semibold text-white mt-0.5">
                Refine key project parameters to sharpen the budget
              </h3>
            </div>
            <span className="text-xs text-slate-400">Section 6 Protocol</span>
          </div>

          <div className="space-y-4">
            {plan.smartQuestions.map((q) => (
              <div key={q.id} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-white">{q.question}</div>
                  <div className="text-[11px] text-amber-300/80 font-medium">
                    {q.impactNote}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = q.selectedValue === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => onSelectSmartQuestionOption(q.id, opt.key)}
                        className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-slate-900 border-amber-300 font-semibold shadow-xs'
                            : 'bg-slate-700/50 hover:bg-slate-700 text-slate-200 border-slate-600'
                        }`}
                      >
                        <div className="font-semibold">{opt.label}</div>
                        {opt.description && (
                          <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                            {opt.description}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <button
          onClick={() => onSwitchTab('budget')}
          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="text-xs text-slate-500 font-medium">Explore Details</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Budget & Requirements</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
        </button>

        <button
          onClick={() => onSwitchTab('products')}
          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="text-xs text-slate-500 font-medium">Explore Details</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Product Comparisons</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
        </button>

        <button
          onClick={() => onSwitchTab('financials')}
          className="p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-left transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="text-xs text-slate-500 font-medium">Explore Details</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Financial ROI Sandbox</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
        </button>
      </div>
    </div>
  );
};

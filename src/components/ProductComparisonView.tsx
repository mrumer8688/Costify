import React, { useState } from 'react';
import { 
  ProductComparisonGroup, 
  ProductOption, 
  CurrencyCode 
} from '../types';
import { formatCurrency, convertCurrency } from '../utils/currencies';
import { 
  Check, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Search,
  CheckCircle2
} from 'lucide-react';

interface ProductComparisonViewProps {
  comparisonGroups: ProductComparisonGroup[];
  planCurrency: CurrencyCode;
  displayCurrency: CurrencyCode;
  onResearchNewProduct?: (query: string) => void;
}

export const ProductComparisonView: React.FC<ProductComparisonViewProps> = ({
  comparisonGroups,
  planCurrency,
  displayCurrency,
}) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const currentGroup = comparisonGroups[activeGroupIndex] || comparisonGroups[0];

  const val = (num: number = 0) => {
    return convertCurrency(num, planCurrency, displayCurrency).convertedAmount;
  };

  if (!comparisonGroups || comparisonGroups.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
        No product comparisons configured for this venture.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-slate-700" />
            <span>Sections 11 & 12: Product & Equipment Comparison Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Objective evaluation across Budget, Balanced, and Premium tiers with realistic trade-off analysis.
          </p>
        </div>

        {/* Group Selector Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto">
          {comparisonGroups.map((grp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGroupIndex(idx)}
              className={`py-2 px-3.5 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap min-h-[38px] flex items-center cursor-pointer ${
                activeGroupIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {grp.categoryName}
            </button>
          ))}
        </div>
      </div>

      {/* Strategic Verdict Banner */}
      {currentGroup?.verdict && (
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3">
          <div className="p-1.5 bg-amber-100 rounded-lg text-amber-800 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Analyst Recommendation Verdict
            </div>
            <p className="text-xs text-amber-950 font-medium mt-0.5 leading-relaxed">
              {currentGroup.verdict}
            </p>
          </div>
        </div>
      )}

      {/* 3 Tiers Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {currentGroup?.options?.map((opt, i) => {
          const isBalanced = opt.tier === 'Balanced';
          return (
            <div
              key={i}
              className={`rounded-2xl p-5 border-2 flex flex-col justify-between transition-all ${
                isBalanced
                  ? 'border-slate-900 bg-white shadow-sm ring-1 ring-slate-900/10'
                  : 'border-slate-200 bg-slate-50/40 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      opt.tier === 'Budget'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opt.tier === 'Balanced'
                        ? 'bg-slate-900 text-amber-300'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {opt.tier} Option
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {opt.dataStatus === 'verified' ? '✓ Verified Price' : 'Estimated Price'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2">
                  {opt.name}
                </h3>
                <div className="text-[11px] text-slate-500 font-medium">
                  {opt.modelOrVendor}
                </div>

                {/* Price Display */}
                <div className="my-3 p-3 bg-slate-50 rounded-xl">
                  <div className="text-2xl font-black text-slate-900">
                    {formatCurrency(val(opt.price), displayCurrency)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Estimated commercial purchase cost
                  </div>
                </div>

                {/* Key Specifications */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Capacity / Spec:</span>
                    <span className="font-medium text-slate-800 text-[11px]">{opt.capacityOrSpec}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Manufacturer Warranty:</span>
                    <span className="font-medium text-slate-800 text-[11px]">{opt.warranty}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-700 font-bold text-[11px] block mb-1">Key Technical Features:</span>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {opt.keyFeatures.map((kf, kfIdx) => (
                        <li key={kfIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{kf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-700 font-bold text-[11px] block mb-0.5">Suitable For:</span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {opt.suitableFor}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-rose-700 font-bold text-[11px] block mb-0.5">Trade-Offs & Limitations:</span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {opt.tradeOffs}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table Format (Section 12 specification) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden mt-6">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Direct Comparison Matrix: {currentGroup?.categoryName}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                <th className="py-2.5 px-3">Option</th>
                <th className="py-2.5 px-3">Product Name</th>
                <th className="py-2.5 px-3 text-right">Price ({displayCurrency})</th>
                <th className="py-2.5 px-3">Capacity / Specification</th>
                <th className="py-2.5 px-3">Warranty</th>
                <th className="py-2.5 px-3">Target Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {currentGroup?.options?.map((opt, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3 font-bold text-slate-900">{opt.tier}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{opt.name}</div>
                    <div className="text-[10px] text-slate-400">{opt.modelOrVendor}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    {formatCurrency(val(opt.price), displayCurrency)}
                  </td>
                  <td className="py-3 px-3 text-[11px]">{opt.capacityOrSpec}</td>
                  <td className="py-3 px-3 text-[11px]">{opt.warranty}</td>
                  <td className="py-3 px-3 text-[11px] text-slate-600">{opt.suitableFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

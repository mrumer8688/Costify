import React, { useState } from 'react';
import { CurrencyCode } from '../types';
import { SUPPORTED_CURRENCIES } from '../utils/currencies';
import { 
  Sparkles, 
  X, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Layers, 
  Zap,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface NewPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePlan: (params: {
    goal: string;
    budget?: number;
    currency: CurrencyCode;
    location: string;
    scale: string;
    experienceLevel: string;
    timeline: string;
  }) => Promise<void>;
  isGenerating: boolean;
}

export const NewPlanModal: React.FC<NewPlanModalProps> = ({
  isOpen,
  onClose,
  onGeneratePlan,
  isGenerating,
}) => {
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [location, setLocation] = useState('Austin, TX (Urban)');
  const [scale, setScale] = useState('Compact Starter (Solo / Lean Team)');
  const [experienceLevel, setExperienceLevel] = useState('Motivated First-Time Operator');
  const [timeline, setTimeline] = useState('90 to 120 Days');

  if (!isOpen) return null;

  const presets = [
    {
      title: 'Artisan Espresso Bar',
      goal: 'Open a boutique 550 sq ft specialty espresso and slow bar with commercial 2-group machinery.',
      budget: '50000',
      currency: 'USD' as CurrencyCode,
      location: 'Austin, TX',
      scale: 'Compact Storefront (12 seats)',
    },
    {
      title: '$2,000 Lean E-Commerce',
      goal: 'Launch a direct-to-consumer sustainable apparel brand with on-demand fulfillment, Shopify, and $2,000 initial budget.',
      budget: '2000',
      currency: 'USD' as CurrencyCode,
      location: 'Online / US',
      scale: 'Solo Founder Bootstrap',
    },
    {
      title: 'PKR 500,000 Home Bakery / Cloud Kitchen',
      goal: 'Start a premium gourmet home bakery and cloud kitchen delivering artisan desserts on Foodpanda and Instagram.',
      budget: '500000',
      currency: 'PKR' as CurrencyCode,
      location: 'Lahore / Karachi, Pakistan',
      scale: 'Home Kitchen Phase 1',
    },
    {
      title: 'B2B SaaS Automation Tool',
      goal: 'Build and launch a specialized AI document extraction SaaS for boutique accounting firms with $3,500 runway.',
      budget: '3500',
      currency: 'USD' as CurrencyCode,
      location: 'Remote / Global',
      scale: 'Digital Micro-SaaS',
    },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setGoal(p.goal);
    setBudget(p.budget);
    setCurrency(p.currency);
    setLocation(p.location);
    setScale(p.scale);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || isGenerating) return;

    await onGeneratePlan({
      goal: goal.trim(),
      budget: budget ? parseFloat(budget) : undefined,
      currency,
      location,
      scale,
      experienceLevel,
      timeline,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl border border-slate-200 space-y-5 sm:space-y-6 my-auto max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                New Venture Strategic Analysis
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Grounded in the Costify 53-Section Master Business Planning Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="text-slate-400 hover:text-slate-700 p-2 -mr-1 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick One-Click Presets */}
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Instant Presets</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-50 text-xs transition-colors"
              >
                <div className="font-bold text-slate-900">{p.title}</div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{p.goal}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Plan Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-900 font-bold mb-1">
              What do you want to start or build? *
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g., 'I want to start an online store with $2,000' or 'I want to open a specialty coffee shop' (English, Urdu or Roman Urdu accepted)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 text-xs text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Budget Ceiling (Optional)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Leave blank for auto"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-slate-900 cursor-pointer"
              >
                {Object.values(SUPPORTED_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol} - {c.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Target Location / Market
              </label>
              <input
                type="text"
                placeholder="e.g. Austin TX, Karachi, London"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Planned Scale
              </label>
              <input
                type="text"
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Operator Experience
              </label>
              <input
                type="text"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Target Launch Horizon
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="py-2.5 px-4 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold text-xs min-h-[44px] cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGenerating || !goal.trim()}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm disabled:opacity-50 transition-colors min-h-[44px] cursor-pointer text-xs"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Synthesizing 53-Section Plan...</span>
                </>
              ) : (
                <>
                  <span>Generate Complete Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { 
  DollarSign, 
  Calculator, 
  CheckSquare, 
  Layers, 
  TrendingUp, 
  X,
  ChevronRight,
  Briefcase,
  PlusCircle,
  Printer
} from 'lucide-react';
import { CurrencyCode, BusinessPlanData } from '../types';
import { SUPPORTED_CURRENCIES } from '../utils/currencies';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  plan: BusinessPlanData;
  activeTab: 'overview' | 'budget' | 'products' | 'financials' | 'roadmap' | 'checklists';
  setActiveTab: (tab: 'overview' | 'budget' | 'products' | 'financials' | 'roadmap' | 'checklists') => void;
  currency: CurrencyCode;
  onCurrencyChange?: (curr: CurrencyCode) => void;
  onOpenNewPlanModal?: () => void;
  onPrint?: () => void;
  isGenerating?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  plan,
  activeTab,
  setActiveTab,
  currency,
  onCurrencyChange,
  onOpenNewPlanModal,
  onPrint,
  isGenerating,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  // Manage open and close animation transitions
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isRendered) return null;

  const navItems = [
    {
      id: 'overview' as const,
      label: 'Overview & Feasibility',
      subtitle: 'Executive summary, assumptions & feasibility score',
      icon: Layers,
    },
    {
      id: 'budget' as const,
      label: 'Budget & Requirements',
      subtitle: '3 scenarios, CapEx, OpEx & hidden costs',
      icon: DollarSign,
      badge: plan.requirements?.length || 0,
      badgeLabel: 'items',
    },
    {
      id: 'products' as const,
      label: 'Product & Tool Comparison',
      subtitle: 'Vendor options, specifications & decision matrix',
      icon: Briefcase,
      badge: plan.productComparisons?.length || 0,
      badgeLabel: 'groups',
    },
    {
      id: 'financials' as const,
      label: 'Financial ROI & Break-Even',
      subtitle: 'Dynamic sandbox, unit economics & payback model',
      icon: Calculator,
    },
    {
      id: 'roadmap' as const,
      label: '9-Phase Execution Roadmap',
      subtitle: 'Chronological timeline, key deliverables & milestones',
      icon: TrendingUp,
      badge: plan.phases?.length || 9,
      badgeLabel: 'phases',
    },
    {
      id: 'checklists' as const,
      label: 'Tasks & Checklists',
      subtitle: 'Action items, equipment procurement & pre-launch checklist',
      icon: CheckSquare,
      badge: plan.tasks?.length || 0,
      badgeLabel: 'tasks',
    },
  ];

  const handleSelectTab = (tabId: 'overview' | 'budget' | 'products' | 'financials' | 'roadmap' | 'checklists') => {
    setActiveTab(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop with smooth fade in and fade out */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 ease-in-out cursor-pointer ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar drawer with smooth slide in and slide out from right */}
      <aside 
        className={`fixed inset-y-0 right-0 w-84 sm:w-96 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50 border-l border-slate-200 transition-transform duration-300 ease-out transform ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Navigation Sidebar"
      >
        {/* Navigation Items (The 6 Tabs) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="flex items-center justify-between px-2 py-2 mb-1 border-b border-slate-100">
            <span className="font-bold italic text-slate-900 text-base tracking-wide select-none">
              COSTIFY
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 hover:rotate-90 active:scale-90 cursor-pointer"
              title="Close Menu (Esc)"
              aria-label="Close Sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile-only header controls: New Venture Plan, Currency, Print/PDF */}
          <div className="block sm:hidden px-2 pt-1 pb-3 mb-2 border-b border-slate-100 space-y-2.5">
            {/* New Venture Plan CTA */}
            <button
              onClick={() => {
                onClose();
                onOpenNewPlanModal?.();
              }}
              disabled={isGenerating}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer min-h-[42px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Venture Plan</span>
            </button>

            {/* Currency & Print Controls Row */}
            <div className="grid grid-cols-2 gap-2">
              {/* Currency Selector */}
              <div className="relative flex items-center">
                <label htmlFor="mobile-currency-select" className="sr-only">Currency</label>
                <select
                  id="mobile-currency-select"
                  value={currency}
                  onChange={(e) => onCurrencyChange?.(e.target.value as CurrencyCode)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-2.5 rounded-lg border-0 focus:ring-2 focus:ring-slate-900 transition-colors cursor-pointer min-h-[40px]"
                >
                  {Object.values(SUPPORTED_CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* Print / PDF */}
              <button
                onClick={() => {
                  onClose();
                  onPrint?.();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/60 cursor-pointer min-h-[40px]"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div 
                  className={`p-2 rounded-lg shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-slate-800 text-amber-400' 
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate">
                      {item.label}
                    </span>
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span 
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                          isActive 
                            ? 'bg-slate-800 text-amber-300' 
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p 
                    className={`text-[11px] line-clamp-1 mt-0.5 ${
                      isActive ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight 
                  className={`w-4 h-4 self-center shrink-0 transition-transform ${
                    isActive 
                      ? 'text-amber-400 translate-x-0.5' 
                      : 'text-slate-300 group-hover:text-slate-500'
                  }`} 
                />
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

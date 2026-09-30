import React, { useState } from 'react';
import { 
  FileDown, 
  PlusCircle, 
  Printer, 
  Menu
} from 'lucide-react';
import { CurrencyCode, BusinessPlanData } from '../types';
import { SUPPORTED_CURRENCIES } from '../utils/currencies';
import { Sidebar } from './Sidebar';

interface HeaderProps {
  plan: BusinessPlanData;
  activeTab: 'overview' | 'budget' | 'products' | 'financials' | 'roadmap' | 'checklists';
  setActiveTab: (tab: 'overview' | 'budget' | 'products' | 'financials' | 'roadmap' | 'checklists') => void;
  currency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  onOpenNewPlanModal: () => void;
  onOpenCopilot: () => void;
  onExportMarkdown: () => void;
  onPrint: () => void;
  isGenerating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  plan,
  activeTab,
  setActiveTab,
  currency,
  onCurrencyChange,
  onOpenNewPlanModal,
  onOpenCopilot,
  onExportMarkdown,
  onPrint,
  isGenerating,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        {/* Top Banner Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Logo */}
            <div className="flex items-center min-w-0">
              <span className="font-bold italic text-slate-900 text-lg sm:text-xl tracking-wide select-none">
                COSTIFY
              </span>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Currency Selector (visible on tablet & desktop, moved to menu on mobile) */}
              <div className="relative hidden sm:flex items-center">
                <label htmlFor="currency-select" className="sr-only">Currency</label>
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-1.5 px-2.5 rounded-lg border-0 focus:ring-2 focus:ring-slate-900 transition-colors cursor-pointer"
                >
                  {Object.values(SUPPORTED_CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* Print / Export (visible on tablet & desktop, moved to menu on mobile) */}
              <button
                onClick={onPrint}
                title="Print or Save as PDF"
                className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={onExportMarkdown}
                title="Export Plan as Markdown"
                className="hidden md:inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>

              {/* New Plan CTA (visible on tablet & desktop, moved to menu on mobile) */}
              <button
                onClick={onOpenNewPlanModal}
                disabled={isGenerating}
                className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Venture Plan</span>
              </button>

              <div className="h-6 w-px bg-slate-200 hidden sm:block" />

              {/* Hamburger Menu Toggle Button (Right End - remains visible on mobile, tablet, and desktop) */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -mr-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-90 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer group shadow-xs hover:shadow-sm"
                title="Open Navigation Menu"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-slate-800 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3 group-active:rotate-45" />
                <span className="hidden sm:inline-block text-xs font-bold text-slate-800">
                  Menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger Navigation Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        plan={plan}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        onOpenNewPlanModal={onOpenNewPlanModal}
        onPrint={onPrint}
        isGenerating={isGenerating}
      />
    </>
  );
};


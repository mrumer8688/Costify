import React, { useState, useEffect } from 'react';
import { 
  FinancialRoiModel, 
  CurrencyCode 
} from '../types';
import { formatCurrency, convertCurrency } from '../utils/currencies';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  RefreshCw, 
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface FinancialSandboxProps {
  initialModel: FinancialRoiModel;
  setupCapital: number;
  planCurrency: CurrencyCode;
  displayCurrency: CurrencyCode;
}

export const FinancialSandbox: React.FC<FinancialSandboxProps> = ({
  initialModel,
  setupCapital,
  planCurrency,
  displayCurrency,
}) => {
  const val = (num: number = 0) => {
    return convertCurrency(num, planCurrency, displayCurrency).convertedAmount;
  };

  // State in display currency
  const [sellingPrice, setSellingPrice] = useState<number>(val(initialModel.sellingPricePerUnit));
  const [variableCost, setVariableCost] = useState<number>(val(initialModel.variableCostPerUnit));
  const [monthlyFixed, setMonthlyFixed] = useState<number>(val(initialModel.monthlyFixedCosts));
  const [investment, setInvestment] = useState<number>(val(setupCapital));
  
  // Target monthly volume slider
  const defaultVol = Math.max(initialModel.breakEvenUnitsMonthly * 1.3, 100);
  const [targetVolume, setTargetVolume] = useState<number>(Math.round(defaultVol));

  // Sync state whenever displayCurrency, initialModel, or setupCapital change
  useEffect(() => {
    setSellingPrice(val(initialModel.sellingPricePerUnit));
    setVariableCost(val(initialModel.variableCostPerUnit));
    setMonthlyFixed(val(initialModel.monthlyFixedCosts));
    setInvestment(val(setupCapital));
    setTargetVolume(Math.round(Math.max(initialModel.breakEvenUnitsMonthly * 1.3, 100)));
  }, [displayCurrency, initialModel, setupCapital, planCurrency]);

  // Calculations
  const grossProfitPerUnit = Math.max(0, sellingPrice - variableCost);
  const grossMarginPercent = sellingPrice > 0 ? (grossProfitPerUnit / sellingPrice) * 100 : 0;
  
  const breakEvenUnitsMonthly = grossProfitPerUnit > 0 
    ? Math.ceil(monthlyFixed / grossProfitPerUnit) 
    : 0;

  const breakEvenRevenueMonthly = breakEvenUnitsMonthly * sellingPrice;

  const monthlyGrossRevenue = targetVolume * sellingPrice;
  const monthlyTotalCOGS = targetVolume * variableCost;
  const monthlyTotalGrossProfit = targetVolume * grossProfitPerUnit;
  const monthlyNetOperatingIncome = monthlyTotalGrossProfit - monthlyFixed;
  const netMarginPercent = monthlyGrossRevenue > 0 ? (monthlyNetOperatingIncome / monthlyGrossRevenue) * 100 : 0;

  const paybackPeriodMonths = monthlyNetOperatingIncome > 0 
    ? (investment / monthlyNetOperatingIncome) 
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-slate-700" />
            <span>Sections 14 & 22: Unit Economics & Financial ROI Sandbox</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test sensitivity, adjust pricing or fixed overhead, and instantly compute break-even unit volume and payback velocity.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
          Active Currency: {displayCurrency}
        </div>
      </div>

      {/* Primary KPI Result Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit Profit (Margin)</div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 break-words">
            {formatCurrency(grossProfitPerUnit, displayCurrency)}
          </div>
          <div className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-0.5">
            {grossMarginPercent.toFixed(1)}% Gross Margin
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-slate-900 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">Monthly Break-Even</div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 mt-1 break-words">
            {breakEvenUnitsMonthly.toLocaleString()} <span className="text-[10px] sm:text-xs font-normal text-slate-500">units</span>
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">
            Requires {formatCurrency(breakEvenRevenueMonthly, displayCurrency)}/mo
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Net Profit</div>
          <div className={`text-lg sm:text-2xl font-bold mt-1 break-words ${monthlyNetOperatingIncome >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {formatCurrency(monthlyNetOperatingIncome, displayCurrency)}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">
            At {targetVolume.toLocaleString()} units/mo
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Payback Horizon</div>
          <div className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 break-words">
            {paybackPeriodMonths ? `${paybackPeriodMonths.toFixed(1)} Mo` : 'Infinite'}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">
            Recoup {formatCurrency(investment, displayCurrency)}
          </div>
        </div>
      </div>

      {/* Two Column Interactive Control & P&L Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Sliders & Direct Inputs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-slate-700" />
              <span>Sensitivity Variables</span>
            </h3>
            <button
              onClick={() => {
                setSellingPrice(val(initialModel.sellingPricePerUnit));
                setVariableCost(val(initialModel.variableCostPerUnit));
                setMonthlyFixed(val(initialModel.monthlyFixedCosts));
                setInvestment(val(setupCapital));
                setTargetVolume(Math.round(defaultVol));
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Selling Price */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Average Unit Selling Price ({displayCurrency})</label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-xs font-semibold">{displayCurrency}</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-24 text-right py-0.5 px-2 border border-slate-200 rounded text-xs font-bold text-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(sellingPrice * 2.5, 100)}
                step="any"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>

            {/* Variable Cost */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Variable Cost Per Unit (COGS) ({displayCurrency})</label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-xs font-semibold">{displayCurrency}</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={variableCost}
                    onChange={(e) => setVariableCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-24 text-right py-0.5 px-2 border border-slate-200 rounded text-xs font-bold text-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(sellingPrice * 1.5, 50)}
                step="any"
                value={variableCost}
                onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>

            {/* Monthly Fixed Cost */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Monthly Fixed Overhead ({displayCurrency})</label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-xs font-semibold">{displayCurrency}</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={monthlyFixed}
                    onChange={(e) => setMonthlyFixed(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-28 text-right py-0.5 px-2 border border-slate-200 rounded text-xs font-bold text-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(monthlyFixed * 3, 10000)}
                step="any"
                value={monthlyFixed}
                onChange={(e) => setMonthlyFixed(parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>

            {/* Total Initial Investment */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Total Capital Investment ({displayCurrency})</label>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 text-xs font-semibold">{displayCurrency}</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={investment}
                    onChange={(e) => setInvestment(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-28 text-right py-0.5 px-2 border border-slate-200 rounded text-xs font-bold text-slate-900 focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(investment * 3, 20000)}
                step="any"
                value={investment}
                onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>

            {/* Target Monthly Volume Slider */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-900">Projected Monthly Sales Volume (Units)</label>
                <input
                  type="number"
                  min="1"
                  value={targetVolume}
                  onChange={(e) => setTargetVolume(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-24 text-right py-0.5 px-2 border border-indigo-200 rounded text-xs font-black text-indigo-700 focus:ring-1 focus:ring-indigo-900"
                />
              </div>
              <input
                type="range"
                min="1"
                max={Math.max(targetVolume * 3, breakEvenUnitsMonthly * 3, 500)}
                step="1"
                value={targetVolume}
                onChange={(e) => setTargetVolume(parseInt(e.target.value, 10) || 1)}
                className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Min: 1</span>
                <span className="font-bold text-slate-600">Break-Even ({breakEvenUnitsMonthly} units)</span>
                <span>Target: {targetVolume}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projected Monthly P&L Statement */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-slate-700" />
              <span>Projected Monthly Operating P&L</span>
            </h3>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Pro-Forma</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">Gross Sales Revenue:</span>
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(monthlyGrossRevenue, displayCurrency)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100 text-slate-600">
              <span>Less: Variable COGS ({targetVolume} × {formatCurrency(variableCost, displayCurrency)}):</span>
              <span className="font-semibold text-rose-600">
                −{formatCurrency(monthlyTotalCOGS, displayCurrency)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 bg-slate-50 px-2.5 rounded-lg">
              <span className="font-bold text-slate-900">Total Gross Profit ({grossMarginPercent.toFixed(1)}%):</span>
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(monthlyTotalGrossProfit, displayCurrency)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100 text-slate-600">
              <span>Less: Monthly Fixed Operating Costs:</span>
              <span className="font-semibold text-rose-600">
                −{formatCurrency(monthlyFixed, displayCurrency)}
              </span>
            </div>

            <div className={`flex justify-between items-center p-3 rounded-xl border ${
              monthlyNetOperatingIncome >= 0
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}>
              <div>
                <div className="font-bold text-xs uppercase tracking-wider">
                  Monthly Net Operating Profit
                </div>
                <div className="text-[11px] opacity-80">
                  {netMarginPercent.toFixed(1)}% Net Margin
                </div>
              </div>
              <div className="text-xl font-black">
                {formatCurrency(monthlyNetOperatingIncome, displayCurrency)}
              </div>
            </div>

            {/* Payback statement */}
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed">
              <div className="font-bold text-slate-900 mb-0.5">Payback Calculation:</div>
              {monthlyNetOperatingIncome > 0 ? (
                <span>
                  At {targetVolume.toLocaleString()} units/mo, the venture generates {formatCurrency(monthlyNetOperatingIncome, displayCurrency)}/mo net cash flow, fully recouping the {formatCurrency(investment, displayCurrency)} setup capital in approximately <strong className="text-slate-900">{paybackPeriodMonths?.toFixed(1)} months</strong>.
                </span>
              ) : (
                <span className="text-rose-700 font-semibold">
                  Current sales volume is below break-even ({breakEvenUnitsMonthly} units needed). Increase average selling price or elevate monthly transaction count to achieve positive operating cash flow.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

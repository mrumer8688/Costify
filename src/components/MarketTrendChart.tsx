import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { MarketTrendAnalysis } from '../types';
import { 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertCircle, 
  Sparkles, 
  Layers,
  Activity,
  BarChart3
} from 'lucide-react';

interface MarketTrendChartProps {
  marketTrends?: MarketTrendAnalysis;
  businessTitle: string;
}

export const MarketTrendChart: React.FC<MarketTrendChartProps> = ({
  marketTrends,
  businessTitle,
}) => {
  const [metricMode, setMetricMode] = useState<'demand' | 'revenueMultiplier'>('demand');

  // Fallback default data if not present
  const defaultData: MarketTrendAnalysis = {
    trendSummary: 'Cyclical demand patterns indicate seasonal surges in consumer spending and peak search volume.',
    peakSeason: 'Q4 (Sep - Dec)',
    troughSeason: 'Q1 (Jan - Feb)',
    annualGrowthRate: '+6.8% CAGR',
    volatilityLevel: 'Moderate',
    seasonalCashflowAdvice: 'Build a 60-day cash reserve prior to low season to cover fixed rent and baseline payroll.',
    keyDriverInsights: [
      'Seasonal foot traffic accelerates during pleasant weather and holiday gifting windows.',
      'Digital search interest spikes 3 weeks prior to physical transaction surges.',
      'Off-peak months require margin-defense promotions rather than price wars.'
    ],
    dataPoints: [
      { period: 'Jan', demandIndex: 72, searchInterest: 68, revenueMultiplier: 0.82, notes: 'Post-holiday spending contraction' },
      { period: 'Feb', demandIndex: 78, searchInterest: 74, revenueMultiplier: 0.88, notes: 'Early promotional recovery' },
      { period: 'Mar', demandIndex: 86, searchInterest: 82, revenueMultiplier: 0.94, notes: 'Spring footfall return' },
      { period: 'Apr', demandIndex: 92, searchInterest: 88, revenueMultiplier: 1.02, notes: 'Baseline normalization' },
      { period: 'May', demandIndex: 98, searchInterest: 94, revenueMultiplier: 1.08, notes: 'Early summer ramp' },
      { period: 'Jun', demandIndex: 104, searchInterest: 98, revenueMultiplier: 1.15, notes: 'High volume summer demand' },
      { period: 'Jul', demandIndex: 108, searchInterest: 100, revenueMultiplier: 1.18, notes: 'Peak summer activity' },
      { period: 'Aug', demandIndex: 99, searchInterest: 93, revenueMultiplier: 1.10, notes: 'Late summer transition' },
      { period: 'Sep', demandIndex: 112, searchInterest: 97, revenueMultiplier: 1.21, notes: 'Back-to-routine volume surge' },
      { period: 'Oct', demandIndex: 106, searchInterest: 95, revenueMultiplier: 1.16, notes: 'Autumn seasonal momentum' },
      { period: 'Nov', demandIndex: 102, searchInterest: 92, revenueMultiplier: 1.08, notes: 'Pre-holiday catalog launch' },
      { period: 'Dec', demandIndex: 116, searchInterest: 99, revenueMultiplier: 1.26, notes: 'Peak holiday revenue velocity' },
    ]
  };

  const trends = marketTrends || defaultData;
  const data = trends.dataPoints || defaultData.dataPoints;

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[200px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="font-bold text-amber-400">{label} Market Index</span>
            <span className="text-[10px] text-slate-400 font-mono">
              {point.revenueMultiplier}x Revenue Multiplier
            </span>
          </div>
          <div className="space-y-1 pt-0.5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                Demand Index:
              </span>
              <span className="font-bold text-white">{point.demandIndex}/100</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                Search Volume:
              </span>
              <span className="font-bold text-white">{point.searchInterest}/100</span>
            </div>
            {point.notes && (
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 leading-snug">
                {point.notes}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-700" />
              <span>Market Trend & Seasonality Velocity</span>
            </h3>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">Recharts Engine</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical demand curves, cyclical troughs, and seasonal revenue multipliers modeled for this industry.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setMetricMode('demand')}
            className={`py-1 px-2.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              metricMode === 'demand'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Demand Curve</span>
          </button>
          <button
            onClick={() => setMetricMode('revenueMultiplier')}
            className={`py-1 px-2.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              metricMode === 'revenueMultiplier'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Revenue Multiplier (x)</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>Peak Demand Window</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-1">
            {trends.peakSeason}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
            <ArrowDownRight className="w-3.5 h-3.5 text-amber-600" />
            <span>Seasonal Trough</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-1">
            {trends.troughSeason}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-500">
            Industry Growth Rate
          </div>
          <div className="text-xs font-bold text-emerald-700 mt-1">
            {trends.annualGrowthRate}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-500">
            Demand Volatility
          </div>
          <div className="text-xs font-bold text-slate-900 mt-1">
            {trends.volatilityLevel} Volatility
          </div>
        </div>
      </div>

      {/* Recharts Visualization Area */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%" minHeight={250}>
          {metricMode === 'demand' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="searchGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={100} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: '100 Baseline', position: 'insideTopRight', fill: '#94a3b8', fontSize: 10 }} />
              <Area
                type="monotone"
                dataKey="demandIndex"
                name="Demand Index"
                stroke="#0f172a"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#demandGrad)"
              />
              <Area
                type="monotone"
                dataKey="searchInterest"
                name="Search Volume"
                stroke="#6366f1"
                strokeWidth={1.75}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#searchGrad)"
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${Number(v).toFixed(1)}x`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={1.0} stroke="#0f172a" strokeDasharray="3 3" label={{ value: '1.0x Normal Average', position: 'insideTopRight', fill: '#64748b', fontSize: 10 }} />
              <Bar dataKey="revenueMultiplier" name="Multiplier" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.revenueMultiplier >= 1.0 ? '#0f172a' : '#94a3b8'} 
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Narrative & Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
        <div>
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Seasonal Demand Dynamics</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {trends.trendSummary}
          </p>

          <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950">
            <span className="font-bold text-amber-900 block mb-0.5">Working Capital Guidance:</span>
            <span>{trends.seasonalCashflowAdvice}</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
            Key Cyclical Drivers:
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {trends.keyDriverInsights?.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                <span className="text-slate-400 font-bold">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

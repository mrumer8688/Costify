import React, { useState } from 'react';
import { 
  RequirementItem, 
  PriorityLevel, 
  CurrencyCode, 
  HiddenCostItem 
} from '../types';
import { formatCurrency, convertCurrency } from '../utils/currencies';
import { 
  Check, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  HelpCircle, 
  AlertCircle, 
  Info,
  DollarSign
} from 'lucide-react';

interface RequirementsTableProps {
  requirements: RequirementItem[];
  hiddenCosts?: HiddenCostItem[];
  monthlyRecurring?: { name: string; cost: number; category: string }[];
  planCurrency: CurrencyCode;
  displayCurrency: CurrencyCode;
  onUpdateRequirement: (reqId: string, updates: Partial<RequirementItem>) => void;
  onAddRequirement: (newReq: RequirementItem) => void;
  onDeleteRequirement: (reqId: string) => void;
}

export const RequirementsTable: React.FC<RequirementsTableProps> = ({
  requirements,
  hiddenCosts = [],
  monthlyRecurring = [],
  planCurrency,
  displayCurrency,
  onUpdateRequirement,
  onAddRequirement,
  onDeleteRequirement,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<PriorityLevel>('must_have');
  const [newWhy, setNewWhy] = useState('');
  const [newQty, setNewQty] = useState(1);
  const [newUnitCost, setNewUnitCost] = useState(100);
  const [newAlternatives, setNewAlternatives] = useState('');

  const val = (num: number = 0) => {
    return convertCurrency(num, planCurrency, displayCurrency).convertedAmount;
  };

  const filtered = requirements.filter((r) => {
    if (filterCategory === 'all') return true;
    return r.category === filterCategory;
  });

  const totalSetupCost = requirements.reduce((acc, item) => {
    if (item.category === 'not_required') return acc;
    return acc + item.quantity * item.unitCost;
  }, 0);

  const mustHaveCost = requirements
    .filter((r) => r.category === 'must_have')
    .reduce((acc, item) => acc + item.quantity * item.unitCost, 0);

  const shouldHaveCost = requirements
    .filter((r) => r.category === 'should_have')
    .reduce((acc, item) => acc + item.quantity * item.unitCost, 0);

  const optionalCost = requirements
    .filter((r) => r.category === 'optional')
    .reduce((acc, item) => acc + item.quantity * item.unitCost, 0);

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: RequirementItem = {
      id: `req-custom-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      whyNeeded: newWhy.trim() || 'Custom user requirement',
      quantity: Math.max(1, Number(newQty) || 1),
      unitCost: Math.max(0, Number(newUnitCost) || 0),
      totalCost: (Math.max(1, Number(newQty) || 1)) * (Math.max(0, Number(newUnitCost) || 0)),
      dataStatus: 'user_provided',
      alternatives: newAlternatives.trim() || undefined,
    };

    onAddRequirement(newItem);
    setNewName('');
    setNewWhy('');
    setNewQty(1);
    setNewUnitCost(100);
    setNewAlternatives('');
    setShowAddModal(false);
  };

  const getPriorityBadge = (cat: PriorityLevel) => {
    switch (cat) {
      case 'must_have':
        return <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">MUST HAVE</span>;
      case 'should_have':
        return <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">SHOULD HAVE</span>;
      case 'optional':
        return <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">OPTIONAL</span>;
      case 'future_upgrade':
        return <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">FUTURE UPGRADE</span>;
      case 'not_required':
        return <span className="text-[11px] font-bold text-slate-400 bg-slate-100 line-through px-2 py-0.5 rounded">NOT REQUIRED</span>;
    }
  };

  const getDataStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="text-[10px] text-emerald-700 font-semibold" title="Verified against live data or manufacturer catalogue">Verified</span>;
      case 'user_provided':
        return <span className="text-[10px] text-blue-700 font-semibold" title="Provided by user">User Input</span>;
      case 'assumed':
        return <span className="text-[10px] text-purple-700 font-semibold" title="Assumed standard baseline">Assumed</span>;
      case 'estimated':
      default:
        return <span className="text-[10px] text-amber-700 font-semibold" title="Estimated market average">Estimated</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tally Summaries */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Active Setup</div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {formatCurrency(val(totalSetupCost), displayCurrency)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{requirements.length} itemized assets</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">Must Have Only</div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {formatCurrency(val(mustHaveCost), displayCurrency)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Core non-negotiable minimum</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">Should Have</div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {formatCurrency(val(shouldHaveCost), displayCurrency)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">High-impact operational efficiency</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Optional & Upgrades</div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {formatCurrency(val(optionalCost), displayCurrency)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Can be deferred post-launch</div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Filter Header */}
        <div className="p-3 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { key: 'all', label: `All (${requirements.length})` },
              { key: 'must_have', label: 'Must Have' },
              { key: 'should_have', label: 'Should Have' },
              { key: 'optional', label: 'Optional' },
              { key: 'future_upgrade', label: 'Future Upgrades' },
              { key: 'not_required', label: 'Not Required' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterCategory(tab.key)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap min-h-[36px] flex items-center ${
                  filterCategory === tab.key
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0 min-h-[40px] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Mobile View: Responsive Cards (< 640px) */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {filtered.map((item) => {
            const itemTotal = item.quantity * item.unitCost;
            return (
              <div key={`mob-${item.id}`} className="p-4 space-y-3 bg-white">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={item.purchased || false}
                      onChange={(e) => onUpdateRequirement(item.id, { purchased: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer shrink-0"
                      title="Mark as secured"
                    />
                    <div className="min-w-0">
                      <div className={`font-semibold text-sm leading-tight ${item.purchased ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {item.whyNeeded}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteRequirement(item.id)}
                    className="text-slate-400 hover:text-rose-600 p-2 -mr-1 rounded-lg transition-colors shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    title="Delete item"
                    aria-label="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(item.category)}
                    {getDataStatusBadge(item.dataStatus)}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Total</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {formatCurrency(val(itemTotal), displayCurrency)}
                    </span>
                  </div>
                </div>

                {/* Edit Controls Row */}
                <div className="grid grid-cols-2 gap-2.5 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">Quantity</label>
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQ = Math.max(0, parseInt(e.target.value, 10) || 0);
                        onUpdateRequirement(item.id, {
                          quantity: newQ,
                          totalCost: newQ * item.unitCost,
                        });
                      }}
                      className="w-full text-center py-1.5 px-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-slate-900 min-h-[36px]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">Unit Cost ({planCurrency})</label>
                    <input
                      type="number"
                      min="0"
                      value={item.unitCost}
                      onChange={(e) => {
                        const newCost = Math.max(0, parseFloat(e.target.value) || 0);
                        onUpdateRequirement(item.id, {
                          unitCost: newCost,
                          totalCost: item.quantity * newCost,
                        });
                      }}
                      className="w-full text-right py-1.5 px-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-slate-900 min-h-[36px]"
                    />
                  </div>
                </div>

                {item.alternatives && (
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-600">Alternative: </span>
                    {item.alternatives}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No requirements found in this category.
            </div>
          )}
        </div>

        {/* Desktop View: Multi-column Table (>= 640px) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                <th className="py-2.5 px-3 w-10 text-center">Status</th>
                <th className="py-2.5 px-3 min-w-[200px]">Item / Requirement</th>
                <th className="py-2.5 px-3 w-32">Priority</th>
                <th className="py-2.5 px-3 w-20 text-center">Qty</th>
                <th className="py-2.5 px-3 w-28 text-right">Unit Cost</th>
                <th className="py-2.5 px-3 w-32 text-right">Total ({displayCurrency})</th>
                <th className="py-2.5 px-3 min-w-[160px]">Alternatives / Notes</th>
                <th className="py-2.5 px-3 w-10 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item) => {
                const itemTotal = item.quantity * item.unitCost;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.purchased || false}
                        onChange={(e) => onUpdateRequirement(item.id, { purchased: e.target.checked })}
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                        title="Mark as purchased/secured"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className={`font-semibold ${item.purchased ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {item.whyNeeded}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400">Data source:</span>
                        {getDataStatusBadge(item.dataStatus)}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {getPriorityBadge(item.category)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQ = Math.max(0, parseInt(e.target.value, 10) || 0);
                          onUpdateRequirement(item.id, {
                            quantity: newQ,
                            totalCost: newQ * item.unitCost,
                          });
                        }}
                        className="w-14 text-center py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-slate-900"
                      />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-slate-400">{planCurrency}</span>
                        <input
                          type="number"
                          min="0"
                          value={item.unitCost}
                          onChange={(e) => {
                            const newCost = Math.max(0, parseFloat(e.target.value) || 0);
                            onUpdateRequirement(item.id, {
                              unitCost: newCost,
                              totalCost: item.quantity * newCost,
                            });
                          }}
                          className="w-20 text-right py-1 px-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-slate-900"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {formatCurrency(val(itemTotal), displayCurrency)}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {item.alternatives || '—'}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onDeleteRequirement(item.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No requirements found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hidden Costs & Recurring Monthly Operating Overhead */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hidden Costs Engine */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Hidden Cost Engine (Section 15)</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">{hiddenCosts.length} Identified Costs</span>
          </div>

          <p className="text-xs text-slate-500">
            Crucial expenses often omitted in novice planning (permits, utility drops, merchant fees, maintenance buffer).
          </p>

          <div className="space-y-2 mt-2">
            {hiddenCosts.map((hc) => (
              <div key={hc.id} className="p-3 bg-amber-50/40 border border-amber-200/50 rounded-xl flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">{hc.name}</span>
                    <span className="text-[10px] text-amber-800 font-semibold uppercase bg-amber-100/60 px-1.5 py-0.2 rounded">
                      {hc.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{hc.notes}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900">
                    {formatCurrency(val(hc.estimatedAmount), displayCurrency)}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase">{hc.frequency}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Recurring Costs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-700" />
              <span>Monthly Recurring Burn Breakdown</span>
            </h3>
            <span className="text-xs font-bold text-slate-900">
              Total: {formatCurrency(val(monthlyRecurring.reduce((a, b) => a + b.cost, 0)), displayCurrency)}/mo
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Essential baseline operational runway required every month regardless of sales volume.
          </p>

          <div className="space-y-2 mt-2">
            {monthlyRecurring.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">{item.name}</div>
                  <div className="text-[10px] text-slate-400">{item.category}</div>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {formatCurrency(val(item.cost), displayCurrency)}/mo
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Custom Requirement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Add Custom Requirement
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNew} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial Air Filtration Unit"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Priority Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as PriorityLevel)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                >
                  <option value="must_have">MUST HAVE (Non-negotiable)</option>
                  <option value="should_have">SHOULD HAVE (Recommended)</option>
                  <option value="optional">OPTIONAL (Nice to have)</option>
                  <option value="future_upgrade">FUTURE UPGRADE (Later stage)</option>
                  <option value="not_required">NOT REQUIRED (Avoid expense)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Why is this needed?</label>
                <textarea
                  rows={2}
                  placeholder="Operational justification or regulatory compliance"
                  value={newWhy}
                  onChange={(e) => setNewWhy(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newQty}
                    onChange={(e) => setNewQty(parseInt(e.target.value, 10) || 1)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Unit Cost ({planCurrency})</label>
                  <input
                    type="number"
                    min="0"
                    value={newUnitCost}
                    onChange={(e) => setNewUnitCost(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Alternative or Vendor</label>
                <input
                  type="text"
                  placeholder="e.g. Local supplier / certified used unit"
                  value={newAlternatives}
                  onChange={(e) => setNewAlternatives(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-1.5 px-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-xs"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

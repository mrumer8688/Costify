import React, { useState } from 'react';
import { BusinessPlanData, CurrencyCode, PriorityLevel, RequirementItem, ProjectTask } from './types';
import { SPECIALTY_COFFEE_PLAN } from './data/samplePlans';
import { Header } from './components/Header';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { BudgetScenariosCard } from './components/BudgetScenariosCard';
import { RequirementsTable } from './components/RequirementsTable';
import { ProductComparisonView } from './components/ProductComparisonView';
import { FinancialSandbox } from './components/FinancialSandbox';
import { RoadmapPhases } from './components/RoadmapPhases';
import { TasksAndChecklists } from './components/TasksAndChecklists';
import { MvpAndScalability } from './components/MvpAndScalability';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { NewPlanModal } from './components/NewPlanModal';
import { formatCurrency, convertCurrency } from './utils/currencies';
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle, 
  Compass,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [plan, setPlan] = useState<BusinessPlanData>(SPECIALTY_COFFEE_PLAN);
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyCode>('USD');
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'products' | 'financials' | 'roadmap' | 'checklists'>('overview');
  
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Currency handler
  const handleCurrencyChange = (newCurr: CurrencyCode) => {
    setDisplayCurrency(newCurr);
  };

  // Update assumption
  const handleUpdateAssumption = (assumptionId: string, newValue: string) => {
    setPlan((prev) => ({
      ...prev,
      assumptions: prev.assumptions.map((asm) =>
        asm.id === assumptionId
          ? { ...asm, assumedValue: newValue, userOverridden: true }
          : asm
      ),
    }));
  };

  // Select smart question answer
  const handleSelectSmartQuestionOption = (questionId: string, optionKey: string) => {
    setPlan((prev) => ({
      ...prev,
      smartQuestions: prev.smartQuestions.map((q) =>
        q.id === questionId ? { ...q, selectedValue: optionKey } : q
      ),
    }));
  };

  // Requirements handlers
  const handleUpdateRequirement = (reqId: string, updates: Partial<RequirementItem>) => {
    setPlan((prev) => {
      const updatedReqs = prev.requirements.map((r) =>
        r.id === reqId ? { ...r, ...updates } : r
      );
      return { ...prev, requirements: updatedReqs };
    });
  };

  const handleAddRequirement = (newReq: RequirementItem) => {
    setPlan((prev) => ({
      ...prev,
      requirements: [newReq, ...prev.requirements],
    }));
  };

  const handleDeleteRequirement = (reqId: string) => {
    setPlan((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((r) => r.id !== reqId),
    }));
  };

  // Task handlers
  const handleUpdateTask = (taskId: string, updates: Partial<ProjectTask>) => {
    setPlan((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    }));
  };

  const handleAddTask = (newTask: ProjectTask) => {
    setPlan((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
  };

  const handleDeleteTask = (taskId: string) => {
    setPlan((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== taskId),
    }));
  };

  // Purchase item checklist handler
  const handleUpdatePurchaseItem = (itemId: string, completed: boolean) => {
    setPlan((prev) => ({
      ...prev,
      purchaseChecklist: prev.purchaseChecklist.map((item) =>
        item.id === itemId ? { ...item, completed } : item
      ),
    }));
  };

  // Implementation checklist handler
  const handleUpdateImplementationItem = (itemId: string, completed: boolean) => {
    setPlan((prev) => ({
      ...prev,
      implementationChecklist: prev.implementationChecklist.map((item) =>
        item.id === itemId ? { ...item, completed } : item
      ),
    }));
  };

  // Generate new plan via Express server
  const handleGenerateNewPlan = async (params: {
    goal: string;
    budget?: number;
    currency: CurrencyCode;
    location: string;
    scale: string;
    experienceLevel: string;
    timeline: string;
  }) => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate strategic plan.');
      }

      const data = await res.json();
      if (data.plan) {
        setPlan(data.plan);
        setDisplayCurrency(data.plan.currency || params.currency);
        setIsNewPlanModalOpen(false);
        setActiveTab('overview');
      }
    } catch (err: any) {
      console.error('Plan generation failed:', err);
      setGenerationError(err.message || 'Error communicating with AI engine.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export Plan to Markdown adhering to Section 39 RESPONSE FORMAT
  const handleExportMarkdown = () => {
    const p = plan;
    const markdownContent = `# ${p.title}
*Strategic Business Plan & Decision Support Report*
*Location: ${p.targetLocation} · Currency: ${displayCurrency} · Generated by Costify*

## 1. What I Understand
- **User Goal:** ${p.understanding?.userGoal || p.rawGoalSummary}
- **Desired Outcome:** ${p.understanding?.desiredOutcome}
- **Target Scale:** ${p.understanding?.targetScale}
- **Timeline:** ${p.understanding?.timeline}

## 2. Assumptions
${p.assumptions.map((a) => `- **${a.label} (${a.category}):** ${a.assumedValue} — *${a.rationale}*`).join('\n')}

## 3. Feasibility Assessment
- **Rating:** ${p.feasibility?.rating}
- **Summary:** ${p.feasibility?.summary}

${p.marketTrends ? `## 3.1 Market Trends & Seasonal Dynamics
- **Summary:** ${p.marketTrends.trendSummary}
- **Peak Season:** ${p.marketTrends.peakSeason}
- **Seasonal Trough:** ${p.marketTrends.troughSeason}
- **Annual Growth:** ${p.marketTrends.annualGrowthRate}
- **Working Capital Guidance:** ${p.marketTrends.seasonalCashflowAdvice}
` : ''}
## 4. Budget Scenarios
| Scenario | Setup Capital | Initial Reserve (3-mo) | Initial Cash Required | Monthly Burn |
| :--- | :--- | :--- | :--- | :--- |
| **Starter** | ${formatCurrency(p.budgetScenarios?.starter?.setupCost || 0, displayCurrency)} | ${formatCurrency(p.budgetScenarios?.starter?.initialOperatingCost || 0, displayCurrency)} | **${formatCurrency(p.budgetScenarios?.starter?.initialCashRequirement || 0, displayCurrency)}** | ${formatCurrency(p.budgetScenarios?.starter?.monthlyRecurringCost || 0, displayCurrency)}/mo |
| **Recommended** | ${formatCurrency(p.budgetScenarios?.recommended?.setupCost || 0, displayCurrency)} | ${formatCurrency(p.budgetScenarios?.recommended?.initialOperatingCost || 0, displayCurrency)} | **${formatCurrency(p.budgetScenarios?.recommended?.initialCashRequirement || 0, displayCurrency)}** | ${formatCurrency(p.budgetScenarios?.recommended?.monthlyRecurringCost || 0, displayCurrency)}/mo |
| **Premium** | ${formatCurrency(p.budgetScenarios?.premium?.setupCost || 0, displayCurrency)} | ${formatCurrency(p.budgetScenarios?.premium?.initialOperatingCost || 0, displayCurrency)} | **${formatCurrency(p.budgetScenarios?.premium?.initialCashRequirement || 0, displayCurrency)}** | ${formatCurrency(p.budgetScenarios?.premium?.monthlyRecurringCost || 0, displayCurrency)}/mo |

## 5. Cost Breakdown & Requirements
| Item | Category | Qty | Unit Cost | Total Cost | Data Source |
| :--- | :--- | :--- | :--- | :--- | :--- |
${p.requirements.map((r) => `| ${r.name} | ${r.category} | ${r.quantity} | ${formatCurrency(r.unitCost, displayCurrency)} | ${formatCurrency(r.quantity * r.unitCost, displayCurrency)} | ${r.dataStatus} |`).join('\n')}

## 6. Financial ROI & Unit Economics
- **Unit Selling Price:** ${formatCurrency(p.financialModel?.sellingPricePerUnit || 0, displayCurrency)}
- **Variable Cost (COGS):** ${formatCurrency(p.financialModel?.variableCostPerUnit || 0, displayCurrency)}
- **Gross Profit Margin:** ${(p.financialModel?.grossMarginPercent || 0).toFixed(1)}%
- **Monthly Fixed Costs:** ${formatCurrency(p.financialModel?.monthlyFixedCosts || 0, displayCurrency)}
- **Monthly Break-Even Volume:** ${(p.financialModel?.breakEvenUnitsMonthly || 0).toLocaleString()} units
- **Estimated Payback Horizon:** ${p.financialModel?.estimatedPaybackPeriodMonths} Months

## 7. Step-by-Step Execution Plan
${p.phases.map((ph) => `### ${ph.title} (${ph.timeframe})\n${ph.keyDeliverables.map((d) => `- ${d}`).join('\n')}`).join('\n\n')}

## 8. Recommended Next Steps
${p.recommendedNextSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${plan.title.replace(/\s+/g, '_')}_Business_Plan.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-200">
      {/* Top Header */}
      <Header
        plan={plan}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={displayCurrency}
        onCurrencyChange={handleCurrencyChange}
        onOpenNewPlanModal={() => setIsNewPlanModalOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onExportMarkdown={handleExportMarkdown}
        onPrint={handlePrint}
        isGenerating={isGenerating}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error notification if plan generation fails */}
        {generationError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-xs text-rose-800">
            <span>{generationError}</span>
            <button
              onClick={() => setGenerationError(null)}
              className="text-rose-500 hover:text-rose-800 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab 1: Overview & Feasibility */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ExecutiveSummary
              plan={plan}
              currency={displayCurrency}
              onUpdateAssumption={handleUpdateAssumption}
              onSelectSmartQuestionOption={handleSelectSmartQuestionOption}
              onSwitchTab={setActiveTab}
            />
            <MvpAndScalability
              mvp={plan.mvp}
              scalability={plan.scalability}
              risksAndMitigations={plan.risksAndMitigations}
            />
          </div>
        )}

        {/* Tab 2: Budget & Requirements */}
        {activeTab === 'budget' && (
          <div className="space-y-8">
            <BudgetScenariosCard
              plan={plan}
              displayCurrency={displayCurrency}
            />
            <RequirementsTable
              requirements={plan.requirements}
              hiddenCosts={plan.hiddenCosts}
              monthlyRecurring={plan.monthlyRecurringBreakdown}
              planCurrency={plan.currency}
              displayCurrency={displayCurrency}
              onUpdateRequirement={handleUpdateRequirement}
              onAddRequirement={handleAddRequirement}
              onDeleteRequirement={handleDeleteRequirement}
            />
          </div>
        )}

        {/* Tab 3: Products & Tools */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <ProductComparisonView
              comparisonGroups={plan.productComparisons}
              planCurrency={plan.currency}
              displayCurrency={displayCurrency}
            />
          </div>
        )}

        {/* Tab 4: Financial Sandbox */}
        {activeTab === 'financials' && (
          <div className="space-y-6">
            <FinancialSandbox
              initialModel={plan.financialModel}
              setupCapital={plan.budgetScenarios?.recommended?.initialCashRequirement || 50000}
              planCurrency={plan.currency}
              displayCurrency={displayCurrency}
            />
          </div>
        )}

        {/* Tab 5: 9-Phase Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <RoadmapPhases phases={plan.phases} />
          </div>
        )}

        {/* Tab 6: Tasks & Checklists */}
        {activeTab === 'checklists' && (
          <div className="space-y-6">
            <TasksAndChecklists
              tasks={plan.tasks}
              purchaseChecklist={plan.purchaseChecklist}
              implementationChecklist={plan.implementationChecklist}
              planCurrency={plan.currency}
              displayCurrency={displayCurrency}
              onUpdateTask={handleUpdateTask}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onUpdatePurchaseItem={handleUpdatePurchaseItem}
              onUpdateImplementationItem={handleUpdateImplementationItem}
            />
          </div>
        )}
      </main>

      {/* Floating Copilot Launcher Pill (bottom-right) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 no-print">
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-2 py-2.5 px-3 sm:py-3 sm:px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl border border-slate-700 transition-all group min-h-[44px] cursor-pointer"
          title="Consult AI Copilot"
        >
          <div className="p-1 rounded-full bg-amber-400 text-slate-900 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold pr-1 hidden sm:inline">Consult AI Copilot</span>
          <span className="text-xs font-bold pr-1 sm:hidden">Copilot</span>
        </button>
      </div>

      {/* Slide-out AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        plan={plan}
        displayCurrency={displayCurrency}
      />

      {/* Modal: New Plan */}
      <NewPlanModal
        isOpen={isNewPlanModalOpen}
        onClose={() => setIsNewPlanModalOpen(false)}
        onGeneratePlan={handleGenerateNewPlan}
        isGenerating={isGenerating}
      />
    </div>
  );
}

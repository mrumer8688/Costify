export type PriorityLevel = 'must_have' | 'should_have' | 'optional' | 'future_upgrade' | 'not_required';

export type FeasibilityRating = 'feasible' | 'feasible_with_adjustments' | 'difficult' | 'information_required';

export type CurrencyCode = 'USD' | 'PKR' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'AED' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToUSD: number; // 1 USD = rate units of currency
}

export interface UserProfile {
  experienceLevel: 'beginner' | 'intermediate' | 'experienced' | 'serial_entrepreneur';
  preferredCurrency: CurrencyCode;
  preferredLanguage: string;
  defaultLocation: string;
  industryInterest?: string;
  technicalSkill: 'non-technical' | 'semi-technical' | 'technical';
}

export interface ProjectAssumption {
  id: string;
  category: 'location' | 'scale' | 'quantity' | 'quality' | 'timeline' | 'other';
  label: string;
  assumedValue: string;
  rationale: string;
  userOverridden?: boolean;
}

export interface RequirementItem {
  id: string;
  name: string;
  category: PriorityLevel;
  whyNeeded: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  dataStatus: 'verified' | 'estimated' | 'user_provided' | 'assumed';
  alternatives?: string;
  purchased?: boolean;
}

export interface ProductOption {
  tier: 'Budget' | 'Balanced' | 'Premium';
  name: string;
  modelOrVendor: string;
  price: number;
  currency: string;
  keyFeatures: string[];
  capacityOrSpec: string;
  warranty: string;
  suitableFor: string;
  tradeOffs: string;
  dataStatus: 'verified' | 'estimated' | 'user_provided';
}

export interface ProductComparisonGroup {
  categoryName: string;
  options: ProductOption[];
  verdict: string;
}

export interface BudgetScenario {
  name: 'Starter' | 'Recommended' | 'Premium';
  label: string;
  setupCost: number;
  initialOperatingCost: number; // e.g., 3-month runway
  initialCashRequirement: number;
  monthlyRecurringCost: number;
  annualRecurringCost: number;
  summary: string;
  includedFeatures: string[];
}

export interface HiddenCostItem {
  id: string;
  name: string;
  category: string; // e.g. "Taxes & Duties", "Permits & Licenses", "Shipping", "Platform Fees", "Buffer"
  estimatedAmount: number;
  frequency: 'one_time' | 'monthly' | 'annual';
  notes: string;
}

export interface BudgetOptimization {
  keep: string[];
  reduce: string[];
  replace: string[];
  delay: string[];
  scaleDown: string[];
  upgradeLater: string[];
}

export interface MvpStrategy {
  launchNow: string[];
  addLater: string[];
  testFirst: string[];
}

export interface ScalabilityStage {
  stage: 'Small Scale' | 'Medium Scale' | 'Large Scale';
  description: string;
  capacity: string;
  requiredTeam: string;
  keyInfrastructure: string[];
  costMultiplierOrEstimate: string;
}

export interface FinancialRoiModel {
  sellingPricePerUnit: number;
  variableCostPerUnit: number;
  grossProfitPerUnit: number;
  grossMarginPercent: number;
  monthlyFixedCosts: number;
  breakEvenUnitsMonthly: number;
  breakEvenRevenueMonthly: number;
  estimatedPaybackPeriodMonths: number;
  assumptionsNotes: string;
}

export interface BusinessModelSummary {
  targetCustomer: string;
  valueProposition: string;
  primarySalesChannels: string[];
  marketingStrategy: string[];
  revenueStreams: string[];
  competitiveAdvantage: string;
}

export interface ExecutionPhase {
  phaseNumber: number;
  title: string; // Phase 1 — Research, Phase 2 — Planning, etc.
  timeframe: string;
  keyDeliverables: string[];
}

export interface ProjectTask {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dependency: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  estimatedCost: number;
  deadline: string;
  owner: string;
}

export interface PurchaseChecklistItem {
  id: string;
  item: string;
  quantity: number;
  specification: string;
  estimatedPrice: number;
  priority: 'Critical' | 'Important' | 'Optional';
  recommendedSource: string;
  completed: boolean;
}

export interface ImplementationChecklistItem {
  id: string;
  label: string;
  category: 'Legal' | 'Procurement' | 'Setup' | 'Testing' | 'Pricing' | 'Marketing' | 'Operations';
  completed: boolean;
}

export interface SmartQuestionOption {
  key: string;
  label: string;
  description?: string;
}

export interface SmartQuestion {
  id: string;
  question: string;
  impactNote: string;
  options: SmartQuestionOption[];
  selectedValue?: string;
}

export interface MarketTrendPoint {
  period: string; // e.g. "Jan", "Feb", "Mar"
  demandIndex: number; // 0 to 100 base
  searchInterest: number; // 0 to 100
  revenueMultiplier: number; // e.g. 0.82 to 1.30 (1.0 = average)
  footfallOrTrafficIndex?: number;
  notes?: string;
}

export interface MarketTrendAnalysis {
  trendSummary: string;
  peakSeason: string;
  troughSeason: string;
  annualGrowthRate: string;
  volatilityLevel: 'Low' | 'Moderate' | 'High';
  dataPoints: MarketTrendPoint[];
  keyDriverInsights: string[];
  seasonalCashflowAdvice: string;
}

export interface BusinessPlanData {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  industryCategory: string;
  targetLocation: string;
  currency: CurrencyCode;
  rawGoalSummary: string;
  marketTrends?: MarketTrendAnalysis;
  
  // Sections adhering to 53 master rules
  understanding: {
    userGoal: string;
    desiredOutcome: string;
    targetScale: string;
    experienceLevel: string;
    timeline: string;
    qualityExpectation: string;
    constraints: string[];
  };

  feasibility: {
    rating: FeasibilityRating;
    summary: string;
    adjustmentsNeeded?: string[];
  };

  assumptions: ProjectAssumption[];
  smartQuestions: SmartQuestion[];

  requirements: RequirementItem[];
  budgetScenarios: {
    starter: BudgetScenario;
    recommended: BudgetScenario;
    premium: BudgetScenario;
  };
  hiddenCosts: HiddenCostItem[];
  monthlyRecurringBreakdown: {
    name: string;
    cost: number;
    category: string;
  }[];

  productComparisons: ProductComparisonGroup[];
  optimization: BudgetOptimization;
  mvp: MvpStrategy;
  scalability: ScalabilityStage[];
  financialModel: FinancialRoiModel;
  businessModel: BusinessModelSummary;
  phases: ExecutionPhase[];
  tasks: ProjectTask[];
  purchaseChecklist: PurchaseChecklistItem[];
  implementationChecklist: ImplementationChecklistItem[];
  risksAndMitigations: {
    risk: string;
    severity: 'High' | 'Medium' | 'Low';
    mitigation: string;
  }[];
  recommendedNextSteps: string[];
  executiveSummaryMarkdown: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  actionTaken?: string;
  suggestedPrompts?: string[];
}

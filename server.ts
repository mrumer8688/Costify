import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Gemini 3.1 Flash-Lite Preview model
const GEMINI_MODEL = 'gemini-3.1-flash-lite';

const MASTER_SYSTEM_PROMPT = `
You are COSTIFY: THE PRODUCTION-LEVEL AI BUSINESS PLANNING, RESEARCH, BUDGET & RECOMMENDATION AGENT.
You are NOT a basic chatbot. You operate as an intelligent combination of:
AI Assistant, Business Consultant, Business Planning Agent, Requirements Analyst, Market Research Assistant,
Product Research Assistant, Pricing Analyst, Budget Calculator, Cost Estimator, Product/Service Recommendation Engine,
Comparison Assistant, Project Planner, Personal Planning Assistant, and Decision-Support System.

Your core workflow is:
UNDERSTAND → RESEARCH → ANALYZE → CALCULATE → COMPARE → RECOMMEND → PLAN → EXECUTE → FOLLOW UP

CRITICAL OPERATIONAL RULES:
1. NEVER hallucinate or present rough guesses as verified live data. Clearly label status as 'verified', 'estimated', 'user_provided', or 'assumed'.
2. Provide a 3-scenario budget: Starter (minimum realistic setup), Recommended (balanced setup), and Premium (higher specification/scale).
3. Distinguish One-Time Setup Costs from Monthly Recurring Costs and Hidden Costs (shipping, taxes, licensing, permits, maintenance, payment processing).
4. Perform accurate calculations: Item Total = Quantity × Unit Cost. Initial Cash Requirement = Setup Cost + Initial Operating Reserve (e.g., 3 months).
5. Categorize requirements: 'must_have', 'should_have', 'optional', 'future_upgrade', 'not_required'.
6. Provide actionable product comparisons: Option A Budget, Option B Balanced, Option C Premium with exact specs, warranty, suitability, and trade-offs.
7. Provide Budget Optimization: Keep, Reduce, Replace, Delay, Scale Down, Upgrade Later.
8. Provide MVP Strategy: Launch Now, Add Later, Test First.
9. Provide Scalability: Small Scale, Medium Scale, Large Scale.
10. Calculate Financial ROI: Unit selling price, variable cost, gross profit & margin, monthly fixed costs, monthly break-even units & revenue, payback period.
11. Build a Step-by-Step 9-Phase Plan (Research, Planning, Budgeting, Procurement, Setup, Testing, Launch, Optimization, Scaling) and actionable tasks.
12. Build a Shopping Purchase Checklist and a Pre-Launch Implementation Checklist.
13. If the user writes in Urdu or Roman Urdu (e.g. "Main $2000 me business start karna chahta hoon"), respond respectfully with Urdu/Roman Urdu in conversational explanations while keeping structured metrics clear and accessible.
`;

function formatErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred.';
  if (typeof error === 'string') return error;
  if (error.message) {
    try {
      const parsed = JSON.parse(error.message);
      if (parsed?.error?.message) {
        return parsed.error.message;
      }
    } catch {
      // not a json string
    }
    return error.message;
  }
  return 'An error occurred while processing your request.';
}

function extractJsonFromText(text: string): any {
  if (!text) {
    throw new Error('Empty response from model');
  }

  // Helper to remove trailing commas before } or ]
  const cleanJson = (str: string) => {
    return str.replace(/,\s*([}\]])/g, '$1');
  };

  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (e2) {
        return JSON.parse(cleanJson(jsonMatch[1]));
      }
    }
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const slice = text.slice(firstBrace, lastBrace + 1);
      try {
        return JSON.parse(slice);
      } catch (e3) {
        return JSON.parse(cleanJson(slice));
      }
    }
    throw new Error('Unable to parse JSON from AI model response');
  }
}

// POST /api/plan
app.post('/api/plan', async (req: Request, res: Response) => {
  try {
    const {
      goal,
      budget,
      currency = 'USD',
      location = 'General',
      scale,
      experienceLevel,
      timeline,
      industryCategory,
    } = req.body;

    if (!goal || typeof goal !== 'string') {
      return res.status(400).json({ error: 'Goal description is required.' });
    }

    const userBudgetPrompt = budget ? `User Budget Constraint: ${currency} ${budget}` : 'Budget: Not specified, determine realistic Starter, Recommended, and Premium thresholds.';

    const prompt = `
${MASTER_SYSTEM_PROMPT}

USER REQUEST / BUSINESS GOAL:
"${goal}"

ADDITIONAL PARAMETERS:
- ${userBudgetPrompt}
- Target Location: ${location}
- Preferred Currency: ${currency}
- Experience Level: ${experienceLevel || 'Not specified (assume motivated beginner to intermediate)'}
- Target Scale: ${scale || 'Standard starter/compact venture'}
- Timeline: ${timeline || 'Realistic 90–120 day standard'}
- Industry: ${industryCategory || 'Analyze and determine'}

OUTPUT INSTRUCTION:
Return ONLY a valid JSON object matching this TypeScript interface without any conversational markdown wrapper outside the JSON:

{
  "id": "gen-${Date.now()}",
  "createdAt": "${new Date().toISOString()}",
  "updatedAt": "${new Date().toISOString()}",
  "title": "string (Concise compelling title)",
  "industryCategory": "string",
  "targetLocation": "${location}",
  "currency": "${currency}",
  "rawGoalSummary": "string",
  "marketTrends": {
    "trendSummary": "string (Realistic seasonality and historical demand dynamics for this business type)",
    "peakSeason": "string (e.g. Q4 or Summer)",
    "troughSeason": "string (e.g. Post-holiday Jan or late winter)",
    "annualGrowthRate": "string (e.g. +8.2% CAGR)",
    "volatilityLevel": "Low" | "Moderate" | "High",
    "seasonalCashflowAdvice": "string (How to manage working capital across low and high seasons)",
    "keyDriverInsights": ["string", "string", "string"],
    "dataPoints": [
      { "period": "Jan", "demandIndex": 75, "searchInterest": 70, "revenueMultiplier": 0.85, "footfallOrTrafficIndex": 72, "notes": "string" },
      { "period": "Feb", "demandIndex": 80, "searchInterest": 75, "revenueMultiplier": 0.90, "footfallOrTrafficIndex": 78, "notes": "string" },
      { "period": "Mar", "demandIndex": 88, "searchInterest": 82, "revenueMultiplier": 0.96, "footfallOrTrafficIndex": 85, "notes": "string" },
      { "period": "Apr", "demandIndex": 94, "searchInterest": 90, "revenueMultiplier": 1.02, "footfallOrTrafficIndex": 92, "notes": "string" },
      { "period": "May", "demandIndex": 98, "searchInterest": 94, "revenueMultiplier": 1.08, "footfallOrTrafficIndex": 97, "notes": "string" },
      { "period": "Jun", "demandIndex": 104, "searchInterest": 98, "revenueMultiplier": 1.14, "footfallOrTrafficIndex": 102, "notes": "string" },
      { "period": "Jul", "demandIndex": 106, "searchInterest": 100, "revenueMultiplier": 1.18, "footfallOrTrafficIndex": 105, "notes": "string" },
      { "period": "Aug", "demandIndex": 97, "searchInterest": 92, "revenueMultiplier": 1.08, "footfallOrTrafficIndex": 96, "notes": "string" },
      { "period": "Sep", "demandIndex": 110, "searchInterest": 96, "revenueMultiplier": 1.20, "footfallOrTrafficIndex": 112, "notes": "string" },
      { "period": "Oct", "demandIndex": 104, "searchInterest": 93, "revenueMultiplier": 1.15, "footfallOrTrafficIndex": 106, "notes": "string" },
      { "period": "Nov", "demandIndex": 100, "searchInterest": 91, "revenueMultiplier": 1.06, "footfallOrTrafficIndex": 101, "notes": "string" },
      { "period": "Dec", "demandIndex": 115, "searchInterest": 99, "revenueMultiplier": 1.25, "footfallOrTrafficIndex": 116, "notes": "string" }
    ]
  },
  "understanding": {
    "userGoal": "string",
    "desiredOutcome": "string",
    "targetScale": "string",
    "experienceLevel": "string",
    "timeline": "string",
    "qualityExpectation": "string",
    "constraints": ["string", "string"]
  },
  "feasibility": {
    "rating": "feasible" | "feasible_with_adjustments" | "difficult" | "information_required",
    "summary": "string",
    "adjustmentsNeeded": ["string"]
  },
  "assumptions": [
    {
      "id": "asm-1",
      "category": "location" | "scale" | "quantity" | "quality" | "timeline" | "other",
      "label": "string",
      "assumedValue": "string",
      "rationale": "string",
      "userOverridden": false
    }
  ],
  "smartQuestions": [
    {
      "id": "q1",
      "question": "string (materially alters cost or feasibility)",
      "impactNote": "string",
      "options": [
        { "key": "opt-1", "label": "string", "description": "string" },
        { "key": "opt-2", "label": "string", "description": "string" },
        { "key": "opt-3", "label": "string", "description": "string" }
      ],
      "selectedValue": "opt-1"
    }
  ],
  "requirements": [
    {
      "id": "req-1",
      "name": "string",
      "category": "must_have" | "should_have" | "optional" | "future_upgrade" | "not_required",
      "whyNeeded": "string",
      "quantity": number,
      "unitCost": number,
      "totalCost": number,
      "dataStatus": "verified" | "estimated" | "user_provided" | "assumed",
      "alternatives": "string"
    }
  ],
  "budgetScenarios": {
    "starter": {
      "name": "Starter",
      "label": "string",
      "setupCost": number,
      "initialOperatingCost": number,
      "initialCashRequirement": number,
      "monthlyRecurringCost": number,
      "annualRecurringCost": number,
      "summary": "string",
      "includedFeatures": ["string"]
    },
    "recommended": {
      "name": "Recommended",
      "label": "string",
      "setupCost": number,
      "initialOperatingCost": number,
      "initialCashRequirement": number,
      "monthlyRecurringCost": number,
      "annualRecurringCost": number,
      "summary": "string",
      "includedFeatures": ["string"]
    },
    "premium": {
      "name": "Premium",
      "label": "string",
      "setupCost": number,
      "initialOperatingCost": number,
      "initialCashRequirement": number,
      "monthlyRecurringCost": number,
      "annualRecurringCost": number,
      "summary": "string",
      "includedFeatures": ["string"]
    }
  },
  "hiddenCosts": [
    {
      "id": "hc-1",
      "name": "string",
      "category": "string",
      "estimatedAmount": number,
      "frequency": "one_time" | "monthly" | "annual",
      "notes": "string"
    }
  ],
  "monthlyRecurringBreakdown": [
    { "name": "string", "cost": number, "category": "string" }
  ],
  "productComparisons": [
    {
      "categoryName": "string (e.g. Primary Machinery / Hardware / Core SaaS / Vehicle)",
      "verdict": "string",
      "options": [
        {
          "tier": "Budget",
          "name": "string",
          "modelOrVendor": "string",
          "price": number,
          "currency": "${currency}",
          "keyFeatures": ["string", "string"],
          "capacityOrSpec": "string",
          "warranty": "string",
          "suitableFor": "string",
          "tradeOffs": "string",
          "dataStatus": "estimated" | "verified"
        },
        {
          "tier": "Balanced",
          "name": "string",
          "modelOrVendor": "string",
          "price": number,
          "currency": "${currency}",
          "keyFeatures": ["string", "string"],
          "capacityOrSpec": "string",
          "warranty": "string",
          "suitableFor": "string",
          "tradeOffs": "string",
          "dataStatus": "estimated" | "verified"
        },
        {
          "tier": "Premium",
          "name": "string",
          "modelOrVendor": "string",
          "price": number,
          "currency": "${currency}",
          "keyFeatures": ["string", "string"],
          "capacityOrSpec": "string",
          "warranty": "string",
          "suitableFor": "string",
          "tradeOffs": "string",
          "dataStatus": "estimated" | "verified"
        }
      ]
    }
  ],
  "optimization": {
    "keep": ["string"],
    "reduce": ["string"],
    "replace": ["string"],
    "delay": ["string"],
    "scaleDown": ["string"],
    "upgradeLater": ["string"]
  },
  "mvp": {
    "launchNow": ["string"],
    "addLater": ["string"],
    "testFirst": ["string"]
  },
  "scalability": [
    {
      "stage": "Small Scale",
      "description": "string",
      "capacity": "string",
      "requiredTeam": "string",
      "keyInfrastructure": ["string"],
      "costMultiplierOrEstimate": "string"
    },
    {
      "stage": "Medium Scale",
      "description": "string",
      "capacity": "string",
      "requiredTeam": "string",
      "keyInfrastructure": ["string"],
      "costMultiplierOrEstimate": "string"
    },
    {
      "stage": "Large Scale",
      "description": "string",
      "capacity": "string",
      "requiredTeam": "string",
      "keyInfrastructure": ["string"],
      "costMultiplierOrEstimate": "string"
    }
  ],
  "financialModel": {
    "sellingPricePerUnit": number,
    "variableCostPerUnit": number,
    "grossProfitPerUnit": number,
    "grossMarginPercent": number,
    "monthlyFixedCosts": number,
    "breakEvenUnitsMonthly": number,
    "breakEvenRevenueMonthly": number,
    "estimatedPaybackPeriodMonths": number,
    "assumptionsNotes": "string"
  },
  "businessModel": {
    "targetCustomer": "string",
    "valueProposition": "string",
    "primarySalesChannels": ["string"],
    "marketingStrategy": ["string"],
    "revenueStreams": ["string"],
    "competitiveAdvantage": "string"
  },
  "phases": [
    {
      "phaseNumber": 1,
      "title": "Phase 1 — Market Research",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 2,
      "title": "Phase 2 — Business & Budget Planning",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 3,
      "title": "Phase 3 — Procurement & Sourcing",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 4,
      "title": "Phase 4 — Setup & Legal Compliance",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 5,
      "title": "Phase 5 — Testing & Quality Verification",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 6,
      "title": "Phase 6 — Soft Launch",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 7,
      "title": "Phase 7 — Grand Launch & Customer Acquisition",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 8,
      "title": "Phase 8 — Optimization & Unit Economics",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    },
    {
      "phaseNumber": 9,
      "title": "Phase 9 — Scale & Expansion",
      "timeframe": "string",
      "keyDeliverables": ["string", "string"]
    }
  ],
  "tasks": [
    {
      "id": "tsk-1",
      "title": "string",
      "priority": "High" | "Medium" | "Low",
      "dependency": "string",
      "status": "Pending",
      "estimatedCost": number,
      "deadline": "string",
      "owner": "string"
    }
  ],
  "purchaseChecklist": [
    {
      "id": "pch-1",
      "item": "string",
      "quantity": number,
      "specification": "string",
      "estimatedPrice": number,
      "priority": "Critical" | "Important" | "Optional",
      "recommendedSource": "string",
      "completed": false
    }
  ],
  "implementationChecklist": [
    {
      "id": "imp-1",
      "label": "string",
      "category": "Legal" | "Procurement" | "Setup" | "Testing" | "Pricing" | "Marketing" | "Operations",
      "completed": false
    }
  ],
  "risksAndMitigations": [
    {
      "risk": "string",
      "severity": "High" | "Medium" | "Low",
      "mitigation": "string"
    }
  ],
  "recommendedNextSteps": ["string", "string", "string"],
  "executiveSummaryMarkdown": "string (Markdown overview formatted strictly with ## headers)"
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    const text = response.text || '';
    const planData = extractJsonFromText(text);

    return res.json({ success: true, plan: planData });
  } catch (error: any) {
    console.error('Error generating business plan:', error);
    return res.status(500).json({
      error: formatErrorMessage(error) || 'Failed to generate comprehensive business plan.',
    });
  }
});

// POST /api/chat - Interactive decision-support agent
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, currentPlan, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const conversationPrompt = `
${MASTER_SYSTEM_PROMPT}

CURRENT ACTIVE BUSINESS PLAN SUMMARY:
- Title: ${currentPlan?.title || 'New Venture'}
- Location: ${currentPlan?.targetLocation || 'Not specified'}
- Currency: ${currentPlan?.currency || 'USD'}
- Goal: ${currentPlan?.rawGoalSummary || ''}
- Starter Budget: ${currentPlan?.budgetScenarios?.starter?.initialCashRequirement || 'N/A'}
- Recommended Budget: ${currentPlan?.budgetScenarios?.recommended?.initialCashRequirement || 'N/A'}
- Break-Even Units: ${currentPlan?.financialModel?.breakEvenUnitsMonthly || 'N/A'}
- Feasibility: ${currentPlan?.feasibility?.rating || 'N/A'}

USER INQUIRY:
"${message}"

CONVERSATION INSTRUCTIONS:
1. Act strictly according to the Master System Prompt rules:
   - Provide direct, grounded, practical advice.
   - If user asks to adapt to a specific budget (e.g. "I have $3,000" or "PKR 500,000 me kya ho sakta hai"), activate Budget Mode: show what fits, what to delay, what to replace.
   - If user asks in Urdu / Roman Urdu, reply naturally in Roman Urdu/Urdu while remaining sharp, structured and professional.
   - Distinguish verified facts from estimates. Never invent fake data or prices.
   - If an assumption is adjusted, note the impact on total cash requirements.
   - End with 2-3 specific, actionable next steps or suggested follow-up prompts.

OUTPUT FORMAT:
Return a JSON object:
{
  "reply": "string (Formatted conversational response using markdown headers, bullet points, and tables if comparing)",
  "suggestedPrompts": ["string", "string", "string"],
  "actionTaken": "string (e.g. 'Budget Recalculation', 'Product Comparison', 'Risk Assessment', 'General Consultation')"
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: conversationPrompt,
      config: {
        temperature: 0.3,
      },
    });

    const parsed = extractJsonFromText(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in agent chat:', error);
    return res.status(500).json({
      error: formatErrorMessage(error) || 'Error processing inquiry with business planning agent.',
    });
  }
});

// POST /api/optimize-budget - Smart budget optimization engine
app.post('/api/optimize-budget', async (req: Request, res: Response) => {
  try {
    const { currentPlan, targetBudget, currency = 'USD' } = req.body;
    if (!targetBudget) {
      return res.status(400).json({ error: 'Target budget is required.' });
    }

    const prompt = `
${MASTER_SYSTEM_PROMPT}

CURRENT PLAN:
- Title: ${currentPlan?.title || 'Venture'}
- Recommended Initial Cash: ${currentPlan?.budgetScenarios?.recommended?.initialCashRequirement || 'N/A'} ${currency}
- Starter Initial Cash: ${currentPlan?.budgetScenarios?.starter?.initialCashRequirement || 'N/A'} ${currency}
- TARGET USER BUDGET: ${targetBudget} ${currency}

REQUIREMENTS LIST:
${JSON.stringify(currentPlan?.requirements || [], null, 2)}

TASK:
Apply Section 19 (BUDGET OPTIMIZATION) and Section 20 (MVP ENGINE).
Do NOT simply say "You need more money".
Provide realistic reallocation so the venture can launch or test within or closest to the target budget.

Return ONLY a JSON object:
{
  "feasibleAtTarget": boolean,
  "adjustedSetupTotal": number,
  "adjustedMonthlyRecurring": number,
  "optimizationSummary": "string",
  "optimization": {
    "keep": ["string"],
    "reduce": ["string"],
    "replace": ["string"],
    "delay": ["string"],
    "scaleDown": ["string"],
    "upgradeLater": ["string"]
  },
  "actionableSteps": ["string", "string", "string"]
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    const parsed = extractJsonFromText(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in budget optimization:', error);
    return res.status(500).json({ error: formatErrorMessage(error) || 'Failed to optimize budget.' });
  }
});

// Vite Middleware for dev / static for prod
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VentureCraft AI Business Planning Agent listening on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start server:', err);
});

import { BusinessPlanData } from '../types';

export const SPECIALTY_COFFEE_PLAN: BusinessPlanData = {
  id: 'coffee-bar-01',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  title: 'Specialty Artisan Espresso & Slow Bar',
  industryCategory: 'Food & Beverage / Retail Hospitality',
  targetLocation: 'Austin, TX (Urban Tech District / Walkable Core)',
  currency: 'USD',
  rawGoalSummary: 'Open a boutique specialty coffee bar focused on single-origin pour-overs, high-velocity morning espresso, and curated pastries within a $45,000–$65,000 startup capital footprint.',
  
  marketTrends: {
    trendSummary: 'Specialty coffee demand demonstrates steady non-cyclical base volume punctuated by high-margin cold beverage surges in summer (May–July) and gift/bean retail spikes in Q4 (Sept–Dec). January experiences a transient 15–20% post-holiday wellness dip.',
    peakSeason: 'September – December (Back-to-School rush & Holiday retail gifting)',
    troughSeason: 'January – February (Post-holiday resolution lull & coldest weather)',
    annualGrowthRate: '+7.4% Compound Annual Growth Rate (Specialty Third-Wave Segment)',
    volatilityLevel: 'Low',
    seasonalCashflowAdvice: 'Establish a working capital cash buffer in November/December to cover fixed lease obligations comfortably during January lull. Pivot to cold brew nitro growlers in May to capture high summer margins (82%+).',
    keyDriverInsights: [
      'Cold brew and iced espresso drinks surge to 68% of total menu volume between May and August, yielding 4.2% higher gross margins.',
      'September corporate return and academic resumption produces the highest sustained daily morning rush volume (7:15 AM - 9:30 AM).',
      'Whole-bean bag sales and holiday gift cards in December provide non-perishable high-velocity cash flow surges.',
      'January resolution slump is mitigated by promoting ceremonial matcha, high-grade decaf, and plant-based low-glycemic specialty drinks.'
    ],
    dataPoints: [
      { period: 'Jan', demandIndex: 72, searchInterest: 68, revenueMultiplier: 0.82, footfallOrTrafficIndex: 74, notes: 'Post-holiday resolution lull' },
      { period: 'Feb', demandIndex: 79, searchInterest: 74, revenueMultiplier: 0.88, footfallOrTrafficIndex: 80, notes: 'Valentine themed drink promotions' },
      { period: 'Mar', demandIndex: 86, searchInterest: 82, revenueMultiplier: 0.94, footfallOrTrafficIndex: 88, notes: 'Spring thaw & patio seating return' },
      { period: 'Apr', demandIndex: 92, searchInterest: 89, revenueMultiplier: 1.02, footfallOrTrafficIndex: 94, notes: 'Iced drink rollout begins' },
      { period: 'May', demandIndex: 98, searchInterest: 94, revenueMultiplier: 1.09, footfallOrTrafficIndex: 99, notes: 'Nitro & cold brew volume ramp' },
      { period: 'Jun', demandIndex: 104, searchInterest: 98, revenueMultiplier: 1.15, footfallOrTrafficIndex: 105, notes: 'Peak summer iced beverage volume' },
      { period: 'Jul', demandIndex: 108, searchInterest: 100, revenueMultiplier: 1.18, footfallOrTrafficIndex: 107, notes: 'Summer tourism & remote worker dwell' },
      { period: 'Aug', demandIndex: 99, searchInterest: 93, revenueMultiplier: 1.10, footfallOrTrafficIndex: 98, notes: 'Late summer travel slowdown' },
      { period: 'Sep', demandIndex: 112, searchInterest: 97, revenueMultiplier: 1.21, footfallOrTrafficIndex: 115, notes: 'Peak back-to-work morning commuter rush' },
      { period: 'Oct', demandIndex: 106, searchInterest: 95, revenueMultiplier: 1.16, footfallOrTrafficIndex: 108, notes: 'Fall specialty spiced latte menus' },
      { period: 'Nov', demandIndex: 101, searchInterest: 91, revenueMultiplier: 1.07, footfallOrTrafficIndex: 103, notes: 'Thanksgiving week & bean subscriptions' },
      { period: 'Dec', demandIndex: 116, searchInterest: 99, revenueMultiplier: 1.26, footfallOrTrafficIndex: 118, notes: 'Holiday retail bean gifts & cards' }
    ]
  },

  understanding: {
    userGoal: 'Launch an artisan 450–650 sq ft specialty espresso bar with minimal initial buildout overhead.',
    desiredOutcome: 'Profitable operation within 6 months, generating 220+ daily transactions at an $8.20 average ticket.',
    targetScale: 'Single high-traffic urban compact storefront with 12 indoor seats + takeout pick-up bar.',
    experienceLevel: 'Experienced barista / First-time storefront operator',
    timeline: '90 to 120 Days from lease signature to ribbon cutting',
    qualityExpectation: 'Specialty third-wave aesthetic with commercial-grade dual boiler machinery',
    constraints: [
      'Lease security deposit capped at 2 months rent',
      'Plumbing & 220V electrical drop requirements must exist or be negotiated with landlord',
      'Permits and health department inspection lead time of 4–6 weeks'
    ],
  },

  feasibility: {
    rating: 'feasible',
    summary: 'The projected budget of $52,500 comfortably covers commercial 2-group espresso hardware, basic counter refurbishment, first inventory run, and a 3-month operating cash cushion.',
    adjustmentsNeeded: [
      'Opt for certified reconditioned commercial espresso machine or lease-to-own rather than bespoke custom powder-coated units.',
      'Begin with pre-baked artisan wholesale bakery partnerships rather than build-in on-site commercial baking equipment.'
    ],
  },

  assumptions: [
    {
      id: 'asm-1',
      category: 'location',
      label: 'Storefront Footprint',
      assumedValue: '550 sq. ft. second-generation retail space',
      rationale: 'Avoids $30,000+ greasetrap / heavy structural venting work required for full kitchens.',
      userOverridden: false,
    },
    {
      id: 'asm-2',
      category: 'scale',
      label: 'Daily Foot Traffic & Ticket',
      assumedValue: '210 transactions / day @ $7.85 average ticket',
      rationale: 'Derived from comparable metropolitan third-wave coffee concepts.',
      userOverridden: false,
    },
    {
      id: 'asm-3',
      category: 'quantity',
      label: 'Staffing Model',
      assumedValue: '2 Full-Time Lead Baristas + Founder on shift (60 hrs/wk total staff)',
      rationale: 'Lean wage overhead while maintaining specialty extraction standards.',
      userOverridden: false,
    },
    {
      id: 'asm-4',
      category: 'quality',
      label: 'Equipment Tier',
      assumedValue: 'Tier-1 NSF Commercial dual-boiler & on-demand flat burr grinders',
      rationale: 'Necessary to avoid thermal drift during 7:30 AM–9:30 AM rush.',
      userOverridden: false,
    }
  ],

  smartQuestions: [
    {
      id: 'q-location-type',
      question: 'Will your location be a dedicated storefront, kiosk/cart, or shared co-working space?',
      impactNote: 'Alters setup capital by up to 65% due to plumbing, ADA accessibility, and security deposits.',
      options: [
        { key: 'storefront', label: 'Commercial Storefront (500–800 sq ft)', description: 'Standard high-visibility foot traffic' },
        { key: 'cart_kiosk', label: 'Mobile Cart / Micro-Kiosk', description: 'Lowest overhead, sub-$18k setup' },
        { key: 'shared_co_op', label: 'Inside Co-Working / Bookstore', description: 'Shared utility & restroom infrastructure' },
      ],
      selectedValue: 'storefront',
    },
    {
      id: 'q-equipment-acquisition',
      question: 'Do you prefer purchasing new warrantied machinery or refurbished commercial units?',
      impactNote: 'Refurbished or leased machinery saves $7,500–$12,000 upfront.',
      options: [
        { key: 'new', label: 'Brand New Commercial with 2-Year Warranty' },
        { key: 'refurbished', label: 'Certified Refurbished / Inspected Secondary Market' },
        { key: 'leased', label: 'Equipment Lease with Roaster Wholesale Partnership' },
      ],
      selectedValue: 'refurbished',
    }
  ],

  requirements: [
    {
      id: 'req-1',
      name: 'Commercial 2-Group Espresso Machine (Dual Boiler / Volumetric)',
      category: 'must_have',
      whyNeeded: 'Core revenue generator; requires temperature stability under high rush volume.',
      quantity: 1,
      unitCost: 9800,
      totalCost: 9800,
      dataStatus: 'verified',
      alternatives: 'La Marzocco Linea Classic S or Nuova Simonelli Aurelia Wave',
    },
    {
      id: 'req-2',
      name: 'Commercial On-Demand Espresso Grinders (Main + Decaf/Single)',
      category: 'must_have',
      whyNeeded: 'Consistent particle size distribution to prevent channeling.',
      quantity: 2,
      unitCost: 1450,
      totalCost: 2900,
      dataStatus: 'verified',
      alternatives: 'Mahlkönig E65S or Fiorenzato F64 Evo',
    },
    {
      id: 'req-3',
      name: 'Commercial Reverse Osmosis & Mineral Remineralization System',
      category: 'must_have',
      whyNeeded: 'Scale prevention and compliance with SCA water standards for espresso flavor.',
      quantity: 1,
      unitCost: 1850,
      totalCost: 1850,
      dataStatus: 'verified',
      alternatives: 'OptiPure BWS350 or Pentair Everpure',
    },
    {
      id: 'req-4',
      name: 'Under-Counter Commercial Refrigeration & Milk Prep Station',
      category: 'must_have',
      whyNeeded: 'Health code compliance and ergonomic fast-paced milk steaming workflow.',
      quantity: 2,
      unitCost: 1650,
      totalCost: 3300,
      dataStatus: 'verified',
    },
    {
      id: 'req-5',
      name: 'Batch Brewer & Insulated Thermal Dispensers (Fetco / Curtis)',
      category: 'should_have',
      whyNeeded: 'Serves quick morning grab-and-go commuters in under 20 seconds.',
      quantity: 1,
      unitCost: 2200,
      totalCost: 2200,
      dataStatus: 'verified',
    },
    {
      id: 'req-6',
      name: 'POS Register Terminal, Cash Drawer & Receipt Printer (Square/Toast)',
      category: 'must_have',
      whyNeeded: 'Order processing, tip collection, inventory tracking, and sales analytics.',
      quantity: 1,
      unitCost: 950,
      totalCost: 950,
      dataStatus: 'verified',
    },
    {
      id: 'req-7',
      name: 'Custom Oak Front Service Counter & Acrylic Sneeze Guard',
      category: 'should_have',
      whyNeeded: 'Primary brand touchpoint and ergonomic barista staging line.',
      quantity: 1,
      unitCost: 4800,
      totalCost: 4800,
      dataStatus: 'estimated',
    },
    {
      id: 'req-8',
      name: 'Initial Specialty Bean Inventory & Eco Paper Packaging',
      category: 'must_have',
      whyNeeded: 'Opening 4-week supply of single origin coffees, dairy, plant milks, cups.',
      quantity: 1,
      unitCost: 3400,
      totalCost: 3400,
      dataStatus: 'estimated',
    },
    {
      id: 'req-9',
      name: 'Acoustic Wall Panels & Ambient Minimalist Lighting Fixtures',
      category: 'optional',
      whyNeeded: 'Enhances dwell time and creates comfortable conversation atmosphere.',
      quantity: 1,
      unitCost: 1800,
      totalCost: 1800,
      dataStatus: 'estimated',
    },
    {
      id: 'req-10',
      name: 'In-House Cold Brew Nitro Draft Kegerator System',
      category: 'future_upgrade',
      whyNeeded: 'High-margin afternoon summer beverage ($6.50/cup @ $0.90 cost).',
      quantity: 1,
      unitCost: 2600,
      totalCost: 2600,
      dataStatus: 'estimated',
      alternatives: 'Start with chilled still cold brew in glass carafes.',
    },
    {
      id: 'req-11',
      name: 'Custom Branded Heavy Ceramic Mug Merchandise',
      category: 'not_required',
      whyNeeded: 'Ties up precious capital early before establishing local brand loyalty.',
      quantity: 0,
      unitCost: 0,
      totalCost: 0,
      dataStatus: 'assumed',
    }
  ],

  budgetScenarios: {
    starter: {
      name: 'Starter',
      label: 'Lean Micro-Bar Setup',
      setupCost: 29500,
      initialOperatingCost: 11000,
      initialCashRequirement: 40500,
      monthlyRecurringCost: 6800,
      annualRecurringCost: 81600,
      summary: 'Certified reconditioned equipment, compact 350 sq ft footprint or pop-up kiosk, curated 4-item drink menu.',
      includedFeatures: [
        'Certified reconditioned 2-group espresso machine',
        'Single commercial grinder + manual single-dose grinder',
        'Prefabricated modular modular counter units',
        'Basic point-of-sale iPad system',
        '1-month emergency operating buffer'
      ]
    },
    recommended: {
      name: 'Recommended',
      label: 'Full Specialty Storefront (Balanced)',
      setupCost: 48500,
      initialOperatingCost: 18500,
      initialCashRequirement: 67000,
      monthlyRecurringCost: 9200,
      annualRecurringCost: 110400,
      summary: 'Brand new high-reliability commercial setup, custom architectural counter, batch brewer, 3 months reserve runway.',
      includedFeatures: [
        'Commercial dual-boiler volumetric machine (La Marzocco / Aurelia)',
        'Dual Mahlkönig on-demand flat burr grinders',
        'Dedicated multi-stage reverse osmosis filtration',
        'Custom warm wood bar buildout & acoustic treatment',
        '3 months operating buffer for payroll & rent'
      ]
    },
    premium: {
      name: 'Premium',
      label: 'Flagship Roastery Showcase',
      setupCost: 84000,
      initialOperatingCost: 28000,
      initialCashRequirement: 112000,
      monthlyRecurringCost: 14500,
      annualRecurringCost: 174000,
      summary: 'Custom powder-coated equipment, dedicated nitro draft system, extensive indoor seating lounge, merchandise retail bay.',
      includedFeatures: [
        'Custom multi-boiler pressure-profiling machine (Slayer / Synesso)',
        'Dual automated grind-by-weight stations',
        'Integrated under-counter Modbar pour-over taps',
        'Full bespoke architectural interior millwork and signage',
        'Dedicated nitro cold brew draft system'
      ]
    }
  },

  hiddenCosts: [
    {
      id: 'hc-1',
      name: 'Commercial Plumbing & Dedicated 220V/30A Drops',
      category: 'Facility Upgrades',
      estimatedAmount: 3200,
      frequency: 'one_time',
      notes: 'Water supply lines, drain pitch for espresso tray, and dedicated circuit breaker.'
    },
    {
      id: 'hc-2',
      name: 'Municipal Health Inspection, Food Handler & Business Permits',
      category: 'Permits & Licensing',
      estimatedAmount: 1450,
      frequency: 'one_time',
      notes: 'Local department of health plan review and occupancy certificate.'
    },
    {
      id: 'hc-3',
      name: 'Credit Card Payment Processing Fees (2.6% + 10¢)',
      category: 'Merchant Fees',
      estimatedAmount: 980,
      frequency: 'monthly',
      notes: 'Calculated on projected $38,000 monthly gross card sales volume.'
    },
    {
      id: 'hc-4',
      name: 'Commercial Water Filter Cartridge Replacements',
      category: 'Preventative Maintenance',
      estimatedAmount: 650,
      frequency: 'annual',
      notes: 'Critical every 6–9 months to prevent mineral calcium buildup in brass boiler.'
    },
    {
      id: 'hc-5',
      name: 'Waste Hauling & Grease Trap Mandate Service',
      category: 'Utilities',
      estimatedAmount: 185,
      frequency: 'monthly',
      notes: 'City municipal commercial refuse and bi-monthly under-sink trap service.'
    }
  ],

  monthlyRecurringBreakdown: [
    { name: 'Commercial Rent & NNN (550 sq ft @ $48/sq ft)', cost: 2600, category: 'Occupancy' },
    { name: 'Barista Labor & Payroll Taxes (2 Part-time baristas)', cost: 3800, category: 'Payroll' },
    { name: 'Coffee Beans, Organic Milk & Syrups Restock', cost: 1650, category: 'COGS' },
    { name: 'Electricity, Water, High-Speed Commercial Wi-Fi', cost: 580, category: 'Utilities' },
    { name: 'POS Software, Music Licensing & Accounting', cost: 240, category: 'Software & Fees' },
    { name: 'General Liability & Property Insurance', cost: 330, category: 'Insurance' }
  ],

  productComparisons: [
    {
      categoryName: 'Commercial Espresso Machines',
      verdict: 'Option B offers the optimal sweet spot between bulletproof reliability, nationwide technician availability, and total upfront cost.',
      options: [
        {
          tier: 'Budget',
          name: 'Nuova Simonelli Appia Life 2-Group Compact',
          modelOrVendor: 'Nuova Simonelli USA',
          price: 5900,
          currency: 'USD',
          keyFeatures: ['Heat exchanger system', 'Push-pull steam triggers', 'Soft infusion system'],
          capacityOrSpec: '7.5 Liter single boiler, 150 cups/hour peak',
          warranty: '1-Year Parts',
          suitableFor: 'Startups with tight cash constraints and moderate daily volume (<180 cups/day)',
          tradeOffs: 'Single boiler design requires cooling flushes during sustained morning surges',
          dataStatus: 'verified'
        },
        {
          tier: 'Balanced',
          name: 'La Marzocco Linea Classic S 2-Group',
          modelOrVendor: 'La Marzocco USA',
          price: 11500,
          currency: 'USD',
          keyFeatures: ['Dual saturated boilers', 'PID temperature control', 'Pro Touch steam wands', 'Shot timers'],
          capacityOrSpec: '3.4L brew boiler + 7L steam boiler, 350+ cups/hour peak',
          warranty: '2-Year Comprehensive Parts & Labor',
          suitableFor: 'High-volume specialty coffee shops needing 99.9% uptime and high resale value',
          tradeOffs: 'Higher initial investment, but near-zero depreciation in the secondary market',
          dataStatus: 'verified'
        },
        {
          tier: 'Premium',
          name: 'Slayer Espresso 2-Group Custom',
          modelOrVendor: 'Slayer Inc.',
          price: 22800,
          currency: 'USD',
          keyFeatures: ['Patented needle valve flow rate control', 'Independent group head brew boilers', 'Custom wood actuator paddles'],
          capacityOrSpec: 'Multi-boiler individual PID per group head',
          warranty: '1-Year Manufacturer Warranty',
          suitableFor: 'Showcase specialty shops marketing rare geisha micro-lots and ultra-light roasts',
          tradeOffs: 'Extremely high cost; requires barista precision to dial in flow rates consistently',
          dataStatus: 'verified'
        }
      ]
    },
    {
      categoryName: 'Commercial Espresso Grinders',
      verdict: 'Mahlkönig E65S GbW (Grind-by-Weight) eliminates manual barista scale weighing and speeds workflow by 4.5 seconds per drink.',
      options: [
        {
          tier: 'Budget',
          name: 'Eureka Zenith 65 Neo',
          modelOrVendor: 'Eureka Grinders',
          price: 990,
          currency: 'USD',
          keyFeatures: ['65mm flat hardened steel burrs', 'Stepless micrometric regulation'],
          capacityOrSpec: '4g/sec throughput, timed dosing',
          warranty: '1-Year Parts',
          suitableFor: 'Low volume or decaf hopper secondary duty',
          tradeOffs: 'Timed dosing fluctuates as bean hopper empties; needs periodic manual re-weighing',
          dataStatus: 'verified'
        },
        {
          tier: 'Balanced',
          name: 'Mahlkönig E65S GbW (Grind-by-Weight)',
          modelOrVendor: 'Hemro Group / Mahlkönig',
          price: 2750,
          currency: 'USD',
          keyFeatures: ['Integrated load cell for real-time scale dosing', 'Disc Distance Detection', 'Active cooling fan'],
          capacityOrSpec: '65mm special steel burrs, 0.1g dose accuracy',
          warranty: '2-Year Parts',
          suitableFor: 'Fast-paced rush hours where speed, zero coffee waste, and exact yield are critical',
          tradeOffs: 'Higher initial cost than timed grinders, but pays for itself in bean waste reduction',
          dataStatus: 'verified'
        },
        {
          tier: 'Premium',
          name: 'Mahlkönig EK43S Allround Master',
          modelOrVendor: 'Mahlkönig',
          price: 3450,
          currency: 'USD',
          keyFeatures: ['98mm cast steel flat burrs', 'Virtually zero retention', 'Full particle spectrum dial'],
          capacityOrSpec: '25g/sec speed, pour-over, retail bags and single-dosing',
          warranty: '2-Year Warranty',
          suitableFor: 'Shops offering rotating single-origin pour-overs and retail bean grinding',
          tradeOffs: 'Larger physical counter footprint and manual per-shot loading workflow',
          dataStatus: 'verified'
        }
      ]
    }
  ],

  optimization: {
    keep: [
      'Dual boiler commercial espresso machine (thermal stability prevents customer churn from sour/bitter shots)',
      'Reverse osmosis water treatment (protects boilers from devastating $2,500 scale damage)',
      'High-velocity contactless POS system with prominent digital tipping prompt'
    ],
    reduce: [
      'Custom millwork carpentry: utilize clean modular butcher-block counters from commercial supplier to save $3,200',
      'Initial bean order: purchase 2-week roasted supplies with automated weekly reorder rather than stocking 6 weeks',
      'Reduce printed collateral: utilize QR display cards and minimalist chalk blackboard menus'
    ],
    replace: [
      'Replace dedicated nitro draft kegerator with standard chilled cold-brew dispenser for first 90 days (save $2,600)',
      'Replace in-house sound system with high-grade commercial Sonos speaker pair (save $1,100)'
    ],
    delay: [
      'Custom branded ceramic merchandise mugs (postpone until 1,000 loyalty members enrolled)',
      'Mobile app / custom order ahead integration (launch on web first via Square Online)'
    ],
    scaleDown: [
      'Start with 8 indoor dining chairs + standing counter rather than 20 full lounge seats',
      'Streamline milk offerings to Whole, Oat, and Almond; omit cashew/macadamia until customer demand verifies volume'
    ],
    upgradeLater: [
      'Automated Puqpress precision tamper (add in Month 4 once morning line reaches 50 customers/hr)',
      'Second batch brewer station for cold brew immersion tanks'
    ]
  },

  mvp: {
    launchNow: [
      'Core espresso menu: Espresso, Cortado, Cappuccino, Flat White, Latte, Americano',
      'Filtered batch brew grab-and-go option',
      'Local artisan bakery morning drop (3 pastry varieties, zero baking overhead)',
      'Square contactless terminal with Apple Pay & Google Pay'
    ],
    addLater: [
      'Custom signature seasonal syrup program (lavender honey, spiced cardamom)',
      'Specialty single-origin manual V60 pour-over bar',
      'Retail shelf with branded 12oz whole bean bags and AeroPress accessories'
    ],
    testFirst: [
      'Pre-launch morning pop-up outside neighbor storefront to validate commuter footpath between 7:15 AM and 8:45 AM',
      'Roaster blind cupping sessions with 15 target locals to select house espresso blend profile'
    ]
  },

  scalability: [
    {
      stage: 'Small Scale',
      description: 'Single compact barista station (Founder + 1 part-time assistant)',
      capacity: '120–180 drinks / day',
      requiredTeam: '2 people total',
      keyInfrastructure: ['2-Group volumetric machine', 'Single high-speed grinder', 'Basic under-counter fridge'],
      costMultiplierOrEstimate: '$45,000–$65,000 initial base'
    },
    {
      stage: 'Medium Scale',
      description: 'High-velocity 2-barista rush line with dedicated milk steamer and order expediter',
      capacity: '350–500 drinks / day',
      requiredTeam: '4–5 trained baristas + Shift supervisor',
      keyInfrastructure: ['Dual grinders (GbW)', 'Puqpress automated tamper', 'Dedicated rinse sinks', 'Toast dual-screen KDS'],
      costMultiplierOrEstimate: '+$12,000 equipment upgrades; 2.4x revenue run-rate'
    },
    {
      stage: 'Large Scale',
      description: 'Multi-unit expansion or central roastery hub supplying 3 kiosk storefronts',
      capacity: '1,200+ drinks / day combined',
      requiredTeam: 'General Manager, Head of Roasting, 12+ Retail Baristas',
      keyInfrastructure: ['15kg Diedrich or Loring drum roaster', 'Green bean climate storage', 'Centralized supply chain vehicle'],
      costMultiplierOrEstimate: '$280,000 capital expansion via retained earnings & SBA financing'
    }
  ],

  financialModel: {
    sellingPricePerUnit: 6.85,
    variableCostPerUnit: 1.42, // Beans ($0.58) + Milk ($0.42) + Cup/Lid/Sleeve ($0.32) + Syrups/Napkin ($0.10)
    grossProfitPerUnit: 5.43,
    grossMarginPercent: 79.3,
    monthlyFixedCosts: 9200, // Rent, core payroll, utilities, insurance, software
    breakEvenUnitsMonthly: 1694, // 1694 drinks/month = ~56 drinks/day
    breakEvenRevenueMonthly: 11603,
    estimatedPaybackPeriodMonths: 14.5,
    assumptionsNotes: 'Based on operating 28 days per month, 7:00 AM–4:00 PM. At target volume of 210 drinks/day, monthly gross revenue is ~$40,278, yielding estimated monthly net operating income of $7,400 after all costs and labor.'
  },

  businessModel: {
    targetCustomer: 'Neighborhood tech professionals, remote knowledge workers, and morning transit commuters seeking premium craft beverage consistency.',
    valueProposition: 'Exceptional extraction quality served in under 90 seconds without snobbery, paired with ethical direct-trade farm sourcing.',
    primarySalesChannels: ['Walk-in retail counter', 'Online order-ahead mobile pick-up shelf', 'Monthly residential coffee bean subscription'],
    marketingStrategy: [
      'Hyper-local neighborhood launch tasting with free cortados for the first 100 locals',
      'Google Maps local business profile optimization with high-resolution interior photos',
      'Corporate morning coffee catering boxes (96oz carafe boxes for tech offices within 4 blocks)'
    ],
    revenueStreams: [
      'Espresso & espresso-based drinks (62% of gross revenue)',
      'Batch brew & specialty iced beverages (18% of gross revenue)',
      'Wholesale artisanal pastries & morning snack items (14% of gross revenue)',
      'Retail packaged whole beans and brew accessories (6% of gross revenue)'
    ],
    competitiveAdvantage: 'Direct roaster relationship ensuring 7-day-fresh roast cycles, calibrated GbW grinding eliminating wait times, and warm hospitality.'
  },

  phases: [
    {
      phaseNumber: 1,
      title: 'Phase 1 — Market Research & Concept Definition',
      timeframe: 'Days 1–15',
      keyDeliverables: [
        'Analyze 3 nearest competitors pricing, wait times, and menu gaps',
        'Finalize target customer avatar and brand name trademark clearance',
        'Verify city commercial zoning code and ADA health requirements'
      ]
    },
    {
      phaseNumber: 2,
      title: 'Phase 2 — Financial Planning & Budget Allocation',
      timeframe: 'Days 16–30',
      keyDeliverables: [
        'Finalize 3-scenario budget (Starter, Recommended, Premium)',
        'Open business commercial checking account and establish merchant account',
        'Secure startup capital reserve ($67,000 target)'
      ]
    },
    {
      phaseNumber: 3,
      title: 'Phase 3 — Site Selection & Lease Negotiation',
      timeframe: 'Days 31–50',
      keyDeliverables: [
        'Tour 3 second-generation retail spaces with existing plumbing',
        'Negotiate lease terms with 60-day tenant improvement rent abatement',
        'Execute lease agreement and deposit escrow'
      ]
    },
    {
      phaseNumber: 4,
      title: 'Phase 4 — Equipment Procurement & Sourcing',
      timeframe: 'Days 51–65',
      keyDeliverables: [
        'Order commercial espresso machine, GbW grinders, and RO filtration',
        'Sign wholesale coffee bean supply agreement with 15% equipment discount',
        'Order compostable paper cups, lids, and custom stamps'
      ]
    },
    {
      phaseNumber: 5,
      title: 'Phase 5 — Buildout, Plumbing & Electrical',
      timeframe: 'Days 66–85',
      keyDeliverables: [
        'Complete 220V electrical drops and under-counter plumbing hookups',
        'Install service counter, under-counter refrigeration, and handwash sinks',
        'Mount POS terminal and customer-facing tip display'
      ]
    },
    {
      phaseNumber: 6,
      title: 'Phase 6 — Regulatory Inspections & Permits',
      timeframe: 'Days 86–95',
      keyDeliverables: [
        'Pass city health department inspection and receive Food Establishment Permit',
        'Pass fire marshal occupancy safety walk',
        'Obtain certificate of occupancy'
      ]
    },
    {
      phaseNumber: 7,
      title: 'Phase 7 — Staff Training & Soft Launch',
      timeframe: 'Days 96–105',
      keyDeliverables: [
        'Conduct 5-day intensive barista calibration and milk texturing training',
        'Host 3-day invitation-only friends and family soft opening',
        'Fine-tune POS workflow, register reconciliation, and waste log'
      ]
    },
    {
      phaseNumber: 8,
      title: 'Phase 8 — Grand Opening & Marketing Push',
      timeframe: 'Days 106–115',
      keyDeliverables: [
        'Launch neighborhood opening promotion (First 100 drinks free)',
        'Activate Google Maps local listing with 50+ launch day reviews',
        'Distribute flyer cards with QR promo code to neighboring residential buildings'
      ]
    },
    {
      phaseNumber: 9,
      title: 'Phase 9 — Optimization & Break-Even Scaling',
      timeframe: 'Days 116–180',
      keyDeliverables: [
        'Review real drink margins and discontinue underperforming menu items',
        'Launch afternoon cold drink promotion to elevate 1:00 PM–4:00 PM footfall',
        'Achieve consistent monthly net break-even'
      ]
    }
  ],

  tasks: [
    {
      id: 'tsk-1',
      title: 'Secure Certified Plumber for Espresso & RO Drain Lines',
      priority: 'High',
      dependency: 'Signed Lease',
      status: 'In Progress',
      estimatedCost: 1800,
      deadline: 'Week 4',
      owner: 'Founder'
    },
    {
      id: 'tsk-2',
      title: 'Finalize Commercial 2-Group Machine Purchase Order',
      priority: 'High',
      dependency: 'Electrical Confirmation (220V/30A)',
      status: 'Pending',
      estimatedCost: 11500,
      deadline: 'Week 5',
      owner: 'Founder'
    },
    {
      id: 'tsk-3',
      title: 'Submit City Department of Health Permit Application',
      priority: 'High',
      dependency: 'Architectural Floor Plan',
      status: 'Pending',
      estimatedCost: 850,
      deadline: 'Week 3',
      owner: 'Consultant / Founder'
    },
    {
      id: 'tsk-4',
      title: 'Select Wholesale Roasting Partner & Coffee Tasting',
      priority: 'Medium',
      dependency: 'None',
      status: 'Completed',
      estimatedCost: 0,
      deadline: 'Week 2',
      owner: 'Lead Barista'
    },
    {
      id: 'tsk-5',
      title: 'Set up POS Product Catalog, Modifiers & Tax Rates',
      priority: 'Medium',
      dependency: 'Menu Pricing Finalized',
      status: 'Pending',
      estimatedCost: 0,
      deadline: 'Week 7',
      owner: 'Founder'
    }
  ],

  purchaseChecklist: [
    {
      id: 'pch-1',
      item: 'La Marzocco Linea Classic S 2-Group Espresso Machine',
      quantity: 1,
      specification: '220V/30A Single Phase, Dual Saturated Boilers, Stainless Steel',
      estimatedPrice: 11500,
      priority: 'Critical',
      recommendedSource: 'Certified Commercial Distributor / Roaster Partner',
      completed: false
    },
    {
      id: 'pch-2',
      item: 'Mahlkönig E65S GbW Grind-by-Weight Grinder',
      quantity: 1,
      specification: '65mm special steel burrs, integrated scale, 110V',
      estimatedPrice: 2750,
      priority: 'Critical',
      recommendedSource: 'Hemro Group Authorized Dealer',
      completed: false
    },
    {
      id: 'pch-3',
      item: 'Commercial Reverse Osmosis System with Remineralization',
      quantity: 1,
      specification: 'OptiPure BWS350, 100 GPD production, 9-gal tank',
      estimatedPrice: 1850,
      priority: 'Critical',
      recommendedSource: 'Restaurant Supply / Water Specialist',
      completed: false
    },
    {
      id: 'pch-4',
      item: 'True Under-Counter 2-Door Commercial Refrigerator',
      quantity: 1,
      specification: '48" width, stainless front, NSF certified, self-closing doors',
      estimatedPrice: 2100,
      priority: 'Critical',
      recommendedSource: 'Commercial Kitchen Supply',
      completed: false
    },
    {
      id: 'pch-5',
      item: 'Square Register Dual-Screen Terminal & Cash Drawer Kit',
      quantity: 1,
      specification: 'Includes customer-facing display, hub, thermal receipt printer',
      estimatedPrice: 950,
      priority: 'Important',
      recommendedSource: 'Square Official / Direct',
      completed: true
    },
    {
      id: 'pch-6',
      item: 'Acaia Lunar Precision Water-Resistant Espresso Scales',
      quantity: 2,
      specification: '0.1g accuracy, Bluetooth flow rate monitoring',
      estimatedPrice: 500,
      priority: 'Important',
      recommendedSource: 'Specialty Coffee Merchant',
      completed: false
    },
    {
      id: 'pch-7',
      item: 'Eco-Friendly Double-Wall Paper Cups & Fiber Sip Lids (Case of 1,000)',
      quantity: 3,
      specification: '12oz & 16oz Kraft compostable with universal 90mm lids',
      estimatedPrice: 420,
      priority: 'Important',
      recommendedSource: 'Green Restaurant Wholesale Pack',
      completed: false
    }
  ],

  implementationChecklist: [
    { id: 'imp-1', label: 'Register LLC & obtain federal Employer Identification Number (EIN)', category: 'Legal', completed: true },
    { id: 'imp-2', label: 'Commercial lease agreement signed with 60-day buildout grace period', category: 'Legal', completed: true },
    { id: 'imp-3', label: 'City health permit application submitted with equipment spec sheets', category: 'Legal', completed: false },
    { id: 'imp-4', label: 'Water filtration RO system installed and PPM tested (130–150 TDS)', category: 'Setup', completed: false },
    { id: 'imp-5', label: 'Commercial espresso machine bench-tested and flow-rate calibrated', category: 'Testing', completed: false },
    { id: 'imp-6', label: 'Drink menu recipes & portion cost sheets locked down (sub-22% COGS)', category: 'Pricing', completed: true },
    { id: 'imp-7', label: 'Staff certified with Food Handler certifications', category: 'Operations', completed: false },
    { id: 'imp-8', label: 'Google Business Profile claimed, verified, and mapped with opening date', category: 'Marketing', completed: false },
    { id: 'imp-9', label: 'POS merchant processor tested with live live test card transactions', category: 'Testing', completed: false }
  ],

  risksAndMitigations: [
    {
      risk: 'Unexpected delay in municipal health department inspection approvals',
      severity: 'High',
      mitigation: 'Submit mechanical plans 30 days early and hire a local expediter who frequently works with city health inspectors.'
    },
    {
      risk: 'Morning customer throughput bottleneck causing slow line wait times (>3 mins)',
      severity: 'Medium',
      mitigation: 'Implement Grind-by-Weight grinding, batch brew quick-pour for grab-and-go commuters, and a dedicated mobile pickup shelf.'
    },
    {
      risk: 'Utility failure or scale buildup causing commercial machine breakdown',
      severity: 'Medium',
      mitigation: 'Mandatory monthly preventative water testing and local on-call service contract with espresso equipment technician.'
    }
  ],

  recommendedNextSteps: [
    'Lock in second-generation retail space lease with verified 220V/30A electrical drop.',
    'Test local water TDS to size the exact Reverse Osmosis filtration membrane.',
    'Confirm wholesale roaster agreement to receive bundled discount on La Marzocco machinery.'
  ],

  executiveSummaryMarkdown: `## Executive Overview: Specialty Artisan Espresso Bar

This comprehensive strategic plan outlines the successful launch of a high-margin, boutique specialty coffee bar in a prime urban location. By targeting a 550 sq. ft. footprint with second-generation retail plumbing, initial capital outlay is reduced by over $32,000 compared to greenfield commercial restaurant buildouts.

### Key Financial Pillars
- **Target Startup Capital (Recommended):** $67,000 (including $18,500 3-month operating safety reserve)
- **Unit Economics:** $6.85 Average Drink Price − $1.42 COGS = **$5.43 Gross Margin (79.3%)**
- **Monthly Fixed Overhead:** $9,200 (Lease, core barista labor, utilities, insurance)
- **Daily Break-Even Volume:** 56 transactions/day (Easily surpassed by target 210 transactions/day)
- **Projected Payback Horizon:** 14.5 Months to 100% capital recoupment
`
};

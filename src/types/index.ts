export interface CapexItem {
  name: string;
  category: string;
  estimatedCost: number;
  description: string;
}

export interface RevenueStream {
  name: string;
  sharePercent: number;
  description: string;
}

export interface OpexItem {
  category: string;
  monthlyAmount: number;
  notes: string;
}

export interface ProFormaYear {
  year: string;
  revenue: number;
  cogs: number;
  grossProfit: number;
  operatingExpenses: number;
  ebitda: number;
  tax: number;
  netIncome: number;
  marginPercent: number;
}

export interface SectorFaq {
  question: string;
  answer: string;
}

export interface SectorData {
  slug: string;
  name: string;
  industry: string;
  badge: string;
  metaTitle?: string;
  metaDescription?: string;
  heroSubtitle: string;
  typicalY1Revenue: string;
  typicalY2Revenue: string;
  typicalY3Revenue: string;
  grossMarginBenchmark: number;
  ebitdaMarginBenchmark: string;
  breakevenMonth: string;
  initialCapexRange: string;
  averageTicketOrRetainer: number;
  defaultCustomerVolume: number;
  volumeUnit: string;
  primeCostOrGrossMarginNote: string;
  revenueStreams: RevenueStream[];
  capexItems: CapexItem[];
  monthlyOpexItems: OpexItem[];
  unitEconomics: {
    pricePerUnit: string;
    directCostPerUnit: string;
    contributionMargin: string;
    breakevenVolume: string;
    paybackPeriod: string;
  };
  proFormaYears: ProFormaYear[];
  faqs: SectorFaq[];
  tags: string[];
}

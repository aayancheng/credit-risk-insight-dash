export interface FinancialMetrics {
  currentRatio: number;
  debtToEquity: number;
  returnOnEquity: number;
  interestCoverage: number;
  profitMargin: number;
  assetTurnover: number;
  quickRatio: number;
  totalDebtRatio: number;
  timesInterestEarned: number;
  workingCapital: number;
  grossProfitMargin: number;
  netProfitMargin: number;
  cashRatio: number;
  payablesTurnover: number;
  receivablesTurnover: number;
}

export interface BehavioralFeatures {
  paymentHistory: number;
  accountAge: number;
  creditUtilization: number;
  tradingFrequency: number;
  volatilityScore: number;
}

export interface CustomerData {
  id: string;
  name: string;
  exposure: number;
  rating: string;
  pd: number;
  lgd: number;
  expectedLoss: number;
  sector: string;
  region: string;
  utilization: number;
  limit: number;
  financialMetrics: FinancialMetrics;
  behavioralFeatures: BehavioralFeatures;
  lastUpdated: string;
  portfolioRank?: number;
  sectorRank?: number;
}

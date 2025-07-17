// Centralized customer data service
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
  financialMetrics: {
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
  };
  behavioralFeatures: {
    paymentHistory: number;
    accountAge: number;
    creditUtilization: number;
    tradingFrequency: number;
    volatilityScore: number;
  };
  lastUpdated: string;
  portfolioRank?: number;
  sectorRank?: number;
}

export const customerDatabase: CustomerData[] = [
  {
    id: 'xyz-corporation',
    name: 'XYZ Corporation',
    exposure: 45000000,
    rating: 'BBB',
    pd: 2.1,
    lgd: 35,
    expectedLoss: 330750,
    sector: 'Manufacturing',
    region: 'North America',
    utilization: 90,
    limit: 50000000,
    financialMetrics: {
      currentRatio: 1.8,
      debtToEquity: 0.65,
      returnOnEquity: 15.2,
      interestCoverage: 5.8,
      profitMargin: 8.5,
      assetTurnover: 0.88,
      quickRatio: 1.2,
      totalDebtRatio: 0.65,
      timesInterestEarned: 5.8,
      workingCapital: 15000000,
      grossProfitMargin: 25.2,
      netProfitMargin: 8.5,
      cashRatio: 0.45,
      payablesTurnover: 8.2,
      receivablesTurnover: 12.1
    },
    behavioralFeatures: {
      paymentHistory: 98.5,
      accountAge: 8.2,
      creditUtilization: 72,
      tradingFrequency: 45,
      volatilityScore: 2.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'abc-industries',
    name: 'ABC Industries',
    exposure: 32000000,
    rating: 'A-',
    pd: 1.5,
    lgd: 30,
    expectedLoss: 144000,
    sector: 'Technology',
    region: 'North America',
    utilization: 91,
    limit: 35000000,
    financialMetrics: {
      currentRatio: 2.1,
      debtToEquity: 0.45,
      returnOnEquity: 18.7,
      interestCoverage: 8.2,
      profitMargin: 12.3,
      assetTurnover: 0.86,
      quickRatio: 1.8,
      totalDebtRatio: 0.45,
      timesInterestEarned: 8.2,
      workingCapital: 18000000,
      grossProfitMargin: 32.1,
      netProfitMargin: 12.3,
      cashRatio: 0.65,
      payablesTurnover: 9.5,
      receivablesTurnover: 16.2
    },
    behavioralFeatures: {
      paymentHistory: 99.2,
      accountAge: 6.5,
      creditUtilization: 58,
      tradingFrequency: 52,
      volatilityScore: 1.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'global-services',
    name: 'Global Services Ltd',
    exposure: 28000000,
    rating: 'BB+',
    pd: 3.8,
    lgd: 40,
    expectedLoss: 425600,
    sector: 'Services',
    region: 'Europe',
    utilization: 93,
    limit: 30000000,
    financialMetrics: {
      currentRatio: 1.5,
      debtToEquity: 0.82,
      returnOnEquity: 12.4,
      interestCoverage: 4.2,
      profitMargin: 6.8,
      assetTurnover: 0.97,
      quickRatio: 1.1,
      totalDebtRatio: 0.82,
      timesInterestEarned: 4.2,
      workingCapital: 12000000,
      grossProfitMargin: 20.3,
      netProfitMargin: 6.8,
      cashRatio: 0.32,
      payablesTurnover: 7.8,
      receivablesTurnover: 10.5
    },
    behavioralFeatures: {
      paymentHistory: 96.8,
      accountAge: 12.3,
      creditUtilization: 85,
      tradingFrequency: 38,
      volatilityScore: 3.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'tech-innovations',
    name: 'Tech Innovations Inc',
    exposure: 22000000,
    rating: 'AA-',
    pd: 0.8,
    lgd: 25,
    expectedLoss: 44000,
    sector: 'Technology',
    region: 'North America',
    utilization: 88,
    limit: 25000000,
    financialMetrics: {
      currentRatio: 2.5,
      debtToEquity: 0.35,
      returnOnEquity: 22.1,
      interestCoverage: 12.5,
      profitMargin: 15.2,
      assetTurnover: 0.88,
      quickRatio: 2.1,
      totalDebtRatio: 0.35,
      timesInterestEarned: 12.5,
      workingCapital: 22000000,
      grossProfitMargin: 38.4,
      netProfitMargin: 15.2,
      cashRatio: 0.75,
      payablesTurnover: 11.2,
      receivablesTurnover: 18.5
    },
    behavioralFeatures: {
      paymentHistory: 99.8,
      accountAge: 4.2,
      creditUtilization: 42,
      tradingFrequency: 65,
      volatilityScore: 1.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'energy-solutions',
    name: 'Energy Solutions Corp',
    exposure: 38000000,
    rating: 'BBB+',
    pd: 1.8,
    lgd: 32,
    expectedLoss: 218880,
    sector: 'Energy',
    region: 'North America',
    utilization: 95,
    limit: 40000000,
    financialMetrics: {
      currentRatio: 1.9,
      debtToEquity: 0.58,
      returnOnEquity: 16.8,
      interestCoverage: 6.8,
      profitMargin: 9.2,
      assetTurnover: 0.85,
      quickRatio: 1.4,
      totalDebtRatio: 0.58,
      timesInterestEarned: 6.8,
      workingCapital: 16000000,
      grossProfitMargin: 28.7,
      netProfitMargin: 9.2,
      cashRatio: 0.48,
      payablesTurnover: 8.8,
      receivablesTurnover: 13.2
    },
    behavioralFeatures: {
      paymentHistory: 98.1,
      accountAge: 9.8,
      creditUtilization: 68,
      tradingFrequency: 42,
      volatilityScore: 2.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'retail-group',
    name: 'Retail Group Holdings',
    exposure: 15000000,
    rating: 'B+',
    pd: 5.2,
    lgd: 45,
    expectedLoss: 351000,
    sector: 'Retail',
    region: 'Europe',
    utilization: 83,
    limit: 18000000,
    financialMetrics: {
      currentRatio: 1.2,
      debtToEquity: 1.05,
      returnOnEquity: 9.2,
      interestCoverage: 2.8,
      profitMargin: 4.8,
      assetTurnover: 1.32,
      quickRatio: 0.8,
      totalDebtRatio: 1.05,
      timesInterestEarned: 2.8,
      workingCapital: 8000000,
      grossProfitMargin: 15.8,
      netProfitMargin: 4.8,
      cashRatio: 0.22,
      payablesTurnover: 6.2,
      receivablesTurnover: 8.5
    },
    behavioralFeatures: {
      paymentHistory: 94.5,
      accountAge: 15.2,
      creditUtilization: 92,
      tradingFrequency: 28,
      volatilityScore: 4.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'financial-partners',
    name: 'Financial Partners LLC',
    exposure: 52000000,
    rating: 'A',
    pd: 1.2,
    lgd: 28,
    expectedLoss: 174720,
    sector: 'Financial',
    region: 'North America',
    utilization: 95,
    limit: 55000000,
    financialMetrics: {
      currentRatio: 2.3,
      debtToEquity: 0.42,
      returnOnEquity: 19.8,
      interestCoverage: 9.5,
      profitMargin: 11.5,
      assetTurnover: 0.51,
      quickRatio: 2.0,
      totalDebtRatio: 0.42,
      timesInterestEarned: 9.5,
      workingCapital: 25000000,
      grossProfitMargin: 42.2,
      netProfitMargin: 19.8,
      cashRatio: 0.68,
      payablesTurnover: 12.5,
      receivablesTurnover: 15.8
    },
    behavioralFeatures: {
      paymentHistory: 99.5,
      accountAge: 7.8,
      creditUtilization: 55,
      tradingFrequency: 58,
      volatilityScore: 1.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'construction-ltd',
    name: 'Construction Ltd',
    exposure: 26000000,
    rating: 'BB',
    pd: 4.5,
    lgd: 42,
    expectedLoss: 491400,
    sector: 'Construction',
    region: 'Asia Pacific',
    utilization: 93,
    limit: 28000000,
    financialMetrics: {
      currentRatio: 1.4,
      debtToEquity: 0.95,
      returnOnEquity: 11.2,
      interestCoverage: 3.5,
      profitMargin: 5.8,
      assetTurnover: 1.12,
      quickRatio: 1.0,
      totalDebtRatio: 0.95,
      timesInterestEarned: 3.5,
      workingCapital: 10000000,
      grossProfitMargin: 18.6,
      netProfitMargin: 5.8,
      cashRatio: 0.28,
      payablesTurnover: 7.2,
      receivablesTurnover: 9.8
    },
    behavioralFeatures: {
      paymentHistory: 95.2,
      accountAge: 11.5,
      creditUtilization: 88,
      tradingFrequency: 35,
      volatilityScore: 3.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'pharma-research',
    name: 'Pharma Research Co',
    exposure: 41000000,
    rating: 'A+',
    pd: 0.9,
    lgd: 26,
    expectedLoss: 95940,
    sector: 'Healthcare',
    region: 'North America',
    utilization: 91,
    limit: 45000000,
    financialMetrics: {
      currentRatio: 2.8,
      debtToEquity: 0.42,
      returnOnEquity: 20.1,
      interestCoverage: 11.2,
      profitMargin: 16.0,
      assetTurnover: 0.82,
      quickRatio: 2.3,
      totalDebtRatio: 0.42,
      timesInterestEarned: 11.2,
      workingCapital: 28000000,
      grossProfitMargin: 45.8,
      netProfitMargin: 16.0,
      cashRatio: 0.78,
      payablesTurnover: 9.8,
      receivablesTurnover: 14.2
    },
    behavioralFeatures: {
      paymentHistory: 99.8,
      accountAge: 5.2,
      creditUtilization: 48,
      tradingFrequency: 55,
      volatilityScore: 1.1
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'automotive-systems',
    name: 'Automotive Systems Inc',
    exposure: 34000000,
    rating: 'BBB-',
    pd: 2.8,
    lgd: 38,
    expectedLoss: 361440,
    sector: 'Automotive',
    region: 'North America',
    utilization: 94,
    limit: 36000000,
    financialMetrics: {
      currentRatio: 1.6,
      debtToEquity: 0.70,
      returnOnEquity: 12.8,
      interestCoverage: 4.8,
      profitMargin: 6.0,
      assetTurnover: 0.94,
      quickRatio: 1.2,
      totalDebtRatio: 0.70,
      timesInterestEarned: 4.8,
      workingCapital: 12000000,
      grossProfitMargin: 19.8,
      netProfitMargin: 6.0,
      cashRatio: 0.35,
      payablesTurnover: 7.8,
      receivablesTurnover: 11.2
    },
    behavioralFeatures: {
      paymentHistory: 96.8,
      accountAge: 10.2,
      creditUtilization: 78,
      tradingFrequency: 40,
      volatilityScore: 3.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'logistics-express',
    name: 'Logistics Express Ltd',
    exposure: 19000000,
    rating: 'BB-',
    pd: 6.8,
    lgd: 48,
    expectedLoss: 620160,
    sector: 'Transportation',
    region: 'Europe',
    utilization: 86,
    limit: 22000000,
    financialMetrics: {
      currentRatio: 1.1,
      debtToEquity: 0.90,
      returnOnEquity: 11.2,
      interestCoverage: 2.1,
      profitMargin: 4.0,
      assetTurnover: 1.24,
      quickRatio: 0.8,
      totalDebtRatio: 0.90,
      timesInterestEarned: 2.1,
      workingCapital: 6000000,
      grossProfitMargin: 12.8,
      netProfitMargin: 4.0,
      cashRatio: 0.18,
      payablesTurnover: 5.8,
      receivablesTurnover: 8.2
    },
    behavioralFeatures: {
      paymentHistory: 92.5,
      accountAge: 8.8,
      creditUtilization: 95,
      tradingFrequency: 25,
      volatilityScore: 5.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'food-beverages',
    name: 'Food & Beverages Group',
    exposure: 29000000,
    rating: 'A-',
    pd: 1.6,
    lgd: 31,
    expectedLoss: 144160,
    sector: 'Food & Beverage',
    region: 'North America',
    utilization: 91,
    limit: 32000000,
    financialMetrics: {
      currentRatio: 1.9,
      debtToEquity: 0.55,
      returnOnEquity: 16.8,
      interestCoverage: 7.2,
      profitMargin: 10.0,
      assetTurnover: 1.07,
      quickRatio: 1.4,
      totalDebtRatio: 0.55,
      timesInterestEarned: 7.2,
      workingCapital: 18000000,
      grossProfitMargin: 28.5,
      netProfitMargin: 10.0,
      cashRatio: 0.48,
      payablesTurnover: 8.5,
      receivablesTurnover: 12.8
    },
    behavioralFeatures: {
      paymentHistory: 98.5,
      accountAge: 9.2,
      creditUtilization: 65,
      tradingFrequency: 48,
      volatilityScore: 2.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'telecom-networks',
    name: 'Telecom Networks PLC',
    exposure: 48000000,
    rating: 'BBB+',
    pd: 1.9,
    lgd: 33,
    expectedLoss: 301320,
    sector: 'Telecommunications',
    region: 'Europe',
    utilization: 96,
    limit: 50000000,
    financialMetrics: {
      currentRatio: 1.7,
      debtToEquity: 0.60,
      returnOnEquity: 11.4,
      interestCoverage: 5.9,
      profitMargin: 8.0,
      assetTurnover: 0.72,
      quickRatio: 1.3,
      totalDebtRatio: 0.60,
      timesInterestEarned: 5.9,
      workingCapital: 22000000,
      grossProfitMargin: 35.2,
      netProfitMargin: 8.0,
      cashRatio: 0.42,
      payablesTurnover: 7.8,
      receivablesTurnover: 10.5
    },
    behavioralFeatures: {
      paymentHistory: 97.8,
      accountAge: 12.8,
      creditUtilization: 75,
      tradingFrequency: 35,
      volatilityScore: 2.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'mining-resources',
    name: 'Mining Resources Corp',
    exposure: 56000000,
    rating: 'BB+',
    pd: 3.5,
    lgd: 41,
    expectedLoss: 803600,
    sector: 'Mining',
    region: 'Asia Pacific',
    utilization: 93,
    limit: 60000000,
    financialMetrics: {
      currentRatio: 1.3,
      debtToEquity: 0.70,
      returnOnEquity: 8.2,
      interestCoverage: 3.1,
      profitMargin: 5.0,
      assetTurnover: 0.59,
      quickRatio: 0.9,
      totalDebtRatio: 0.70,
      timesInterestEarned: 3.1,
      workingCapital: 18000000,
      grossProfitMargin: 22.8,
      netProfitMargin: 5.0,
      cashRatio: 0.25,
      payablesTurnover: 6.8,
      receivablesTurnover: 8.5
    },
    behavioralFeatures: {
      paymentHistory: 95.8,
      accountAge: 14.2,
      creditUtilization: 82,
      tradingFrequency: 28,
      volatilityScore: 4.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'chemicals-specialty',
    name: 'Specialty Chemicals Ltd',
    exposure: 24000000,
    rating: 'A',
    pd: 1.3,
    lgd: 29,
    expectedLoss: 90480,
    sector: 'Chemicals',
    region: 'Europe',
    utilization: 92,
    limit: 26000000,
    financialMetrics: {
      currentRatio: 2.1,
      debtToEquity: 0.45,
      returnOnEquity: 15.8,
      interestCoverage: 8.5,
      profitMargin: 12.0,
      assetTurnover: 0.81,
      quickRatio: 1.6,
      totalDebtRatio: 0.45,
      timesInterestEarned: 8.5,
      workingCapital: 15000000,
      grossProfitMargin: 32.5,
      netProfitMargin: 12.0,
      cashRatio: 0.58,
      payablesTurnover: 9.2,
      receivablesTurnover: 13.8
    },
    behavioralFeatures: {
      paymentHistory: 98.8,
      accountAge: 8.5,
      creditUtilization: 62,
      tradingFrequency: 48,
      volatilityScore: 1.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'real-estate-dev',
    name: 'Real Estate Developers',
    exposure: 42000000,
    rating: 'B',
    pd: 7.2,
    lgd: 52,
    expectedLoss: 1574400,
    sector: 'Real Estate',
    region: 'North America',
    utilization: 93,
    limit: 45000000,
    financialMetrics: {
      currentRatio: 0.9,
      debtToEquity: 0.94,
      returnOnEquity: 18.2,
      interestCoverage: 1.8,
      profitMargin: 5.0,
      assetTurnover: 0.76,
      quickRatio: 0.6,
      totalDebtRatio: 0.94,
      timesInterestEarned: 1.8,
      workingCapital: 5000000,
      grossProfitMargin: 15.2,
      netProfitMargin: 5.0,
      cashRatio: 0.15,
      payablesTurnover: 4.8,
      receivablesTurnover: 6.2
    },
    behavioralFeatures: {
      paymentHistory: 88.5,
      accountAge: 6.8,
      creditUtilization: 98,
      tradingFrequency: 18,
      volatilityScore: 6.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'aerospace-tech',
    name: 'Aerospace Technologies',
    exposure: 36000000,
    rating: 'A',
    pd: 1.1,
    lgd: 27,
    expectedLoss: 106920,
    sector: 'Aerospace',
    region: 'North America',
    utilization: 95,
    limit: 38000000,
    financialMetrics: {
      currentRatio: 2.2,
      debtToEquity: 0.45,
      returnOnEquity: 14.2,
      interestCoverage: 9.8,
      profitMargin: 10.0,
      assetTurnover: 0.87,
      quickRatio: 1.8,
      totalDebtRatio: 0.45,
      timesInterestEarned: 9.8,
      workingCapital: 25000000,
      grossProfitMargin: 28.8,
      netProfitMargin: 10.0,
      cashRatio: 0.62,
      payablesTurnover: 8.8,
      receivablesTurnover: 12.5
    },
    behavioralFeatures: {
      paymentHistory: 99.2,
      accountAge: 7.5,
      creditUtilization: 58,
      tradingFrequency: 52,
      volatilityScore: 1.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'textiles-apparel',
    name: 'Textiles & Apparel Co',
    exposure: 18000000,
    rating: 'BB',
    pd: 4.8,
    lgd: 44,
    expectedLoss: 380160,
    sector: 'Textiles',
    region: 'Asia Pacific',
    utilization: 90,
    limit: 20000000,
    financialMetrics: {
      currentRatio: 1.3,
      debtToEquity: 0.90,
      returnOnEquity: 14.2,
      interestCoverage: 2.9,
      profitMargin: 5.0,
      assetTurnover: 1.13,
      quickRatio: 0.9,
      totalDebtRatio: 0.90,
      timesInterestEarned: 2.9,
      workingCapital: 8000000,
      grossProfitMargin: 18.5,
      netProfitMargin: 5.0,
      cashRatio: 0.22,
      payablesTurnover: 6.8,
      receivablesTurnover: 9.2
    },
    behavioralFeatures: {
      paymentHistory: 93.8,
      accountAge: 11.8,
      creditUtilization: 88,
      tradingFrequency: 32,
      volatilityScore: 4.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'marine-shipping',
    name: 'Marine Shipping Lines',
    exposure: 31000000,
    rating: 'BBB',
    pd: 2.5,
    lgd: 36,
    expectedLoss: 279000,
    sector: 'Transportation',
    region: 'Europe',
    utilization: 94,
    limit: 33000000,
    financialMetrics: {
      currentRatio: 1.4,
      debtToEquity: 0.70,
      returnOnEquity: 10.8,
      interestCoverage: 4.2,
      profitMargin: 6.0,
      assetTurnover: 0.68,
      quickRatio: 1.1,
      totalDebtRatio: 0.70,
      timesInterestEarned: 4.2,
      workingCapital: 12000000,
      grossProfitMargin: 22.5,
      netProfitMargin: 6.0,
      cashRatio: 0.32,
      payablesTurnover: 7.2,
      receivablesTurnover: 9.8
    },
    behavioralFeatures: {
      paymentHistory: 96.2,
      accountAge: 13.5,
      creditUtilization: 78,
      tradingFrequency: 35,
      volatilityScore: 3.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'biotech-innovations',
    name: 'Biotech Innovations Inc',
    exposure: 25000000,
    rating: 'AA',
    pd: 0.7,
    lgd: 24,
    expectedLoss: 42000,
    sector: 'Biotechnology',
    region: 'North America',
    utilization: 89,
    limit: 28000000,
    financialMetrics: {
      currentRatio: 3.1,
      debtToEquity: 0.35,
      returnOnEquity: 15.1,
      interestCoverage: 14.2,
      profitMargin: 15.0,
      assetTurnover: 0.68,
      quickRatio: 2.8,
      totalDebtRatio: 0.35,
      timesInterestEarned: 14.2,
      workingCapital: 28000000,
      grossProfitMargin: 42.8,
      netProfitMargin: 15.0,
      cashRatio: 0.85,
      payablesTurnover: 10.8,
      receivablesTurnover: 15.2
    },
    behavioralFeatures: {
      paymentHistory: 99.8,
      accountAge: 4.8,
      creditUtilization: 38,
      tradingFrequency: 62,
      volatilityScore: 1.0
    },
    lastUpdated: new Date().toISOString()
  }
];

// Service functions
export class CustomerDataService {
  static getAllCustomers(): CustomerData[] {
    return customerDatabase.map((customer, index) => ({
      ...customer,
      portfolioRank: index + 1,
      sectorRank: this.getSectorRank(customer)
    }));
  }

  static getCustomerById(id: string): CustomerData | undefined {
    const customer = customerDatabase.find(c => c.id === id);
    if (customer) {
      return {
        ...customer,
        portfolioRank: this.getPortfolioRank(customer),
        sectorRank: this.getSectorRank(customer)
      };
    }
    return undefined;
  }

  static getCustomersBySector(sector: string): CustomerData[] {
    return customerDatabase.filter(c => c.sector === sector);
  }

  static getCustomersByRating(rating: string): CustomerData[] {
    return customerDatabase.filter(c => c.rating === rating);
  }

  static getSectorAverages(sector: string) {
    const sectorCustomers = this.getCustomersBySector(sector);
    if (sectorCustomers.length === 0) return null;

    const totals = sectorCustomers.reduce((acc, customer) => ({
      pd: acc.pd + customer.pd,
      utilization: acc.utilization + customer.utilization,
      currentRatio: acc.currentRatio + customer.financialMetrics.currentRatio,
      returnOnEquity: acc.returnOnEquity + customer.financialMetrics.returnOnEquity
    }), { pd: 0, utilization: 0, currentRatio: 0, returnOnEquity: 0 });

    const count = sectorCustomers.length;
    return {
      pd: totals.pd / count,
      utilization: totals.utilization / count,
      currentRatio: totals.currentRatio / count,
      returnOnEquity: totals.returnOnEquity / count
    };
  }

  private static getPortfolioRank(customer: CustomerData): number {
    const sorted = customerDatabase.sort((a, b) => b.exposure - a.exposure);
    return sorted.findIndex(c => c.id === customer.id) + 1;
  }

  private static getSectorRank(customer: CustomerData): number {
    const sectorCustomers = customerDatabase
      .filter(c => c.sector === customer.sector)
      .sort((a, b) => b.exposure - a.exposure);
    return sectorCustomers.findIndex(c => c.id === customer.id) + 1;
  }

  static getBenchmarkOptions() {
    const sectors = [...new Set(customerDatabase.map(c => c.sector))];
    const ratings = [...new Set(customerDatabase.map(c => c.rating))];
    const regions = [...new Set(customerDatabase.map(c => c.region))];

    return {
      sectors: sectors.map(sector => ({
        id: `sector-${sector.toLowerCase().replace(/\s+/g, '-')}`,
        name: `${sector} Average`,
        type: 'sector' as const,
        value: sector
      })),
      ratings: ratings.map(rating => ({
        id: `rating-${rating.toLowerCase()}`,
        name: `${rating} Rating Average`,
        type: 'rating' as const,
        value: rating
      })),
      regions: regions.map(region => ({
        id: `region-${region.toLowerCase().replace(/\s+/g, '-')}`,
        name: `${region} Average`,
        type: 'region' as const,
        value: region
      })),
      topPerformers: customerDatabase
        .sort((a, b) => b.financialMetrics.returnOnEquity - a.financialMetrics.returnOnEquity)
        .slice(0, 3)
        .map(customer => ({
          id: customer.id,
          name: customer.name,
          type: 'customer' as const,
          value: customer.id
        }))
    };
  }
}
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
    exposure: 4000000,
    rating: 'BBB',
    pd: 1.2,
    lgd: 40,
    expectedLoss: 19200,
    sector: 'Technology',
    region: 'North America',
    utilization: 75,
    limit: 5000000,
    financialMetrics: {
      currentRatio: 2.1,
      debtToEquity: 0.45,
      returnOnEquity: 12.5,
      interestCoverage: 4.2,
      profitMargin: 8.5,
      assetTurnover: 1.2,
      quickRatio: 1.8,
      totalDebtRatio: 0.31,
      timesInterestEarned: 4.2,
      workingCapital: 2500000,
      grossProfitMargin: 35.2,
      netProfitMargin: 8.5,
      cashRatio: 0.9,
      payablesTurnover: 8.2,
      receivablesTurnover: 12.1
    },
    behavioralFeatures: {
      paymentHistory: 95,
      accountAge: 48,
      creditUtilization: 75,
      tradingFrequency: 8.5,
      volatilityScore: 2.1
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'abc-industries',
    name: 'ABC Industries Ltd',
    exposure: 2500000,
    rating: 'A',
    pd: 0.8,
    lgd: 35,
    expectedLoss: 7000,
    sector: 'Manufacturing',
    region: 'Europe',
    utilization: 60,
    limit: 3000000,
    financialMetrics: {
      currentRatio: 2.8,
      debtToEquity: 0.32,
      returnOnEquity: 15.2,
      interestCoverage: 6.1,
      profitMargin: 12.1,
      assetTurnover: 1.5,
      quickRatio: 2.1,
      totalDebtRatio: 0.24,
      timesInterestEarned: 6.1,
      workingCapital: 3200000,
      grossProfitMargin: 28.5,
      netProfitMargin: 12.1,
      cashRatio: 1.2,
      payablesTurnover: 9.8,
      receivablesTurnover: 15.3
    },
    behavioralFeatures: {
      paymentHistory: 98,
      accountAge: 62,
      creditUtilization: 60,
      tradingFrequency: 12.3,
      volatilityScore: 1.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'telecom-networks',
    name: 'Telecom Networks Inc',
    exposure: 3500000,
    rating: 'BBB+',
    pd: 1.0,
    lgd: 38,
    expectedLoss: 13300,
    sector: 'Telecommunications',
    region: 'North America',
    utilization: 70,
    limit: 4000000,
    financialMetrics: {
      currentRatio: 1.9,
      debtToEquity: 0.52,
      returnOnEquity: 11.8,
      interestCoverage: 3.8,
      profitMargin: 9.2,
      assetTurnover: 1.1,
      quickRatio: 1.6,
      totalDebtRatio: 0.34,
      timesInterestEarned: 3.8,
      workingCapital: 1800000,
      grossProfitMargin: 42.1,
      netProfitMargin: 9.2,
      cashRatio: 0.8,
      payablesTurnover: 7.5,
      receivablesTurnover: 10.2
    },
    behavioralFeatures: {
      paymentHistory: 92,
      accountAge: 36,
      creditUtilization: 70,
      tradingFrequency: 6.8,
      volatilityScore: 2.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'global-retail',
    name: 'Global Retail Group',
    exposure: 1800000,
    rating: 'BB+',
    pd: 2.5,
    lgd: 45,
    expectedLoss: 20250,
    sector: 'Retail',
    region: 'Asia Pacific',
    utilization: 85,
    limit: 2200000,
    financialMetrics: {
      currentRatio: 1.5,
      debtToEquity: 0.68,
      returnOnEquity: 9.2,
      interestCoverage: 2.8,
      profitMargin: 5.5,
      assetTurnover: 2.1,
      quickRatio: 1.2,
      totalDebtRatio: 0.42,
      timesInterestEarned: 2.8,
      workingCapital: 1200000,
      grossProfitMargin: 18.5,
      netProfitMargin: 5.5,
      cashRatio: 0.6,
      payablesTurnover: 12.5,
      receivablesTurnover: 18.2
    },
    behavioralFeatures: {
      paymentHistory: 88,
      accountAge: 28,
      creditUtilization: 85,
      tradingFrequency: 15.2,
      volatilityScore: 3.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'energy-solutions',
    name: 'Energy Solutions Inc',
    exposure: 5200000,
    rating: 'A-',
    pd: 1.1,
    lgd: 42,
    expectedLoss: 24024,
    sector: 'Energy',
    region: 'North America',
    utilization: 65,
    limit: 6500000,
    financialMetrics: {
      currentRatio: 2.3,
      debtToEquity: 0.55,
      returnOnEquity: 13.8,
      interestCoverage: 4.5,
      profitMargin: 11.2,
      assetTurnover: 0.9,
      quickRatio: 1.9,
      totalDebtRatio: 0.36,
      timesInterestEarned: 4.5,
      workingCapital: 3800000,
      grossProfitMargin: 32.1,
      netProfitMargin: 11.2,
      cashRatio: 1.1,
      payablesTurnover: 6.8,
      receivablesTurnover: 9.5
    },
    behavioralFeatures: {
      paymentHistory: 96,
      accountAge: 55,
      creditUtilization: 65,
      tradingFrequency: 7.2,
      volatilityScore: 2.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'healthcare-systems',
    name: 'Healthcare Systems Ltd',
    exposure: 3200000,
    rating: 'AA-',
    pd: 0.6,
    lgd: 30,
    expectedLoss: 5760,
    sector: 'Healthcare',
    region: 'Europe',
    utilization: 55,
    limit: 4000000,
    financialMetrics: {
      currentRatio: 3.1,
      debtToEquity: 0.28,
      returnOnEquity: 16.5,
      interestCoverage: 7.2,
      profitMargin: 14.8,
      assetTurnover: 1.3,
      quickRatio: 2.8,
      totalDebtRatio: 0.22,
      timesInterestEarned: 7.2,
      workingCapital: 4100000,
      grossProfitMargin: 45.2,
      netProfitMargin: 14.8,
      cashRatio: 1.5,
      payablesTurnover: 8.9,
      receivablesTurnover: 11.8
    },
    behavioralFeatures: {
      paymentHistory: 99,
      accountAge: 72,
      creditUtilization: 55,
      tradingFrequency: 5.8,
      volatilityScore: 1.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'construction-corp',
    name: 'Construction Corp',
    exposure: 2800000,
    rating: 'BBB-',
    pd: 1.8,
    lgd: 50,
    expectedLoss: 25200,
    sector: 'Construction',
    region: 'North America',
    utilization: 90,
    limit: 3100000,
    financialMetrics: {
      currentRatio: 1.4,
      debtToEquity: 0.75,
      returnOnEquity: 8.5,
      interestCoverage: 2.5,
      profitMargin: 4.2,
      assetTurnover: 1.8,
      quickRatio: 1.1,
      totalDebtRatio: 0.43,
      timesInterestEarned: 2.5,
      workingCapital: 950000,
      grossProfitMargin: 15.8,
      netProfitMargin: 4.2,
      cashRatio: 0.5,
      payablesTurnover: 14.2,
      receivablesTurnover: 8.5
    },
    behavioralFeatures: {
      paymentHistory: 85,
      accountAge: 32,
      creditUtilization: 90,
      tradingFrequency: 11.5,
      volatilityScore: 4.1
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'automotive-parts',
    name: 'Automotive Parts Co',
    exposure: 1500000,
    rating: 'BB',
    pd: 3.2,
    lgd: 48,
    expectedLoss: 23040,
    sector: 'Automotive',
    region: 'Asia Pacific',
    utilization: 80,
    limit: 1800000,
    financialMetrics: {
      currentRatio: 1.6,
      debtToEquity: 0.82,
      returnOnEquity: 7.8,
      interestCoverage: 2.2,
      profitMargin: 3.8,
      assetTurnover: 2.5,
      quickRatio: 1.3,
      totalDebtRatio: 0.45,
      timesInterestEarned: 2.2,
      workingCapital: 720000,
      grossProfitMargin: 12.5,
      netProfitMargin: 3.8,
      cashRatio: 0.4,
      payablesTurnover: 16.8,
      receivablesTurnover: 22.1
    },
    behavioralFeatures: {
      paymentHistory: 82,
      accountAge: 24,
      creditUtilization: 80,
      tradingFrequency: 18.5,
      volatilityScore: 4.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'financial-services',
    name: 'Financial Services Group',
    exposure: 4800000,
    rating: 'A+',
    pd: 0.7,
    lgd: 35,
    expectedLoss: 11760,
    sector: 'Financial Services',
    region: 'Europe',
    utilization: 68,
    limit: 5500000,
    financialMetrics: {
      currentRatio: 2.5,
      debtToEquity: 0.38,
      returnOnEquity: 14.2,
      interestCoverage: 5.8,
      profitMargin: 13.5,
      assetTurnover: 1.1,
      quickRatio: 2.2,
      totalDebtRatio: 0.28,
      timesInterestEarned: 5.8,
      workingCapital: 3600000,
      grossProfitMargin: 38.5,
      netProfitMargin: 13.5,
      cashRatio: 1.3,
      payablesTurnover: 7.2,
      receivablesTurnover: 13.8
    },
    behavioralFeatures: {
      paymentHistory: 97,
      accountAge: 68,
      creditUtilization: 68,
      tradingFrequency: 9.2,
      volatilityScore: 1.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'agriculture-foods',
    name: 'Agriculture Foods Ltd',
    exposure: 2100000,
    rating: 'BBB',
    pd: 1.5,
    lgd: 40,
    expectedLoss: 12600,
    sector: 'Agriculture',
    region: 'South America',
    utilization: 72,
    limit: 2600000,
    financialMetrics: {
      currentRatio: 1.8,
      debtToEquity: 0.58,
      returnOnEquity: 10.5,
      interestCoverage: 3.5,
      profitMargin: 7.2,
      assetTurnover: 1.6,
      quickRatio: 1.4,
      totalDebtRatio: 0.37,
      timesInterestEarned: 3.5,
      workingCapital: 1850000,
      grossProfitMargin: 22.8,
      netProfitMargin: 7.2,
      cashRatio: 0.8,
      payablesTurnover: 10.5,
      receivablesTurnover: 14.2
    },
    behavioralFeatures: {
      paymentHistory: 91,
      accountAge: 45,
      creditUtilization: 72,
      tradingFrequency: 8.8,
      volatilityScore: 2.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'textile-manufacturing',
    name: 'Textile Manufacturing Inc',
    exposure: 1200000,
    rating: 'B+',
    pd: 4.5,
    lgd: 55,
    expectedLoss: 29700,
    sector: 'Textiles',
    region: 'Asia Pacific',
    utilization: 95,
    limit: 1300000,
    financialMetrics: {
      currentRatio: 1.2,
      debtToEquity: 0.95,
      returnOnEquity: 6.2,
      interestCoverage: 1.8,
      profitMargin: 2.5,
      assetTurnover: 2.8,
      quickRatio: 0.9,
      totalDebtRatio: 0.49,
      timesInterestEarned: 1.8,
      workingCapital: 480000,
      grossProfitMargin: 8.5,
      netProfitMargin: 2.5,
      cashRatio: 0.3,
      payablesTurnover: 18.5,
      receivablesTurnover: 25.2
    },
    behavioralFeatures: {
      paymentHistory: 78,
      accountAge: 18,
      creditUtilization: 95,
      tradingFrequency: 22.5,
      volatilityScore: 5.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'pharmaceutical-research',
    name: 'Pharmaceutical Research Corp',
    exposure: 3800000,
    rating: 'A',
    pd: 0.9,
    lgd: 32,
    expectedLoss: 10944,
    sector: 'Pharmaceuticals',
    region: 'North America',
    utilization: 58,
    limit: 4600000,
    financialMetrics: {
      currentRatio: 2.9,
      debtToEquity: 0.35,
      returnOnEquity: 15.8,
      interestCoverage: 6.5,
      profitMargin: 18.2,
      assetTurnover: 0.8,
      quickRatio: 2.6,
      totalDebtRatio: 0.26,
      timesInterestEarned: 6.5,
      workingCapital: 4200000,
      grossProfitMargin: 68.5,
      netProfitMargin: 18.2,
      cashRatio: 1.8,
      payablesTurnover: 5.2,
      receivablesTurnover: 7.8
    },
    behavioralFeatures: {
      paymentHistory: 98,
      accountAge: 85,
      creditUtilization: 58,
      tradingFrequency: 4.2,
      volatilityScore: 1.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'logistics-transport',
    name: 'Logistics & Transport Ltd',
    exposure: 2600000,
    rating: 'BBB+',
    pd: 1.3,
    lgd: 42,
    expectedLoss: 14196,
    sector: 'Transportation',
    region: 'Europe',
    utilization: 78,
    limit: 3200000,
    financialMetrics: {
      currentRatio: 1.7,
      debtToEquity: 0.62,
      returnOnEquity: 9.8,
      interestCoverage: 3.2,
      profitMargin: 6.5,
      assetTurnover: 1.9,
      quickRatio: 1.5,
      totalDebtRatio: 0.38,
      timesInterestEarned: 3.2,
      workingCapital: 1550000,
      grossProfitMargin: 18.2,
      netProfitMargin: 6.5,
      cashRatio: 0.7,
      payablesTurnover: 11.8,
      receivablesTurnover: 16.5
    },
    behavioralFeatures: {
      paymentHistory: 89,
      accountAge: 38,
      creditUtilization: 78,
      tradingFrequency: 12.8,
      volatilityScore: 3.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'mining-resources',
    name: 'Mining Resources Group',
    exposure: 4500000,
    rating: 'BB+',
    pd: 2.8,
    lgd: 52,
    expectedLoss: 65520,
    sector: 'Mining',
    region: 'South America',
    utilization: 82,
    limit: 5200000,
    financialMetrics: {
      currentRatio: 1.6,
      debtToEquity: 0.78,
      returnOnEquity: 8.2,
      interestCoverage: 2.1,
      profitMargin: 5.8,
      assetTurnover: 1.4,
      quickRatio: 1.2,
      totalDebtRatio: 0.44,
      timesInterestEarned: 2.1,
      workingCapital: 2100000,
      grossProfitMargin: 25.5,
      netProfitMargin: 5.8,
      cashRatio: 0.6,
      payablesTurnover: 8.5,
      receivablesTurnover: 11.2
    },
    behavioralFeatures: {
      paymentHistory: 84,
      accountAge: 42,
      creditUtilization: 82,
      tradingFrequency: 9.5,
      volatilityScore: 4.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'hospitality-hotels',
    name: 'Hospitality Hotels Chain',
    exposure: 1900000,
    rating: 'B',
    pd: 5.2,
    lgd: 58,
    expectedLoss: 57304,
    sector: 'Hospitality',
    region: 'Europe',
    utilization: 88,
    limit: 2100000,
    financialMetrics: {
      currentRatio: 1.1,
      debtToEquity: 1.15,
      returnOnEquity: 4.5,
      interestCoverage: 1.5,
      profitMargin: 1.8,
      assetTurnover: 2.2,
      quickRatio: 0.8,
      totalDebtRatio: 0.53,
      timesInterestEarned: 1.5,
      workingCapital: 380000,
      grossProfitMargin: 12.5,
      netProfitMargin: 1.8,
      cashRatio: 0.2,
      payablesTurnover: 20.5,
      receivablesTurnover: 28.8
    },
    behavioralFeatures: {
      paymentHistory: 72,
      accountAge: 15,
      creditUtilization: 88,
      tradingFrequency: 25.8,
      volatilityScore: 6.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'aerospace-defense',
    name: 'Aerospace & Defense Corp',
    exposure: 6200000,
    rating: 'A-',
    pd: 1.0,
    lgd: 36,
    expectedLoss: 22320,
    sector: 'Aerospace',
    region: 'North America',
    utilization: 62,
    limit: 7500000,
    financialMetrics: {
      currentRatio: 2.4,
      debtToEquity: 0.48,
      returnOnEquity: 12.8,
      interestCoverage: 4.8,
      profitMargin: 9.5,
      assetTurnover: 1.0,
      quickRatio: 2.0,
      totalDebtRatio: 0.32,
      timesInterestEarned: 4.8,
      workingCapital: 3900000,
      grossProfitMargin: 28.5,
      netProfitMargin: 9.5,
      cashRatio: 1.2,
      payablesTurnover: 6.8,
      receivablesTurnover: 8.2
    },
    behavioralFeatures: {
      paymentHistory: 95,
      accountAge: 78,
      creditUtilization: 62,
      tradingFrequency: 5.5,
      volatilityScore: 2.0
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'chemical-processing',
    name: 'Chemical Processing Ltd',
    exposure: 3100000,
    rating: 'BBB',
    pd: 1.6,
    lgd: 44,
    expectedLoss: 21824,
    sector: 'Chemicals',
    region: 'Europe',
    utilization: 74,
    limit: 3800000,
    financialMetrics: {
      currentRatio: 1.9,
      debtToEquity: 0.56,
      returnOnEquity: 11.2,
      interestCoverage: 3.8,
      profitMargin: 8.8,
      assetTurnover: 1.7,
      quickRatio: 1.6,
      totalDebtRatio: 0.36,
      timesInterestEarned: 3.8,
      workingCapital: 2250000,
      grossProfitMargin: 24.5,
      netProfitMargin: 8.8,
      cashRatio: 0.9,
      payablesTurnover: 9.5,
      receivablesTurnover: 13.2
    },
    behavioralFeatures: {
      paymentHistory: 90,
      accountAge: 52,
      creditUtilization: 74,
      tradingFrequency: 10.2,
      volatilityScore: 2.9
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'media-entertainment',
    name: 'Media & Entertainment Group',
    exposure: 2300000,
    rating: 'BB',
    pd: 3.8,
    lgd: 48,
    expectedLoss: 41904,
    sector: 'Media',
    region: 'North America',
    utilization: 85,
    limit: 2700000,
    financialMetrics: {
      currentRatio: 1.3,
      debtToEquity: 0.88,
      returnOnEquity: 7.5,
      interestCoverage: 2.3,
      profitMargin: 4.2,
      assetTurnover: 2.3,
      quickRatio: 1.1,
      totalDebtRatio: 0.47,
      timesInterestEarned: 2.3,
      workingCapital: 850000,
      grossProfitMargin: 15.8,
      netProfitMargin: 4.2,
      cashRatio: 0.5,
      payablesTurnover: 15.2,
      receivablesTurnover: 19.5
    },
    behavioralFeatures: {
      paymentHistory: 81,
      accountAge: 28,
      creditUtilization: 85,
      tradingFrequency: 16.8,
      volatilityScore: 4.2
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'renewable-energy',
    name: 'Renewable Energy Solutions',
    exposure: 2900000,
    rating: 'BBB+',
    pd: 1.4,
    lgd: 40,
    expectedLoss: 16240,
    sector: 'Renewable Energy',
    region: 'Europe',
    utilization: 69,
    limit: 3500000,
    financialMetrics: {
      currentRatio: 2.0,
      debtToEquity: 0.52,
      returnOnEquity: 10.8,
      interestCoverage: 3.6,
      profitMargin: 7.8,
      assetTurnover: 1.4,
      quickRatio: 1.7,
      totalDebtRatio: 0.34,
      timesInterestEarned: 3.6,
      workingCapital: 2200000,
      grossProfitMargin: 26.5,
      netProfitMargin: 7.8,
      cashRatio: 1.0,
      payablesTurnover: 8.8,
      receivablesTurnover: 12.5
    },
    behavioralFeatures: {
      paymentHistory: 93,
      accountAge: 35,
      creditUtilization: 69,
      tradingFrequency: 7.8,
      volatilityScore: 2.5
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage Corp',
    exposure: 2400000,
    rating: 'A-',
    pd: 1.1,
    lgd: 38,
    expectedLoss: 10032,
    sector: 'Food & Beverage',
    region: 'North America',
    utilization: 66,
    limit: 3000000,
    financialMetrics: {
      currentRatio: 2.2,
      debtToEquity: 0.42,
      returnOnEquity: 13.5,
      interestCoverage: 5.2,
      profitMargin: 10.2,
      assetTurnover: 1.8,
      quickRatio: 1.9,
      totalDebtRatio: 0.30,
      timesInterestEarned: 5.2,
      workingCapital: 2800000,
      grossProfitMargin: 31.5,
      netProfitMargin: 10.2,
      cashRatio: 1.1,
      payablesTurnover: 10.8,
      receivablesTurnover: 16.2
    },
    behavioralFeatures: {
      paymentHistory: 96,
      accountAge: 58,
      creditUtilization: 66,
      tradingFrequency: 9.5,
      volatilityScore: 1.9
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'real-estate-development',
    name: 'Real Estate Development Ltd',
    exposure: 3400000,
    rating: 'BBB-',
    pd: 2.2,
    lgd: 55,
    expectedLoss: 41140,
    sector: 'Real Estate',
    region: 'Asia Pacific',
    utilization: 83,
    limit: 4000000,
    financialMetrics: {
      currentRatio: 1.4,
      debtToEquity: 0.85,
      returnOnEquity: 8.8,
      interestCoverage: 2.6,
      profitMargin: 6.2,
      assetTurnover: 1.2,
      quickRatio: 1.1,
      totalDebtRatio: 0.46,
      timesInterestEarned: 2.6,
      workingCapital: 1650000,
      grossProfitMargin: 20.5,
      netProfitMargin: 6.2,
      cashRatio: 0.7,
      payablesTurnover: 12.5,
      receivablesTurnover: 8.8
    },
    behavioralFeatures: {
      paymentHistory: 86,
      accountAge: 22,
      creditUtilization: 83,
      tradingFrequency: 6.5,
      volatilityScore: 3.8
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'software-services',
    name: 'Software Services Group',
    exposure: 1700000,
    rating: 'A',
    pd: 0.9,
    lgd: 32,
    expectedLoss: 4896,
    sector: 'Software',
    region: 'North America',
    utilization: 52,
    limit: 2200000,
    financialMetrics: {
      currentRatio: 3.5,
      debtToEquity: 0.25,
      returnOnEquity: 18.5,
      interestCoverage: 8.2,
      profitMargin: 22.5,
      assetTurnover: 1.6,
      quickRatio: 3.2,
      totalDebtRatio: 0.20,
      timesInterestEarned: 8.2,
      workingCapital: 2450000,
      grossProfitMargin: 75.5,
      netProfitMargin: 22.5,
      cashRatio: 2.1,
      payablesTurnover: 4.5,
      receivablesTurnover: 8.8
    },
    behavioralFeatures: {
      paymentHistory: 99,
      accountAge: 42,
      creditUtilization: 52,
      tradingFrequency: 3.5,
      volatilityScore: 1.1
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
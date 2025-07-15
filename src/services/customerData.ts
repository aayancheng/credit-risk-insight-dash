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
  }
  // ... rest of customers would be added here
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
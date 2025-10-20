import { defaultSampleClients, generateSampleClients } from './sampleData';
import { CustomerData } from './types';

const customerDatabase: CustomerData[] = defaultSampleClients;

export class CustomerDataService {
  static getAllCustomers(): CustomerData[] {
    const sortedByExposure = [...customerDatabase].sort((a, b) => b.exposure - a.exposure);
    const exposureRanks = new Map(sortedByExposure.map((customer, index) => [customer.id, index + 1]));

    return customerDatabase.map(customer => ({
      ...customer,
      portfolioRank: exposureRanks.get(customer.id),
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

    const totals = sectorCustomers.reduce(
      (acc, customer) => ({
        pd: acc.pd + customer.pd,
        utilization: acc.utilization + customer.utilization,
        currentRatio: acc.currentRatio + customer.financialMetrics.currentRatio,
        returnOnEquity: acc.returnOnEquity + customer.financialMetrics.returnOnEquity
      }),
      { pd: 0, utilization: 0, currentRatio: 0, returnOnEquity: 0 }
    );

    const count = sectorCustomers.length;
    return {
      pd: totals.pd / count,
      utilization: totals.utilization / count,
      currentRatio: totals.currentRatio / count,
      returnOnEquity: totals.returnOnEquity / count
    };
  }

  private static getPortfolioRank(customer: CustomerData): number {
    const sorted = [...customerDatabase].sort((a, b) => b.exposure - a.exposure);
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
      topPerformers: [...customerDatabase]
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

export function regenerateCustomerDatabase(count = 100, seed?: string) {
  const clients = generateSampleClients(count, seed);
  customerDatabase.splice(0, customerDatabase.length, ...clients);
}

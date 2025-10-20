import { CustomerData } from './types';

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createRng(seed: string) {
  return mulberry32(xmur3(seed)());
}

function randomItem<T>(items: readonly T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

function randomNumber(min: number, max: number, rng: () => number, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round((min + rng() * (max - min)) * factor) / factor;
}

function roundCurrency(value: number) {
  return Math.round(value / 1000) * 1000;
}

const SECTORS = [
  'Manufacturing',
  'Technology',
  'Services',
  'Energy',
  'Retail',
  'Financial',
  'Construction',
  'Healthcare',
  'Automotive',
  'Transportation',
  'Agriculture',
  'Telecommunications',
  'Mining',
  'Chemicals',
  'Real Estate',
  'Aerospace',
  'Textiles',
  'Hospitality',
  'Pharmaceuticals',
  'Logistics'
] as const;

const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'] as const;

const RATINGS = [
  'AAA',
  'AA+',
  'AA',
  'AA-',
  'A+',
  'A',
  'A-',
  'BBB+',
  'BBB',
  'BBB-',
  'BB+',
  'BB',
  'BB-',
  'B+',
  'B',
  'B-',
  'CCC+'
] as const;

const RATING_PD_RANGE: Record<(typeof RATINGS)[number], [number, number]> = {
  AAA: [0.1, 0.4],
  'AA+': [0.2, 0.6],
  AA: [0.3, 0.8],
  'AA-': [0.5, 1.1],
  'A+': [0.6, 1.3],
  A: [0.8, 1.6],
  'A-': [1.0, 1.9],
  'BBB+': [1.2, 2.4],
  BBB: [1.5, 3.0],
  'BBB-': [2.0, 4.0],
  'BB+': [2.8, 5.2],
  BB: [3.5, 6.0],
  'BB-': [4.2, 6.8],
  'B+': [5.5, 8.0],
  B: [6.5, 9.5],
  'B-': [7.5, 11.0],
  'CCC+': [9.0, 13.0]
};

export function generateSampleClients(count = 100, seed = 'credit-risk-insight-dash-demo'): CustomerData[] {
  const rng = createRng(seed);
  const clients: CustomerData[] = [];

  for (let i = 1; i <= count; i++) {
    const sector = randomItem(SECTORS, rng);
    const region = randomItem(REGIONS, rng);
    const rating = randomItem(RATINGS, rng);
    const [pdMin, pdMax] = RATING_PD_RANGE[rating];
    const pd = randomNumber(pdMin, pdMax, rng, 2);
    const exposure = roundCurrency(randomNumber(8, 75, rng, 4) * 1_000_000);
    const limit = roundCurrency(exposure * randomNumber(1.05, 1.35, rng, 3));
    const lgd = randomNumber(20, 55, rng, 1);
    const expectedLoss = Math.round(exposure * (pd / 100) * (lgd / 100));
    const utilization = randomNumber(60, 98, rng, 1);

    const financialMetrics = {
      currentRatio: randomNumber(0.8, 3.5, rng, 2),
      debtToEquity: randomNumber(0.2, 1.5, rng, 2),
      returnOnEquity: randomNumber(4, 24, rng, 2),
      interestCoverage: randomNumber(1, 15, rng, 2),
      profitMargin: randomNumber(2, 18, rng, 2),
      assetTurnover: randomNumber(0.3, 1.6, rng, 2),
      quickRatio: randomNumber(0.4, 3.0, rng, 2),
      totalDebtRatio: randomNumber(0.2, 1.2, rng, 2),
      timesInterestEarned: randomNumber(1, 12, rng, 2),
      workingCapital: roundCurrency(randomNumber(2, 35, rng, 3) * 1_000_000),
      grossProfitMargin: randomNumber(10, 55, rng, 2),
      netProfitMargin: randomNumber(3, 20, rng, 2),
      cashRatio: randomNumber(0.1, 1.2, rng, 2),
      payablesTurnover: randomNumber(3, 14, rng, 2),
      receivablesTurnover: randomNumber(5, 18, rng, 2)
    } as CustomerData['financialMetrics'];

    const behavioralFeatures = {
      paymentHistory: randomNumber(85, 100, rng, 2),
      accountAge: randomNumber(1, 18, rng, 2),
      creditUtilization: randomNumber(40, 99, rng, 1),
      tradingFrequency: Math.round(randomNumber(10, 70, rng, 0)),
      volatilityScore: randomNumber(1, 7, rng, 2)
    } as CustomerData['behavioralFeatures'];

    clients.push({
      id: `client-${i.toString().padStart(3, '0')}`,
      name: `${sector} Client ${i.toString().padStart(3, '0')}`,
      exposure,
      rating,
      pd,
      lgd,
      expectedLoss,
      sector,
      region,
      utilization,
      limit,
      financialMetrics,
      behavioralFeatures,
      lastUpdated: new Date(Date.UTC(2024, 0, (i % 28) + 1)).toISOString()
    });
  }

  return clients;
}

export const defaultSampleClients = generateSampleClients();

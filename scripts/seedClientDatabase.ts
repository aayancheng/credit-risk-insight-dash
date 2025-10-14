import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultSampleClients } from '../src/services/sampleData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'client_data.db');
if (fs.existsSync(dbPath)) {
  fs.rmSync(dbPath);
}

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    exposure REAL NOT NULL,
    rating TEXT NOT NULL,
    pd REAL NOT NULL,
    lgd REAL NOT NULL,
    expected_loss REAL NOT NULL,
    sector TEXT NOT NULL,
    region TEXT NOT NULL,
    utilization REAL NOT NULL,
    limit_value REAL NOT NULL,
    financial_metrics TEXT NOT NULL,
    behavioral_features TEXT NOT NULL,
    last_updated TEXT NOT NULL
  );
`);

const insert = db.prepare(`
  INSERT INTO clients (
    id,
    name,
    exposure,
    rating,
    pd,
    lgd,
    expected_loss,
    sector,
    region,
    utilization,
    limit_value,
    financial_metrics,
    behavioral_features,
    last_updated
  ) VALUES (
    @id,
    @name,
    @exposure,
    @rating,
    @pd,
    @lgd,
    @expectedLoss,
    @sector,
    @region,
    @utilization,
    @limit,
    @financialMetrics,
    @behavioralFeatures,
    @lastUpdated
  );
`);

for (const client of defaultSampleClients) {
  insert.run({
    ...client,
    expectedLoss: client.expectedLoss,
    limit: client.limit,
    financialMetrics: JSON.stringify(client.financialMetrics),
    behavioralFeatures: JSON.stringify(client.behavioralFeatures)
  });
}

db.close();

console.log(`Seeded ${defaultSampleClients.length} clients to ${dbPath}`);

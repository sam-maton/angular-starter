import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import * as path from 'node:path';
import * as fs from 'node:fs';

const dbPath =
  process.env.SQLITE_DB_PATH ||
  path.resolve(process.cwd(), 'apps/api/data/sqlite.db');

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

export type DrizzleDb = typeof db;

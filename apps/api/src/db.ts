import { Pool } from 'pg';
import dotenv from 'dotenv';

if (!process.env.VERCEL) {
  dotenv.config();
}

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    'DATABASE_URL is not set. Add it in Vercel (API project) and/or your local .env'
  );
}

declare global {
  var __pgPool: Pool | undefined;
}

const isLocal = /localhost|127\.0\.0\.1/.test(url);

const pool =
  global.__pgPool ??
  new Pool({
    connectionString: url,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });

if (!global.__pgPool) {
  global.__pgPool = pool;
}

export default pool;
export { pool };

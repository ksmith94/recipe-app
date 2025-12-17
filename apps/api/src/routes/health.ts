import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../db.js';

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const url = process.env.DATABASE_URL || '';
    // mask secrets; show only host indicator
    const hostHint = url.includes('pooler.neon.tech')
      ? 'neon'
      : url.includes('localhost') || url.includes('127.0.0.1')
        ? 'localhost'
        : url
          ? 'other'
          : 'missing';

    const { rows } = await pool.query('SELECT 1 AS ok');
    res.status(200).json({
      env: { databaseUrl: hostHint },
      db: rows[0].ok === 1 ? 'up' : 'unknown',
    });
  } catch (e: any) {
    console.error('HEALTH_ERROR', e);
    res.status(500).json({ error: String(e?.message || e) });
  }
}

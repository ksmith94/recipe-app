import { Router } from 'express';
import camelcaseKeys from 'camelcase-keys';
import db from '../db.js';
import { Ingredient } from '@repo/contracts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const result = await db.query('SELECT * FROM ingredients;');
    const ingredients: Ingredient[] = camelcaseKeys(result.rows, {
      deep: true,
    });
    res.json(ingredients);
  } catch (err) {
    console.error('Error fetching ingredients: ', err);
    res.status(500).json({ error: 'Internal services error' });
  }
});

export default router;

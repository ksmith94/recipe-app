import { Router } from 'express';
import { Recipe } from '../../shared/types';
import camelcaseKeys from 'camelcase-keys';
import db from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipes;');
    const recipes: Recipe[] = camelcaseKeys(result.rows, { deep: true });
    res.json(recipes);
  } catch (err) {
    console.error('Error querying recipes: ', err);
    res.status(500).json({ error: 'Internal services error' });
  }
});

export default router;

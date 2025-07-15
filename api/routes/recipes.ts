import express from 'express';
import { Recipe } from '../../shared/types';
import camelcaseKeys from 'camelcase-keys';

const router = express.Router();
const db = require('../db');

router.get('/', async (_req, res) => {
  try {
    const result = await db.query('SELECT * FROM recipes;');
    const recipes: Recipe[] = camelcaseKeys(result.rows, {deep: true})
    res.json(recipes);
  } catch (err) {
    console.error('Error querying recipes: ', err);
    res.status(500).json({error: 'Internal services error'});
  }
})

module.exports = router;

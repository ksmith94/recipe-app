import express from 'express';
import { Ingredient } from '../../shared/types';
import camelcaseKeys from 'camelcase-keys'

const router = express.Router();
const db = require('../db');


router.get('/', async (_req, res) => {
  try {
    const result = await db.query('SELECT * FROM ingredients;');
    const ingredients: Ingredient[] = camelcaseKeys(result.rows, {deep: true});
    res.json(ingredients);
  } catch (err) {
    console.error('Error fetching ingredients: ', err);
    res.status(500).json({error: 'Internal services error'});
  }
});

module.exports = router;

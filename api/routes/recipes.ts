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

router.post('/', async (req, res) => {
  const {
    title,
    description,
    servings,
    prepTime,
    cookTime,
    effortLevel,
    ingredients,
    instructions,
    tags
  } = req.body;

  try {
    const result = await db.query(
      `
        INSERT INTO recipes
          (title, description, servings, prepTime, cookTime, effortLevel, ingredients, instructions, tags)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `,
      [
        title,
        description,
        servings,
        prepTime,
        cookTime,
        effortLevel,
        ingredients,
        instructions,
        tags
      ]

    )
    const createdRecipe: Recipe = camelcaseKeys(result.rows[0], {deep: true});
    res.status(201).json(createdRecipe);
  } catch (err) {
    console.error('Error creating recipe: ', err);
    res.status(500).json({error: 'Failed to create recipe'});
  }
})

export default router;

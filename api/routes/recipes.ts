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
  const client = await db.connect();

  
  try {
    await client.query('BEGIN');

    const {
      title,
      description,
      servings,
      prepTime,
      cookTime,
      effortLevel,
      ingredients,
      instructions,
    } = req.body;

    const recipeResult = await client.query(
      `
        INSERT INTO recipes
          (title, description, servings, prep_time, cook_time, effort_level)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING id;
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
      ]
    )
    const recipeId = recipeResult.rows[0].id;

    for (const ingredient of ingredients) {
      const { name, quantity, unit, display } = ingredient;

      let ingredientId: string;
      const existing = await client.query(
        `SELECT id FROM ingredients WHERE name ILIKE $1 LIMIT 1`,
        [name.trim()]
      )

      if (existing.rows.length > 1) {
        ingredientId = existing.rows[0].id;
      } else {
        const newIngredient = await client.query(
          `INSERT INTO ingredients (name) VALUES ($1) RETURNING id`,
          [name.trim()]
        );
        ingredientId = newIngredient.rows[0].id;
      }

      await client.query(
        `INSERT INTO recipe_ingredients
          (recipe_id, ingredient_id, quantity, unit, display)
        VALUES ($1, $2, $3, $4, $5)`,
        [recipeId, ingredientId, quantity, unit, display]
      )
    }

    for (let i = 0; i < instructions.length; i++) {
      await client.query(
        `INSERT INTO instructions
          (recipe_id, step_number, instruction)
        VALUES ($1, $2, $3)`,
        [recipeId, i + 1, instructions[i]]
      )
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Recipe Created!', recipeId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating recipe: ', err);
    res.status(500).json({error: 'Failed to create recipe'});
  } finally {
    await client.release();
  }
})

export default router;

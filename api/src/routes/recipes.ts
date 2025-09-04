import { Router } from 'express';
import { Instruction, Recipe } from '../../../shared/types';
import camelcaseKeys from 'camelcase-keys';
import db from '../../db';
import { RecipeDetailDTO } from '../schemas/recipe.dto';
import z from 'zod';

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

// Get instructions
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      `
        SELECT
          r.id,
          r.title,
          r.image_url,
          r.description,
          r.prep_time,
          r.cook_time,
          r.effort_level,
          r.servings,
          COALESCE(instr.instructions, '[]'::json) AS instructions,
          COALESCE(ingr.ingredients, '[]'::json) AS ingredients
        FROM recipes r
        LEFT JOIN LATERAL (
          SELECT json_agg(
            json_build_object(
              'stepNumber', i.step_number,
              'instruction', i.instruction
            ) ORDER BY i.step_number
          ) AS instructions
          FROM instructions i
          WHERE i.recipe_id = r.id
        ) instr ON TRUE
        LEFT JOIN LATERAL (
          SELECT json_agg(ri.display ORDER BY ri.id) AS ingredients
          FROM recipe_ingredients ri WHERE ri.recipe_id = r.id
        ) ingr ON TRUE
        WHERE r.id = $1;
      `,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const row = camelcaseKeys(rows[0], { deep: true });
    const dto = {
      id: row.id,
      title: row.title,
      imageUrl: row.imageUrl ?? null,
      description: row.description ?? '',
      servings: row.servings,
      prepTime: row.prepTime,
      cookTime: row.cookTime,
      effortLevel: row.effortLevel,
      ingredients: row.ingredients ?? [],
      instructions: row.instructions ?? [],
    };

    const parsed = RecipeDetailDTO.safeParse(dto);

    if (!parsed.success) {
      console.error(z.treeifyError(parsed.error));
      return res
        .status(500)
        .json({ error: 'Recipe payload failed validation' });
    }

    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
    return res.json(parsed.data);
  } catch (err) {
    console.error('Error getting recipe: ', err);
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
      imageUrl,
      ingredients,
      instructions,
    } = req.body;

    if (
      !title.trim() ||
      !servings ||
      (!prepTime && !cookTime) ||
      !effortLevel
    ) {
      return res.status(400).json({ error: 'Missing required recipe field' });
    }

    const recipeResult = await client.query(
      `
        INSERT INTO recipes
          (title, description, servings, image_url, prep_time, cook_time, effort_level)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
      `,
      [title, description, servings, imageUrl, prepTime, cookTime, effortLevel]
    );
    const recipeId = recipeResult.rows[0].id;

    for (const ingredient of ingredients) {
      const { name, quantity, unit, display } = ingredient;

      let ingredientId: string;
      const existing = await client.query(
        `SELECT id FROM ingredients WHERE name ILIKE $1 LIMIT 1`,
        [name.trim()]
      );

      if (existing.rows.length >= 1) {
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
      );
    }

    for (let i = 0; i < instructions.length; i++) {
      await client.query(
        `INSERT INTO instructions
          (recipe_id, step_number, instruction)
        VALUES ($1, $2, $3)`,
        [recipeId, i + 1, instructions[i]]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Recipe Created!', recipeId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating recipe: ', err);
    res.status(500).json({ error: 'Failed to create recipe' });
  } finally {
    await client.release();
  }
});

export default router;

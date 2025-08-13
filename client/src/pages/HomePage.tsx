import { JSX } from 'react';
import {
  // Ingredient,
  // Instructions,
  Recipe,
  // RecipeIngredients,
  // RecipeTags,
  // Tags,
} from '../../../shared/types';
import { RecipeCard } from '../components/RecipeCard';

export function HomePage(): JSX.Element {
  return (
    <div>
      <RecipeCard recipe={carbonaraRecipe} />
    </div>
  );
}

const carbonaraRecipe: Recipe = {
  id: 1,
  title: 'Spaghetti Carbonara',
  description: 'Classic Italian pasta with pancetta, eggs, and cheese.',
  prepTime: 10,
  cookTime: 20,
  effortLevel: 3,
};

// const ingredients: Ingredient[] = [
//   { id: 1, name: 'Spaghetti' },
//   { id: 2, name: 'Eggs' },
//   { id: 3, name: 'Parmesan Cheese' },
//   { id: 4, name: 'Pancetta' },
//   { id: 5, name: 'Black Pepper' },
// ];

// const recipeIngredients: RecipeIngredients[] = [
//   { id: 1, recipeId: 1, ingredientId: 1, quantity: '200g' },
//   { id: 2, recipeId: 1, ingredientId: 2, quantity: '2' },
//   { id: 3, recipeId: 1, ingredientId: 3, quantity: '50g' },
//   { id: 4, recipeId: 1, ingredientId: 4, quantity: '100g' },
//   { id: 5, recipeId: 1, ingredientId: 5, quantity: 'To taste' },
// ];

// const tags: Tags[] = [
//   { id: 1, tag: 'Comfort Food' },
//   { id: 2, tag: 'Medium' },
// ];

// const recipeTags: RecipeTags[] = [
//   { id: 1, recipeId: 1, tagId: 1 },
//   { id: 2, recipeId: 1, tagId: 2 },
// ];

// const instructions: Instructions[] = [
//   {
//     id: 1,
//     recipeId: 1,
//     stepNumber: 1,
//     instruction: 'Boil the spaghetti in salted water until al dente.',
//   },
//   {
//     id: 2,
//     recipeId: 1,
//     stepNumber: 2,
//     instruction: 'Cook the pancetta in a pan until crispy.',
//   },
//   {
//     id: 3,
//     recipeId: 1,
//     stepNumber: 3,
//     instruction:
//       'In a bowl, beat the eggs and mix with grated Parmesan cheese.',
//   },
//   {
//     id: 4,
//     recipeId: 1,
//     stepNumber: 4,
//     instruction: 'Drain the spaghetti, reserving some pasta water.',
//   },
//   {
//     id: 5,
//     recipeId: 1,
//     stepNumber: 5,
//     instruction:
//       'Off heat, combine pasta with pancetta, then stir in egg-cheese mixture.',
//   },
//   {
//     id: 6,
//     recipeId: 1,
//     stepNumber: 6,
//     instruction: 'Add pasta water if needed, top with black pepper, and serve.',
//   },
// ];

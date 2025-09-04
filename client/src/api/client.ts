import type { components } from './types';
export type RecipeDetail = components['schemas']['RecipeDetail'];

export async function getRecipeById(
  id: string,
  init?: RequestInit
): Promise<RecipeDetail> {
  const recipe = await fetch(`/api/recipes/${id}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    ...init,
  });

  if (!recipe.ok) {
    const text = await recipe.text().catch(() => '');
    throw new Error(
      `GET /api/recipes/${id} ${recipe.status}: ${text || recipe.statusText}`
    );
  }

  return recipe.json();
}

export interface Recipe {
  id?: number;
  servings: number,
  image: string;
  title: string;
  description?: string;
  effortLevel: 1 | 2 | 3 | 4 | 5;
  prepTime: number;
  cookTime: number;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface RecipeIngredients {
  id: number;
  recipeId: number;
  ingredientId: number;
  quantity: string;
}

export interface Instructions {
  id: number;
  recipeId: number;
  stepNumber: number;
  instruction: string;
}

export interface Tags {
  id: number;
  tag: string;
}

export interface RecipeTags {
  id: number;
  recipeId: number;
  tagId: number;
}

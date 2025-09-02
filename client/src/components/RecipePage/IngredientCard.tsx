import { JSX } from 'react';
import { Recipe } from '../../pages/RecipePage';
import {
  RecipeListContainer,
  RecipeListItem,
  RecipeSection,
  RecipeSectionHeader,
} from './RecipePage.styles';

interface IngredientCardProps {
  ingredients: Recipe['ingredients'];
}

export function IngredientCard({
  ingredients,
}: IngredientCardProps): JSX.Element {
  return (
    <RecipeSection key="ingredients">
      <RecipeSectionHeader>Ingredients</RecipeSectionHeader>
      <RecipeListContainer>
        <ul>
          {ingredients.map((ingredient, i) => (
            <RecipeListItem key={i}>{ingredient}</RecipeListItem>
          ))}
        </ul>
      </RecipeListContainer>
    </RecipeSection>
  );
}

import { JSX } from 'react';
import { Recipe } from '../../pages/RecipePage';
import {
  RecipeListContainer,
  RecipeListItem,
  RecipeSection,
  RecipeSectionHeader,
} from './RecipePage.styles';
import styled from 'styled-components';

interface IngredientCardProps {
  ingredients: Recipe['ingredients'];
}

export function IngredientCard({
  ingredients,
}: IngredientCardProps): JSX.Element {
  return (
    <IngredientContainer key="ingredients">
      <RecipeSectionHeader>Ingredients</RecipeSectionHeader>
      <IngredientListContainer>
        <ul>
          {ingredients.map((ingredient, i) => (
            <RecipeListItem key={i}>{ingredient}</RecipeListItem>
          ))}
        </ul>
      </IngredientListContainer>
    </IngredientContainer>
  );
}

const IngredientContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  width: 100%;
  margin: auto;
  margin-top: 0;
  margin-bottom: 2rem;
  padding: 1rem;
  padding-left: 0;
  border-radius: 8px;
`;

const IngredientListContainer = styled.div`
  width: fit-content;
`;

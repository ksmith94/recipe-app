import { JSX } from "react";
// import { Ingredient, RecipeIngredients } from "../../../shared/types";
import { Recipe } from "../../pages/RecipePage";
import styled from "styled-components";
import { RecipeListItem, RecipeSmallSection, RecipeSectionHeader } from "./RecipePage.styles";

interface IngredientCardProps {
  ingredients: Recipe['ingredients'];
}

export function IngredientCard({ ingredients }: IngredientCardProps): JSX.Element {
  return (
    <RecipeSmallSection key='ingredients'>
      <RecipeSectionHeader>Ingredients</RecipeSectionHeader>
      <div>
        <ul>
          {ingredients.map((ingredient, i) => (
            <RecipeListItem key={i}>{ingredient}</RecipeListItem>
          ))}
        </ul>
      </div>
    </RecipeSmallSection>
  )
}

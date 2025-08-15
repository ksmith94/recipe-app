import { JSX } from "react";
import { Recipe } from "../../pages/RecipePage";
import { DetailCard } from "./RecipePage.styles";

interface RecipeDetailProps {
  servings: Recipe['servings']
  cookTime: Recipe['cookTime'];
  prepTime: Recipe['prepTime'];
  effort: Recipe['effort']
}

export function RecipeDetailCard(props: RecipeDetailProps): JSX.Element {
  return (
      <DetailCard>
        <div>Servings: {props.servings}</div>
        <div>Total Time: {props.prepTime + props.cookTime}</div>
        <div>Effort Level: {props.effort}/5</div>
      </DetailCard>
  )
}



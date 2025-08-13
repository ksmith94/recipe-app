import { JSX } from "react";
import { RecipeSmallSection } from "./RecipePage.styles";
import styled from "styled-components";
import { Recipe } from "../../pages/RecipePage";

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

const DetailCard = styled.div`
  text-align: left;
  padding-left: 1rem;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`

const ImageContainer = styled.div`
  max-width: 100%;
`

const Image = styled.img`
  max-width: 100%;
`

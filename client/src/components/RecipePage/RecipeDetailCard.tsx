import { JSX } from "react";
import { Recipe } from "../../pages/RecipePage";
import { DetailCard } from "./RecipePage.styles";
import styled from "styled-components";

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetailCard({recipe}: RecipeDetailProps): JSX.Element {
  const {
    title,
    servings,
    imageUrl,
    description,
    effortLevel,
    prepTime,
    cookTime,
  } = recipe;
  return (
      <DetailCard>
        <div>
        <h2>{title}</h2>
        <div>
          <p>{description}</p>  
        </div>
        <Details>
          <Detail>Servings: {servings}</Detail>
          <Detail>Total Time: {prepTime + cookTime}</Detail>
          <Detail>Effort: {effortLevel}/5</Detail>
        </Details>
        </div>
        <ImageContainer>
          <Image src={imageUrl} />
        </ImageContainer>
      </DetailCard>
  )
}

const Details = styled.div`
  display: flex;
  justify-content: start;
`

const Detail = styled.p`
  padding: 0 2rem 0 0;
  margin-top: 0;
`

const ImageContainer = styled.div`
  max-width: 50%;
  margin: 0 auto 1rem auto;
`

const Image = styled.img`
  max-width: 100%;
`

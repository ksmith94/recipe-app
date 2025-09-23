import { JSX } from 'react';
import { Recipe } from '../../pages/RecipePage';
import {
  DetailCard,
  RecipeSection,
  RecipeSectionHeader,
} from './RecipePage.styles';
import styled from 'styled-components';
import { IngredientCard } from './IngredientCard';

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetailCard({ recipe }: RecipeDetailProps): JSX.Element {
  const {
    title,
    servings,
    imageUrl,
    description,
    effortLevel,
    prepTime,
    cookTime,
    ingredients,
  } = recipe;
  return (
    <Container>
      <DetailContainer>
        <RecipeDetailSection>
          <RecipeSectionHeader>{title}</RecipeSectionHeader>
          <Description>
            <p>{description}</p>
          </Description>
          <Details>
            <Detail>Servings: {servings}</Detail>
            <Detail>Total Time: {prepTime + cookTime}</Detail>
            <Detail>Effort: {effortLevel}/5</Detail>
          </Details>
          <Tags>
            <Tag>Breakfast</Tag>
            <Tag>American</Tag>
          </Tags>
        </RecipeDetailSection>
        <IngredientCard ingredients={ingredients} />
      </DetailContainer>
      <ImageContainer>
        <Image src={imageUrl} />
      </ImageContainer>
    </Container>
  );
}

const DetailContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
  padding-left: 1rem;
  margin-bottom: 2rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

const Detail = styled.p`
  padding: 0 2rem 0 1rem;
  margin-top: 0;
`;

const ImageContainer = styled.div`
  max-width: 50%;
  margin: 0 0 1rem 0;
  border-top: 2px solid black;
  height: fit-content;
`;

const Image = styled.img`
  max-width: 100%;
`;

const RecipeDetailSection = styled.div`
  border: 2px solid hsl(155, 98%, 12%);
  margin: auto;
  margin-top: 0;
  margin-bottom: 2rem;
  padding: 1rem;
  padding-left: 0;
  border-radius: 8px;
`;

const Description = styled.div`
  padding-left: 1rem;
`;

const Tags = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 1rem;
`;

const Tag = styled.div`
  padding-left: 1rem;
  padding-right: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.neutral.gray600};
  border-radius: 24px 0 0 24px;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.neutral.gray600};
`;

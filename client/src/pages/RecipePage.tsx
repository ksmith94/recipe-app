import { JSX } from 'react';
import styled from 'styled-components';
import { IngredientCard } from '../components/RecipePage/IngredientCard';
import { InstructionCard } from '../components/RecipePage/InstructionCard';
import { RecipeDetailCard } from '../components/RecipePage/RecipeDetailCard';

export type Recipe = {
  title: string;
  image: string;
  description: string;
  effort: number;
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
};

interface RecipePageProps {
  recipe: Recipe;
}

export function RecipePage({ recipe }: RecipePageProps): JSX.Element {
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Container>
      <Title>{recipe.title}</Title>
      <ImageContainer>
        <Image src={recipe.image} />
      </ImageContainer>
      <Description>{recipe.description}</Description>
      <RecipeDetailCard 
        servings={recipe.servings}
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        effort={recipe.effort}
      />
      <div>
        <IngredientCard ingredients={recipe.ingredients} />
        <InstructionCard instructions={recipe.instructions} />
      </div>

      <Tags>
        {recipe.tags.map((tag, index) => (
          <Tag key={index}>#{tag}</Tag>
        ))}
      </Tags>
    </Container>
  );
}

const Container = styled.div`
  max-width: 95%;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const Tags = styled.div`
  margin-top: 1rem;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #eee;
  color: #333;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  margin-right: 0.5rem;
  font-size: 0.85rem;
`;

const ImageContainer = styled.div`
  max-width: 50%;
  margin: 0 auto 1rem auto;
`

const Image = styled.img`
  max-width: 100%;
`

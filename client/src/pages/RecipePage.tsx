import { JSX } from 'react';
import styled from 'styled-components';
import { IngredientCard } from '../components/RecipePage/IngredientCard';
import { InstructionCard } from '../components/RecipePage/InstructionCard';
import { RecipeDetailCard } from '../components/RecipePage/RecipeDetailCard';
import { RecipeSmallSection } from '../components/RecipePage/RecipePage.styles';

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
      {/* <RecipeImage src={recipe.image} alt={recipe.title} /> */}
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

const RecipeImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  color: #555;
`;

const Section = styled.section`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  max-width: 80%;
  margin: 0 auto 1rem auto;
  padding: 1rem;
  padding-left: 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-evenly;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
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

const TopSection = styled.div`
  display: flex;

`

const ImageContainer = styled.div`
  max-width: 50%;
  margin: 0 auto 1rem auto;
`

const Image = styled.img`
  max-width: 100%;
`

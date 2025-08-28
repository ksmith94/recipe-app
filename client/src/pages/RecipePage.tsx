import { JSX, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IngredientCard } from '../components/RecipePage/IngredientCard';
import { InstructionCard } from '../components/RecipePage/InstructionCard';
import { RecipeDetailCard } from '../components/RecipePage/RecipeDetailCard';
import { useParams } from 'react-router-dom';

export type Recipe = {
  id?: string;
  title: string;
  imageUrl: string;
  description: string;
  effortLevel: number;
  servings: number;
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  instructions: Instruction[];
  tags: string[];
};

type Instruction = {
  stepNumber: number;
  instruction: string;
}

export function RecipePage(): JSX.Element {
  const { id } = useParams();
  if (!id) {
    return (<div>
      <p>Invalid ID</p>
    </div>)
  }

  const [recipe, setRecipe] = useState<Recipe>();
  const getRecipe = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const recipe = await response.json();
      setRecipe(recipe);
    } catch (err) {
      console.error(err);
    }
  }



  useEffect(() => {
    getRecipe(id);
  }, [id])

  if (!recipe) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  return (
    <Container>
      <RecipeDetailCard recipe={recipe}/>
      <div>
        <IngredientCard ingredients={recipe.ingredients} />
        <InstructionCard instructions={recipe.instructions} />
      </div>

      {
        recipe.tags && 
      <Tags>
        {recipe.tags.map((tag, index) => (
          <Tag key={index}>#{tag}</Tag>
        ))}
      </Tags>
      }
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

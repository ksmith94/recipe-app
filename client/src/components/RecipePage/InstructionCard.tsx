import { JSX } from 'react';
import { Recipe } from '../../pages/RecipePage';
import {
  RecipeListContainer,
  RecipeListItem,
  RecipeSection,
  RecipeSectionHeader,
} from './RecipePage.styles';

interface InstructionCardProps {
  instructions: Recipe['instructions'];
}

export function InstructionCard({
  instructions,
}: InstructionCardProps): JSX.Element {
  return (
    <RecipeSection key="instructions">
      <RecipeSectionHeader>Instructions</RecipeSectionHeader>
      <RecipeListContainer>
        <ol>
          {instructions.map((instruction, i) => (
            <RecipeListItem key={i}>{instruction.instruction}</RecipeListItem>
          ))}
        </ol>
      </RecipeListContainer>
    </RecipeSection>
  );
}

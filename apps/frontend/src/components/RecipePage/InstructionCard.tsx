import { JSX } from 'react';
import { Recipe } from '../../pages/RecipePage';
import {
  RecipeListContainer,
  RecipeListItem,
  RecipeSection,
  RecipeSectionHeader,
} from './RecipePage.styles';
import styled from 'styled-components';

interface InstructionCardProps {
  instructions: Recipe['instructions'];
}

export function InstructionCard({
  instructions,
}: InstructionCardProps): JSX.Element {
  return (
    <InstructionContainer key="instructions">
      <RecipeSectionHeader>Instructions</RecipeSectionHeader>
      <InstructionListContainer>
        <ol>
          {instructions.map((instruction, i) => (
            <InstructionListItem key={i}>
              {instruction.instruction}
            </InstructionListItem>
          ))}
        </ol>
      </InstructionListContainer>
    </InstructionContainer>
  );
}

const InstructionContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  width: 80%;
  margin: auto;
  margin-top: 0;
  margin-bottom: 2rem;
  padding: 1rem;
  padding-left: 0;
  border-radius: 8px;
`;

const InstructionListContainer = styled.div`
  width: fit-content;
`;

const InstructionListItem = styled.li`
  width: fit-content;
  padding-bottom: 1rem;
`;

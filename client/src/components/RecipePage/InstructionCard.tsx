import { JSX } from "react";
import { Recipe } from "../../pages/RecipePage";
import styled from "styled-components";
import { RecipeListItem, RecipeLargeSection, RecipeSectionHeader } from "./RecipePage.styles";

interface InstructionCardProps {
  instructions: Recipe['instructions']
}

export function InstructionCard({instructions}: InstructionCardProps): JSX.Element {
  return (
    <RecipeLargeSection key='instructions'>
      <RecipeSectionHeader>Instructions</RecipeSectionHeader>
      <div>
        <ol>
          {instructions.map((instruction, i) => (
            <RecipeListItem key={i}>{instruction}</RecipeListItem>
          ))}
        </ol>
      </div>
    </RecipeLargeSection>
  )
}

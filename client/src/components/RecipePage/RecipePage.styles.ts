import { styled } from "styled-components"

export const RecipeSmallSection = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  width: 95%;
  max-width: 50%;
  margin: 0 auto 1rem auto;
  padding: 1rem;
  padding-left: 0;
  border-radius: 8px;
`

export const RecipeLargeSection = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  width: fit-content;
  margin: auto;
  padding: 1rem;
  padding-left: 0;
  border-radius: 8px;
`

export const RecipeSectionHeader = styled.h2`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  border-right: none;
  border-radius: 4px 0 0 4px;
  margin: 0 -1rem 0 -1rem;
  background-color: ${({ theme }) => theme.colors.primary.green600};
  text-align: left;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.green100};
`

export const RecipeListItem = styled.li`
  text-align: left;
  color: ${({ theme }) => theme.colors.primary.green900};
`

export const Instruction = styled.li``

export const InstructionCardContainer = styled.div`
  border: 2px solid black;
`
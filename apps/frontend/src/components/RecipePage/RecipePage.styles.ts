import { styled } from 'styled-components';

export const RecipeSection = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  width: fit-content;
  max-width: 80%;
  margin: auto;
  margin-top: 0;
  margin-bottom: 2rem;
  padding: 1rem;
  padding-left: 0;
  border-radius: 8px;
`;

export const RecipeSectionHeader = styled.h2`
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  border-right: none;
  border-radius: 4px 0 0 4px;
  margin: 0 -1rem 0 -1rem;
  background-color: ${({ theme }) => theme.colors.primary.green600};
  text-align: left;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.primary.green100};
`;

export const RecipeListContainer = styled.div`
  width: fit-content;
  margin: auto;
`;

export const RecipeListItem = styled.li`
  text-align: left;
  color: ${({ theme }) => theme.colors.primary.green900};
`;

export const InstructionCardContainer = styled.div`
  border: 2px solid black;
`;

export const DetailCard = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
  padding-left: 1rem;
  margin-bottom: 2rem;
`;

import { JSX } from 'react';
import styled from 'styled-components';
import { RecipeCreationInput } from './RecipeCreationInput';

export interface RecipeCreationDetails {
  title: string;
  imageUrl?: string;
  description: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  effortLevel: 1 | 2 | 3 | 4 | 5;
}

interface RecipeDetailProps {
  details: RecipeCreationDetails;
  setDetails: (details: RecipeCreationDetails) => void;
  errors: { [key: string]: boolean };
}

export function RecipeDetailForm({
  details,
  setDetails,
  errors,
}: RecipeDetailProps): JSX.Element {
  console.log(details);
  function handleChange(
    id: keyof RecipeCreationDetails,
    value: string | number
  ) {
    setDetails({ ...details, [id]: value });
  }

  function getTotalTime() {
    if (!details.cookTime && !details.prepTime) {
      return '––';
    } else if (!details.prepTime) {
      return details.cookTime + ' minutes';
    } else if (!details.cookTime) {
      return details.prepTime + ' minutes';
    }

    const totalTime = parseInt(details.prepTime) + parseInt(details.cookTime);
    return `${totalTime} minutes`;
  }

  return (
    <FormContainer>
      <form>
        <h3>Recipe Details</h3>
        <RecipeCreationInput
          inputType="text"
          label="Recipe Title"
          id="title"
          required={true}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          value={details.title}
        />
        <br />
        <RecipeCreationInput
          inputType="text"
          label="Description"
          id="description"
          required={false}
          onChange={(e) => handleChange('description', e.target.value)}
          value={details.description}
        />
        <br />
        <RecipeCreationInput
          inputType="text"
          label="Image URL"
          id="image"
          required={false}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          value={details.imageUrl}
        />
        <br />
        <RecipeCreationInput
          inputType="text"
          label="Servings"
          id="servings"
          required={true}
          onChange={(e) => handleChange('servings', e.target.value)}
          error={errors.servings}
          value={details.servings}
        />
        <br />
        <RecipeCreationInput
          inputType="text"
          label="Prep Time"
          id="prep-time"
          required={true}
          onChange={(e) => handleChange('prepTime', e.target.value)}
          error={errors.prepTime}
          value={details.prepTime}
        />
        <br />
        <RecipeCreationInput
          inputType="text"
          label="Cook Time"
          id="cook-time"
          required={true}
          onChange={(e) => handleChange('cookTime', e.target.value)}
          error={errors.cookTime}
          value={details.cookTime}
        />
        <br />
        <p>{`Total Time: ${getTotalTime()}`}</p>
        <br />
        <RecipeCreationInput
          inputType="range"
          label="Effort Level"
          id="effort"
          min={1}
          max={5}
          step={1}
          required={true}
          onChange={(e) => handleChange('effortLevel', e.target.value)}
          error={errors.effortLevel}
          value={3}
        />
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 4rem;
  margin: 0.5rem auto;
  border-radius: 8px;
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary.green900};
  background-color: ${({ theme }) => theme.colors.primary.green100};
`;

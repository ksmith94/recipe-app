import { JSX } from 'react';
import styled from 'styled-components';

interface IngredientFormProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

export function RecipeIngredientForm({
  ingredients,
  setIngredients,
}: IngredientFormProps): JSX.Element {
  const handleChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  return (
    <div>
      <h2>Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <IngredientRow key={index}>
          <input
            type="text"
            value={ingredient}
            placeholder={`Ingredient ${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {ingredients.length > 1 && (
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          )}
        </IngredientRow>
      ))}
      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>
    </div>
  );
}

// Styled components
const IngredientRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
  }

  button {
    background: #eee;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

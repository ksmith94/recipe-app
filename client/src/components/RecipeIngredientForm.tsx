import { JSX } from 'react';
import styled from 'styled-components';

interface IngredientFormProps {
  ingredients: IngredientInput[];
  setIngredients: (ingredients: IngredientInput[]) => void;
}

export interface IngredientInput {
  name: string;
  quantity: number;
  unit?: string;
  display: string;
}

export function RecipeIngredientForm({
  ingredients,
  setIngredients,
}: IngredientFormProps): JSX.Element {
  const handleChange = (
    index: number, 
    value: string | number, 
    field: 'ingredient' | 'quantity' | 'unit' | 'display'
  ) => {
    const updatedIngredients: IngredientInput[] = [...ingredients]
    switch (field) {
      case 'ingredient':
        updatedIngredients[index].name = value as string;
        break;
      case 'quantity':
        updatedIngredients[index].quantity = value as number;
        break;
      case 'unit':
        updatedIngredients[index].unit = value as string;
        break;
      case 'display':
        updatedIngredients[index].display = value as string;
        break;
    }

    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, {name: '', quantity: 0, unit: '', display: ''}]);
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const generateDisplay = (quantity: number, ingredient: string, unit?: string): string => {
    const q = quantity?.toString().trim();
    const u = unit?.trim();
    const n = ingredient?.trim();

    // Build parts array without falsy values (e.g., empty strings)
    const parts = [q, u, n].filter(Boolean);
    console.log(parts);

    return parts.join(' ');
  }

  return (
    <div>
      <h2>Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <IngredientRow key={index}>
          <input
            type="text"
            value={ingredient.name}
            placeholder={`Ingredient ${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value, 'ingredient')}
            onBlur={() => {
              const display = generateDisplay(
                ingredient.quantity,
                ingredient.name,
                ingredient.unit
              )
              handleChange(index, display, 'display')
            }}
          />
          <input 
            type="number"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleChange(index, e.target.value, 'quantity')}
            onBlur={() => {
              const display = generateDisplay(
                ingredient.quantity,
                ingredient.name,
                ingredient.unit
              )
              handleChange(index, display, 'display')
            }}
          />
          <input 
            type="text"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) => handleChange(index, e.target.value, 'unit')}
            onBlur={() => {
              const display = generateDisplay(
                ingredient.quantity,
                ingredient.name,
                ingredient.unit
              )
              handleChange(index, display, 'display')
            }}
          />
          <input 
            type="text"
            placeholder="Display"
            value={ingredient.display}
            onChange={(e) => handleChange(index, e.target.value, 'display')}
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

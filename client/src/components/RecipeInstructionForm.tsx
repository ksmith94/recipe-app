import { JSX } from 'react';
import { styled } from 'styled-components';

interface InstructionFormProps {
  instructions: string[];
  setInstructions: (instructions: string[]) => void;
}

export function RecipeInstructionForm({
  instructions,
  setInstructions,
}: InstructionFormProps): JSX.Element {
  const handleChange = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const removeIngredient = (index: number) => {
    const updated = instructions.filter((_, i) => i !== index);
    setInstructions(updated);
  };

  return (
    <div>
      <h2>Instructions</h2>
      {instructions.map((instruction, index) => (
        <InstructionRow key={index}>
          <input
            type="text"
            value={instruction}
            placeholder={`Step ${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {instructions.length > 1 && (
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          )}
        </InstructionRow>
      ))}
      <button type="button" onClick={addInstruction}>
        Add Step
      </button>
    </div>
  );
}

const InstructionRow = styled.div`
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

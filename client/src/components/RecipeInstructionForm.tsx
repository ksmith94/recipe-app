import { JSX } from 'react';
import { styled } from 'styled-components';
import { Button } from './Button';

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
    <InstructionsContainer>
      <h3>Instructions</h3>
      {instructions.map((instruction, index) => (
        <InstructionRow key={index}>
          <input
            type="text"
            value={instruction}
            placeholder={`Step ${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {(instructions.length > 1 && index === instructions.length - 1) && (
            <Button primary={false} type="button" onClick={() => removeIngredient(index)}>
              Remove
            </Button>
          )}
        </InstructionRow>
      ))}
      <Button primary={false} type="button" onClick={addInstruction}>
        Add Step
      </Button>
    </InstructionsContainer>
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
`;

const InstructionsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary.green100};
  border-radius: 6px;
`

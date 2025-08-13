import { JSX, useEffect, useState } from 'react';
import {
  RecipeCreationDetails,
  RecipeDetailForm,
} from '../components/RecipeDetailForm';
import { RecipeIngredientForm } from '../components/RecipeIngredientForm';
import { RecipeInstructionForm } from '../components/RecipeInstructionForm';

export function CreateRecipePage(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [instructions, setInstructions] = useState(['']);
  const [details, setDetails] = useState<RecipeCreationDetails>({
    title: '',
    servings: '',
    description: '',
    prepTime: '',
    cookTime: '',
    effortLevel: 3,
  });

  useEffect(() => {
    console.log(details)
  }, [details])

  return (
    <div>
      {step === 1 && (
      <RecipeDetailForm details={details} setDetails={setDetails} />
      )}
      {step === 2 && (
        <RecipeIngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      )}
      {step === 3 && (
        <RecipeInstructionForm
          instructions={instructions}
          setInstructions={setInstructions}
        />
      )}
      <div style={{ marginTop: '1rem' }}>
        {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
        {step < 4 && <button onClick={() => setStep(step + 1)}>Next</button>}
      </div>
    </div>
  );
}

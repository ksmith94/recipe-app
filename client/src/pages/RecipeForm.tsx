import { JSX, useEffect, useState } from 'react';
import {
  RecipeCreationDetails,
  RecipeDetailForm,
} from '../components/RecipeDetailForm';
import { IngredientInput, RecipeIngredientForm } from '../components/RecipeIngredientForm';
import { RecipeInstructionForm } from '../components/RecipeInstructionForm';
import { Ingredient, Instruction, Recipe, RecipeIngredients } from '../../../shared/types';

export function CreateRecipePage(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    {name: '', quantity: 0, unit: '', display: ''}, 
    {name: '', quantity: 0, unit: '', display: ''},
    {name: '', quantity: 0, unit: '', display: ''},
  ]);
  const [instructions, setInstructions] = useState(['']);
  const [details, setDetails] = useState<RecipeCreationDetails>({
    title: '',
    image: '',
    servings: '',
    description: '',
    prepTime: '',
    cookTime: '',
    effortLevel: 3,
  });

  // useEffect(() => {
  //   console.log(details);
  //   console.log(ingredients);
  //   console.log(instructions);
  // }, [details, ingredients, instructions])

  async function submitRecipe() {
    const filteredIngredients = ingredients.filter(ingredient => ingredient.name !== '');
    const recipe = {
      title: details.title,
      image: details.image,
      servings: parseInt(details.servings),
      description: details.description,
      effortLevel: details.effortLevel,
      prepTime: parseInt(details.prepTime),
      cookTime: parseInt(details.cookTime),
      ingredients: filteredIngredients,
      instructions
    }

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      })

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Recipe submitted: ', data);
    } catch (err) {
      console.error('Failed to submit recipe: ', err);
    }
  }

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
      <div>
        {step === 3 && <button onClick={submitRecipe}>Submit</button>}
      </div>
    </div>
  );
}

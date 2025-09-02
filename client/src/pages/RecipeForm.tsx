import { JSX, useState } from 'react';
import {
  RecipeCreationDetails,
  RecipeDetailForm,
} from '../components/RecipeDetailForm';
import {
  IngredientInput,
  RecipeIngredientForm,
} from '../components/RecipeIngredientForm';
import { RecipeInstructionForm } from '../components/RecipeInstructionForm';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../components/Notification';
import { styled } from 'styled-components';

export function CreateRecipePage(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { name: '', quantity: 0, unit: '', display: '' },
    { name: '', quantity: 0, unit: '', display: '' },
    { name: '', quantity: 0, unit: '', display: '' },
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
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleFormNavigation = () => {
    if (step === 1) {
      const invalidDetails = validateDetails(details);
      if (invalidDetails.length) {
        console.error('Required field(s) missing: ', invalidDetails.join(', '));
      } else {
        setStep(step + 1);
        setErrorMessage('');
      }
    } else if (step === 2) {
      const validatedIngredients = ingredients.filter(
        (ingredient) => ingredient.name !== ''
      );
      if (!validatedIngredients.length) {
        setErrorMessage('At least 1 ingredient is required.');
      } else {
        setStep(step + 1);
      }
    }
  };

  const validateDetails = (details: RecipeCreationDetails) => {
    const { title, servings, prepTime, cookTime, effortLevel } = details;
    const newErrors: { [key: string]: boolean } = {};
    const errorMessages = 'The following required fields are missing: ';

    if (!title.trim()) {
      newErrors['title'] = true;
      errorMessages.concat('Title');
    }
    if (!servings) {
      newErrors['servings'] = true;
      errorMessages.concat('Servings');
    }
    if (!prepTime && !cookTime) {
      newErrors['prepTime'] = true;
      newErrors['cookTime'] = true;
    }
    if (!effortLevel) {
      newErrors['effortLevel'] = true;
    }

    const message = generateErrorMessage(newErrors);
    message && setErrorMessage(message);
    setErrors(newErrors);
    return Object.keys(newErrors);
  };

  const generateErrorMessage = (errors: {
    [key: string]: boolean;
  }): string | null => {
    debugger;
    const keys = Object.keys(errors);
    if (!keys.length) return null;
    let message = 'The following required fields are missing: ';
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let displayKey;
      switch (key) {
        case 'title':
          displayKey = 'Title';
          break;
        case 'servings':
          displayKey = 'Servings';
          break;
        case 'prepTime':
          displayKey =
            'Prep Time & Cook Time (At least one of these must be greater than zero)';
          break;
        case 'effortLevel':
          displayKey = 'Effort Level';
          break;
        default:
          displayKey = '';
      }

      if (i === 0) {
        message = message.concat(displayKey);
      } else {
        message = message.concat(`, ${displayKey}`);
      }
    }

    return message;
  };

  async function submitRecipe() {
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.name !== ''
    );
    const validatedInstructions = instructions.filter(
      (instruction) => !!instruction
    );
    if (!validatedInstructions.length) {
      console.error('At least 1 isntruction is required.');
      return;
    }
    const recipe = {
      title: details.title,
      imageUrl: details.image,
      servings: parseInt(details.servings),
      description: details.description,
      effortLevel: details.effortLevel,
      prepTime: parseInt(details.prepTime),
      cookTime: parseInt(details.cookTime),
      ingredients: filteredIngredients,
      instructions,
    };
    console.log(recipe);

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });
      console.log('Response: ', response);

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      const id = data.recipeId;
      navigate(`/recipe/${id}`);
      console.log('Recipe submitted: ', id);
    } catch (err) {
      console.error('Failed to submit recipe: ', err);
    }
  }

  return (
    <Container>
      <h2>Create A Recipe</h2>
      {step === 1 && (
        <RecipeDetailForm
          details={details}
          setDetails={setDetails}
          errors={errors}
        />
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
        {step > 1 && (
          <Button primary onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 4 && (
          <Button primary onClick={() => handleFormNavigation()}>
            Next
          </Button>
        )}
      </div>
      <div>
        {step === 3 && (
          <Button primary onClick={submitRecipe}>
            Submit
          </Button>
        )}
      </div>
      {errorMessage && (
        <Notification
          message={errorMessage}
          title="Missing Fields"
          error
          onClose={() => setErrorMessage('')}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

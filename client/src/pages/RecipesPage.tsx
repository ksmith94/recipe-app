import { JSX, useEffect, useState } from "react";
import { RecipeCard } from "../components/RecipeCard";
import { Recipe } from "../../../shared/types";
import styled from "styled-components";

export function RecipesPage(): JSX.Element {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const recipes = await response.json();
      setRecipes(recipes);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);


  return (
    <div>
      <h2>All Recipes</h2>
      <RecipesDisplay>
        {recipes.map((recipe, i) => (
          <RecipeCard key={i} recipe={recipe} />
        ))}
      </RecipesDisplay>
    </div>
  )
}

const RecipesDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
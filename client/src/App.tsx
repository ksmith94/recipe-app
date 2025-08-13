import './App.css';
import { JSX } from 'react';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { RecipePage } from './pages/RecipePage';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyles';
import { CreateRecipePage } from './pages/RecipeForm';

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/recipe"
          element={
            <RecipePage
              recipe={{
                title: 'Spaghetti Carbonara',
                image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Pasta_alla_carbonara_crop.png',
                description:
                  'A classic Roman pasta dish made with eggs, cheese, pancetta, and pepper.',
                effort: 3,
                servings: 4,
                prepTime: 10,
                cookTime: 20,
                ingredients: [
                  '200g spaghetti',
                  '100g pancetta',
                  '2 large eggs',
                  '50g grated parmesan',
                  'Salt & pepper to taste',
                ],
                instructions: [
                  'Cook spaghetti until al dente.',
                  'Fry pancetta until crisp.',
                  'Whisk eggs and cheese together.',
                  'Drain pasta, mix quickly with egg-cheese and pancetta.',
                  'Serve immediately with extra cheese and pepper.',
                ],
                tags: ['pasta', 'italian', 'quick'],
              }}
            />
          }
        />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

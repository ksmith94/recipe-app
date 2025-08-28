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
import { RecipesPage } from './pages/RecipesPage';

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/create-recipe" element={<CreateRecipePage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

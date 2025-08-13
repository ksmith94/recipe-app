import { ChefHat, Heart, User } from 'lucide-react';
import { JSX } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';

export function Header(): JSX.Element {
  return (
    <HeaderContainer className="bg-white shadow-sm border-b">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to={'/'}>
          <ChefHat className="h-8 w-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">FlavorHub</h1>
        </Link>
      </div>

      {/* Navigation */}
      <Navigation className="hidden md:flex items-center space-x-8">
        <a
          href="#"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          Recipes
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          Categories
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          Meal Plans
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          About
        </a>
      </Navigation>

      {/* Actions */}
      <ButtonContainer>
        <Button icon={Heart} iconPosition="left" />
        <Button icon={User} iconPosition="left" />
        <Button text="Sign In" />
      </ButtonContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0;
  margin: 0;
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-evenly;
  width: 75%;
  margin: 1rem auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

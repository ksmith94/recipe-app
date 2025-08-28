import { ChefHat, Heart, User } from 'lucide-react';
import { JSX } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';

export function Header(): JSX.Element {
  return (
    <HeaderContainer className="bg-white shadow-sm border-b">
      <LinkContainer>
        <Link to={'/'}>
          <TitleContainer>
            <ChefHat size={48}/>
            <Title>FlavorHub</Title>
          </TitleContainer>
        </Link>
      </LinkContainer>

      <Navigation>
        <a
          href="/recipes"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          All Recipes
        </a>
        <a
          href="/create-recipe"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          Create a Recipe
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          Categories
        </a>
        {/* <a
          href="#"
          className="text-gray-700 hover:text-orange-500 transition-colors"
        >
          About
        </a> */}
      </Navigation>

      <ButtonContainer>
        {/* <Button icon={Heart} iconPosition="left" />
        <Button icon={User} iconPosition="left" /> */}
        <Button primary={false} text="Sign In" />
      </ButtonContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.green500};
  padding: 1rem 2rem;
  margin: 0;
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
`;

const Navigation = styled.nav`
  display: flex;
  width: 50%;
  justify-content: space-around;
  margin: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
`;

const LinkContainer = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-around;
  margin: auto 0;
`

const Title = styled.h1`
  margin: 0;
  padding-top: 0.5rem;
`

const TitleContainer = styled.div`
  display: flex;
  width: fit-content;
  margin: 0;
`
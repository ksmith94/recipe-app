import { JSX } from 'react';
import { Recipe } from '../../../shared/types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  const { title, cookTime, prepTime, description, effortLevel } = recipe;

  return (
    <Link to={'/recipe'}>
      <Card>
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <h3>{title}</h3>
              <div className="text-sm">{description}</div>
            </div>
          </div>
          <button className="absolute top-2 right-2 bg-white/80 hover:bg-white">
            {/* <Heart className="h-4 w-4" /> */}
          </button>
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {effortLevel}
          </div>
        </div>

        <div className="p-4">
          {/* <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors">
            {title}
          </h3> */}

          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              {/* <Clock className="h-4 w-4" /> */}
              <span>{cookTime + prepTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* <Users className="h-4 w-4" /> */}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  // className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">{effortLevel}.0</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.green100};
  border-radius: 1rem;
  box-shadow: 0 4px 10px ${({ theme }) => theme.colors.shadow};
  padding: 1.5rem;
  margin: 1rem;
  width: 300px;
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
`;

import { Clock } from 'lucide-react';
import { JSX } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Recipe } from '../pages/RecipePage';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps): JSX.Element {
  const { id, title, cookTime, prepTime, servings, effortLevel, imageUrl } =
    recipe;

  return (
    <Link to={`/recipe/${id}`}>
      <Card>
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
            <ImageContainer>
              <Image src={imageUrl} />
            </ImageContainer>
            <h3>{title}</h3>
          </div>
        </div>

        <div className="p-4">
          <DetailRow className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <Detail className="flex items-center space-x-1">
              <Clock size={16} className="h-4 w-4" />
              <span>{cookTime + prepTime}</span>
            </Detail>
            <Detail>
              <span>Servings: {servings}</span>
            </Detail>
            <Detail>
              <span>Effort: {effortLevel} / 5</span>
            </Detail>
          </DetailRow>

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
  height: 300px;
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
`;

const ImageContainer = styled.div`
  max-width: 75%;
  max-height: 50%;
  margin: 0 auto;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Detail = styled.div`
  margin: 2px 0;
`;

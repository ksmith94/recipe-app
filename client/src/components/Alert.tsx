import { JSX } from 'react';
import styled from 'styled-components';

export function Alert(): JSX.Element {
  return (
    <AlertContainer>
      <AlertHeader>Our privacy policy has changed</AlertHeader>
      <AlertText>Make sure you know how these changes affect you</AlertText>
    </AlertContainer>
  );
}

const AlertContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.green100};
  color: ${({ theme }) => theme.colors.primary.green900};
  width: fit-content;
  margin: 0 auto;
  border-radius: 8px;
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary.green900};
  box-shadow: 0 4px 10px ${({ theme }) => theme.colors.shadow};
`;

const AlertHeader = styled.h4`
  color: ${({ theme }) => theme.colors.primary.green900};
`;

const AlertText = styled.p`
  color: ${({ theme }) => theme.colors.primary.green900};
`;

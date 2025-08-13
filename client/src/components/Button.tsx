import React, { JSX } from 'react';
import styled from 'styled-components';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export function Button(props: ButtonProps): JSX.Element {
  const { icon: Icon, iconPosition = 'left', text, children, ...rest } = props;
  return (
    <ButtonContainer {...rest}>
      {Icon && iconPosition === 'left' && <Icon />}
      {text}
      {children}
      {Icon && iconPosition === 'right' && <Icon />}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  width: fit-content;
  /* padding: 0.1rem 0.5rem; */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary.green500};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.main};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.green700};
  }

  svg {
    width: 1em;
    height: 1em;
  }
`;

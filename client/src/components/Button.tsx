import React, { JSX } from 'react';
import styled from 'styled-components';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  primary: boolean;
}

export function Button(props: ButtonProps): JSX.Element {
  const { icon: Icon, iconPosition = 'left', text, children, primary, ...rest } = props;
  return (
    <ButtonContainer $primary={primary} {...rest}>
      {Icon && iconPosition === 'left' && <Icon />}
      {text}
      {children}
      {Icon && iconPosition === 'right' && <Icon />}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<{$primary?: boolean}>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.main};
  color: white;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ theme, $primary }) => $primary ?
    theme.colors.primary.green500 :  
    theme.colors.primary.green100
  };
  color: ${({ $primary, theme }) => $primary ? 
    theme.colors.white :
    theme.colors.primary.green900
  };
  border: ${({ $primary, theme }) => $primary ? 'none' : `2px solid ${theme.colors.primary.green900}`};

  &:hover {
    background-color: ${({ theme, $primary }) => $primary ? 
      theme.colors.primary.green700 :
      theme.colors.primary.green200
    };
  }

  svg {
    width: 1em;
    height: 1em;
  }
`;

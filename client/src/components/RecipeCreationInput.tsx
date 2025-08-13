import React, { JSX } from 'react';
import styled from 'styled-components';

interface RecipeCreationInputProps {
  label: string;
  id: string;
  inputType: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RecipeCreationInput({
  label,
  id,
  inputType,
  required,
  placeholder,
  min = 1,
  max = 5,
  step = 1,
  value,
  onChange
}: RecipeCreationInputProps): JSX.Element {
  return (
    <Container>
      <label htmlFor={id}>{`${label}: `}</label>
      <InputContainer>
        <input
          type={inputType}
          value={value}
          id={id}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
        />
        {inputType === 'range' && min !== undefined && max !== undefined && (
          <RangeLabels className="flex justify-between text-sm text-gray-500 mt-1">
            {Array.from({ length: (max - min) / step + 1 }).map((_, i) => (
              <span key={i}>{min + i * step}</span>
            ))}
          </RangeLabels>
        )}
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  padding-top: 4px;
  font-size: 0.9rem;
  color: #555;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// const StyledInput = styled.input``;

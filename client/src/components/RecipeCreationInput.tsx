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
  error?: boolean;
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
  onChange,
  error
}: RecipeCreationInputProps): JSX.Element {
  return (
    <div>
      <InputContainer $error={error}>
      <label htmlFor={id}>{`${label}: `}</label>
        <DetailInput
          type={inputType}
          value={value}
          id={id}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          $error={error}
        />
        {inputType === 'range' && min !== undefined && max !== undefined && (
          <RangeLabels className="flex justify-between text-sm text-gray-500 mt-1">
            {Array.from({ length: (max - min) / step + 1 }).map((_, i) => (
              <span key={i}>{min + i * step}</span>
            ))}
          </RangeLabels>
        )}
      </InputContainer>
    </div>
  );
}

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  padding-top: 4px;
  font-size: 0.9rem;
  color: #555;
  margin: 0 auto;
`;

const DetailInput = styled.input<{$error?: boolean}>`
  border: ${({ $error }) => $error && '2px solid red' };
  border-radius: ${({ $error }) => $error && '4px'};
`

const InputContainer = styled.div<{$error?: boolean}>`
  display: flex;
  justify-content: space-between;
  color: ${({ theme, $error }) => $error && theme.colors.error.red500};
  max-width: 70%;
  margin: 0 auto;
`;

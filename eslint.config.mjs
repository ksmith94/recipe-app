import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: [
      'api/**/*.{ts,js}',
      'client/**/*.{ts,tsx,js,jsx}',
      'shared/**/*.{ts,js}',
    ],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    rules: {
      ...tseslint.config.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['client/**/*.{jsx,tsx}'],
    plugins: { react: pluginReact },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['tsconfig.json'],
    plugins: { json },
    language: 'json/json',
    rules: {
      ...json.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    rules: {
      ...css.configs.recommended.rules,
    },
  },
]);

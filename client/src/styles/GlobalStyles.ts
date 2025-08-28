import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: ${({ theme }) => theme.fontSizes.base};
    width: 100%;
    margin: 0;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.white};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.heading}
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.subheading}
  }

  a:visited {
    color: black;
  }
`;

export default GlobalStyle;

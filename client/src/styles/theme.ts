export const theme = {
  colors: {
    primary: {
      green100: 'hsl(128, 82%, 96%)',
      green200: 'hsl(135, 90%, 73%)',
      green300: 'hsl(135, 92%, 62%)',
      green400: 'hsl(140, 92%, 45%)',
      green500: 'hsl(142, 92%, 31%)',
      green600: 'hsl(146, 94%, 26%)',
      green700: 'hsl(150, 95%, 21%)',
      green800: 'hsl(153, 96%, 15%)',
      green900: 'hsl(155, 98%, 12%)',
    },
    secondary: {
      forest: 'hsl(152, 54%, 24%)',
      sage: 'hsl(152, 40%, 65%)',
      mint: 'hsl(152, 40%, 85%)',
      success: 'hsl(152, 81%, 40%)',
    },
    white: 'white',
    text: 'black',
    background: 'hsl(152, 50%, 88%)',
    shadow: 'hsla(0, 0%, 0%, 0.1)',
  },
  fonts: {
    main: "'Inter', sans-serif",
  },
  fontSizes: {
    base: '16px',
    heading: '2rem',
    subheading: '1.5rem',
  },
};

export type Theme = typeof theme;

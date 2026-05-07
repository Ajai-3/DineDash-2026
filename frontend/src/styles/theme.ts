import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class', 
    nativeColor: true, 
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
  palette: {
    primary: {
      main: 'var(--color-accent)',
    },
  },
});
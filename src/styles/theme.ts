import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: `light`,
    common: {
      black: `#333`,
      white: `#ffffff`,
    },
    primary: {
      main: `#174E64`,
      light: `#227596`,
      dark: `#134153`,
    },
    secondary: {
      main: `#71F79F`,
      light: `#ECFEF2`,
      dark: `#ffff`,
    },
    error: {
      main: `#BD1E1E`,
    },
    warning: {
      main: `#399E5A`,
      light: `#fff`,
      dark: `#333`,
    },
    info: {
      main: `#FF9914`,
      light: `#fff`,
      dark: `#333`,
    },
    success: {
      main: `#399E5A`,
      light: `#fff`,
      dark: `#333`,
    },
    grey: {
      '300': `#FEFEFE`,
      '500': `#718478`,
      '700': `#79797a`,
    },
    background: {
      paper: `#fff`,
      default: `#fff`,
    },
  },
  typography: {
    fontFamily: `Roboto`,
  },
});

export default theme;

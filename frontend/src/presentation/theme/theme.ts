'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#2B8FCC', dark: '#1A6FA8', light: '#5AAEDD' },
    background: { default: '#F7FBFF', paper: '#FFFFFF' },
    text: { primary: '#1A2636', secondary: '#5A718A' },
    divider: '#D6EAF8',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    h1: { fontWeight: 300, letterSpacing: '-0.025em' },
    h2: { fontWeight: 300, letterSpacing: '-0.015em' },
    h3: { fontWeight: 400 },
    h4: { fontWeight: 400 },
    button: { fontWeight: 500, textTransform: 'none', letterSpacing: '0.01em' },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          padding: '10px 28px',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 12px rgba(59,158,219,0.25)' },
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #2B8FCC 0%, #1A6FA8 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #3A9FDC 0%, #2280BB 100%)' },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #D6EAF8',
          boxShadow: '0 2px 12px rgba(43,143,204,0.06)',
          '&:hover': { boxShadow: '0 8px 28px rgba(43,143,204,0.14)' },
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: '50px' },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: '1px solid #D6EAF8',
          boxShadow: 'none',
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: '4px 0' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          backgroundColor: '#ffffff',
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2B8FCC' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2B8FCC',
            borderWidth: '2px',
          },
        },
        notchedOutline: { borderColor: '#D6EAF8' },
      },
    },
  },
});

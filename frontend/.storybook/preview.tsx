import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../src/presentation/theme/theme';
import '../src/app/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'sky',
      values: [
        { name: 'sky', value: '#F0F8FF' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1F2937' },
      ],
    },
    a11y: { test: 'todo' },
  },
};

export default preview;

import React from 'react';
import { ThemeProvider } from '@mui/material';

import AppRoutes from './routes';
import theme from '../styles/mui/generalCustomTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;

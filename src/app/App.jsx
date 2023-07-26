import React from 'react';
import { ThemeProvider } from '@mui/material';
import { isUserAuthenticated } from 'store/slices/userSlice';
import { useLoadUserQuery } from 'services/private/user';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import theme from '../styles/mui/generalCustomTheme';

function App() {
  const dispatch = useDispatch();
  const userResponse = useLoadUserQuery();
  if (userResponse.isSuccess) {
    dispatch(isUserAuthenticated({ isAuthenticated: true }));
  }
  if (userResponse.isError) {
    dispatch(isUserAuthenticated({ isAuthenticated: false }));
  }
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;

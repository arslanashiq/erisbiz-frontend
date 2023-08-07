import React from 'react';
import { ThemeProvider } from '@mui/material';
import { isUserAuthenticated } from 'store/slices/userSlice';
import { useLoadUserQuery } from 'services/private/user';
import { useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import AppRoutes from './routes';
import theme from '../styles/mui/theme';

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
      <SnackbarProvider
        maxSnack={4}
        transitionDuration={100}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <AppRoutes />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { isUserAuthenticated } from 'store/slices/userSlice';
import { useLoadUserMutation } from 'services/private/user';
import { useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import Loader from 'shared/components/loader/Loader';
import AppRoutes from './routes';
import theme from '../styles/mui/theme';

function App() {
  const dispatch = useDispatch();

  const [verifyUser, userResponse] = useLoadUserMutation();

  const handleVerifyUser = async () => {
    const res = await verifyUser();

    if (res.data) {
      dispatch(isUserAuthenticated({ isAuthenticated: true }));
    } else {
      dispatch(isUserAuthenticated({ isAuthenticated: false }));
    }
  };
  useEffect(() => {
    handleVerifyUser();
  }, []);

  if (userResponse.isLoading || userResponse.isUninitialized) {
    return <Loader />;
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

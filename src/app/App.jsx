import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { isUserAuthenticated } from 'store/slices/userSlice';
import { useLoadUserQuery } from 'services/private/user';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import AppRoutes from './routes';
import theme from '../styles/mui/theme';

function App() {
  const dispatch = useDispatch();
  const userResponse = useLoadUserQuery('', { skip: !localStorage.getItem('token') });

  const handleVerifyUser = async () => {
    if (userResponse.data) {
      dispatch(
        isUserAuthenticated({
          isAuthenticated: true,
          is_regestered_company: true,
          // is_regestered_company: res.data?.is_regestered_company,
        })
      );
    } else {
      dispatch(
        isUserAuthenticated({
          isAuthenticated: false,
          is_regestered_company: false,
        })
      );
    }
  };
  useEffect(() => {
    handleVerifyUser();
  }, [userResponse]);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={4}
        transitionDuration={100}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <SectionLoader options={[userResponse.isLoading]}>
          <AppRoutes />
        </SectionLoader>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

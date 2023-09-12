import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { isUserAuthenticated } from 'store/slices/userSlice';
import { useLoadUserMutation } from 'services/private/user';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import AppRoutes from './routes';
import theme from '../styles/mui/theme';

function App() {
  const dispatch = useDispatch();

  const [verifyUser, userResponse] = useLoadUserMutation();

  const handleVerifyUser = async () => {
    const res = await verifyUser();

    if (res.data) {
      dispatch(
        isUserAuthenticated({
          isAuthenticated: true,
          is_regestered_company: res.data?.user?.is_regestered_company,
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
  }, []);

  return (
    <SectionLoader options={[userResponse.isLoading || userResponse.isUninitialized]}>
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
    </SectionLoader>
  );
}

export default App;

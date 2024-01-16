import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadUserQuery } from 'services/private/user';
import { isUserAuthenticated } from 'store/slices/userSlice';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import AppRoutes from './routes';
import theme from '../styles/mui/theme';

function App() {
  const { isAuthenticated, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const userResponse = useLoadUserQuery({}, { skip: !token });

  const handleVerifyUser = async () => {
    if (userResponse.status === 'rejected' || token === null) {
      dispatch(
        isUserAuthenticated({
          isAuthenticated: false,
          is_regestered_company: false,
          is_payment: false,
        })
      );
    }
    if (userResponse.status === 'fulfilled' && userResponse.data) {
      dispatch(
        isUserAuthenticated({
          isAuthenticated: true,
          email: userResponse?.data?.email,
          is_regestered_company: userResponse.data?.is_regestered_company,
          is_payment: userResponse.data?.company?.is_payment,
          // is_regestered_company: true,
          // is_payment: false,
          profile: userResponse.data?.profile,
          company: userResponse.data?.company,
        })
      );
    }
  };
  useEffect(() => {
    handleVerifyUser();
  }, [userResponse, token]);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={4}
        transitionDuration={100}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <SectionLoader options={[userResponse.isLoading, isAuthenticated === null]}>
          <AppRoutes />
        </SectionLoader>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

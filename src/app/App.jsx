import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { isUserAuthenticated } from 'store/slices/userSlice';
import { useLoadUserQuery } from 'services/private/user';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import AppRoutes from './routes';
import theme from '../styles/mui/theme';

function App() {
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const userResponse = useLoadUserQuery();

  const handleVerifyUser = async () => {
    if (userResponse.status === 'rejected') {
      dispatch(
        isUserAuthenticated({
          isAuthenticated: false,
          is_regestered_company: false,
        })
      );
    }
    if (userResponse.status === 'fulfilled' && userResponse.data) {
      dispatch(
        isUserAuthenticated({
          isAuthenticated: true,
          // is_regestered_company: true,
          is_regestered_company: userResponse.data?.is_regestered_company,
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
        <SectionLoader options={[userResponse.isLoading, isAuthenticated === null]}>
          <AppRoutes />
        </SectionLoader>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router';
// import PropTypes from 'prop-types';
import AuthLeftSection from 'shared/components/auth-left-section/AuthLeftSection';

function AuthWrapper() {
  return (
    <Grid container className="main__wrapper" sx={{ height: '100vh' }}>
      <Grid item xs={0} md={6} display={{ xs: 'none', md: 'block' }} className="p-relative">
        <AuthLeftSection />
      </Grid>
      <Grid item xs={12} md={6}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

// AuthWrapper.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default AuthWrapper;

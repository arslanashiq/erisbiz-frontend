/*eslint-disable*/
import React from 'react';
import { PropTypes } from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Layout from 'containers/common/layout';

function PrivateRoutes() {
  const user = useSelector(state => state.user);
  if (!user.isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
}

export default PrivateRoutes;

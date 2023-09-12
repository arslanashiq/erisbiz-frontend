import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from 'containers/common/layout';

function PrivateRoutes() {
  const user = useSelector(state => state.user);
  if (!user.isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  if (user.isisRegesteredCompany) {
    return <Layout />;
  }
  return <Navigate to="/register-company" />;
}

export default PrivateRoutes;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Layout from 'containers/common/layout';

function PrivateRoutes() {
  const location = useLocation();
  const { isAuthenticated, isRegesteredCompany, isPayment } = useSelector(state => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }
  if (isRegesteredCompany) {
    if (isPayment) {
      return <Layout />;
    }
    return <Navigate to="/register-company/plans" replace />;
  }

  return <Navigate to="/register-company" replace />;
}

export default PrivateRoutes;

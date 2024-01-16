import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

function CompanyGuardedRoute() {
  const location = useLocation();
  const { isAuthenticated, isRegesteredCompany, isPayment } = useSelector(state => state.user);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }
  if (!isRegesteredCompany) {
    if (location.pathname === '/register-company') {
      return <Outlet />;
    }
    return <Navigate to="/register-company" state={location.pathname} />;
  }
  if (!isPayment) {
    if (location.pathname?.includes('plans')) {
      return <Outlet />;
    }
    if (location.pathname?.includes('payment')) {
      return <Outlet />;
    }
    return <Navigate to="/register-company/plans" state={location.pathname} />;
  }
  return <Navigate to="/" state={location.pathname} />;
}

export default CompanyGuardedRoute;

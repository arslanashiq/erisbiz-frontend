import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
// containers
import AuthWrapper from 'containers/auth/components/AuthWrapper';

function PublicRoutes({ children }) {
  const location = useLocation();
  const { isAuthenticated, isRegesteredCompany, isPayment } = useSelector(state => state.user);

  if (isAuthenticated) {
    if (isRegesteredCompany) {
      if (isPayment) {
        if (location?.state) {
          return <Navigate to={location.state} replace />;
        }
        return <Navigate to="/" replace />;
      }
      return <Navigate to="/payment-plans" replace />;
    }

    return <Navigate to="/register-company" replace />;
  }

  return <AuthWrapper>{children}</AuthWrapper>;
}

PublicRoutes.propTypes = {
  children: PropTypes.node,
};

PublicRoutes.defaultProps = {
  children: null,
};

export default PublicRoutes;

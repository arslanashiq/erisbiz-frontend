import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
// containers
import AuthWrapper from 'containers/auth/components/AuthWrapper';

function PublicRoutes({ children }) {
  const user = useSelector(state => state.user);
  if (user.isAuthenticated) {
    if (user.isRegesteredCompany) {
      const url = sessionStorage.getItem('lastUrl');
      if (url) {
        return <Navigate to={url} />;
      }
      return <Navigate to="/" />;
    }
    return <Navigate to="/register-company" />;
  }
  return <AuthWrapper>{children}</AuthWrapper>;
}
PublicRoutes.propTypes = {
  children: PropTypes.element,
};
PublicRoutes.defaultProps = {
  children: null,
};
export default PublicRoutes;

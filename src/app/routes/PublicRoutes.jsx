/* eslint-disable react/prop-types */
import AuthWrapper from 'containers/auth/components/AuthWrapper';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function PublicRoutes({ children }) {
  const user = useSelector(state => state.user);
  if (user.isAuthenticated) {
    const url = sessionStorage.getItem('lastUrl');
    if (url) {
      return <Navigate to={url} />;
    }
    return <Navigate to="/" />;
  }
  return <AuthWrapper>{children}</AuthWrapper>;
}
export default PublicRoutes;

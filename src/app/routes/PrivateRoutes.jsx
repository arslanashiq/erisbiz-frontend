import React from 'react';
import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';
// import Layout from 'containers/common/layout';

function PrivateRoutes({ children }) {
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <div className="p-3">{children}</div>;
}
PrivateRoutes.propTypes = {
  children: PropTypes.element.isRequired,
};
export default PrivateRoutes;

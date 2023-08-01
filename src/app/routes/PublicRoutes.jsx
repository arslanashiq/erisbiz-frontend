import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

function PublicRoutes() {
  const user = useSelector(state => state.user);
  if (user.isAuthenticated) {
    // return <Navigate to="/" />;
    return <Navigate to="/pages/accounting/banking/add" />;
  }
  return <Outlet />;
}
// PublicRoutes.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default PublicRoutes;

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

function PublicRoutes() {
  const user = useSelector(state => state.user);
  if (user.isAuthenticated) {
    const url = sessionStorage.getItem('lastUrl');
    if (url) {
      return <Navigate to={url} />;
    }
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
// PublicRoutes.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default PublicRoutes;

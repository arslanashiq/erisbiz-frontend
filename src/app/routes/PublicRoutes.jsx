import React from 'react';
import { Outlet } from 'react-router';

function PublicRoutes() {
  return <Outlet />;
}
// PublicRoutes.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default PublicRoutes;

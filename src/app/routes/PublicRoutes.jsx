import { PropTypes } from 'prop-types';

function PublicRoutes({ children }) {
  return children;
}
PublicRoutes.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PublicRoutes;

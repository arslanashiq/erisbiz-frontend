import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TopbarMenuLink(props) {
  const { title, icon, path, onClick } = props;
  return (
    <Link
      style={{ color: '#232329' }}
      className="d-flex align-items-center justify-content-start topbar__link"
      to={path}
      onClick={onClick}
    >
      {icon}
      <p className="px-2 topbar__link-title">{title}</p>
    </Link>
  );
}
TopbarMenuLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
TopbarMenuLink.defaultProps = {
  icon: '',
};

export default TopbarMenuLink;

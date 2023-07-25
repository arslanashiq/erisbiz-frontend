import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';

const checkActive = (match, location) => {
  if (!location) return false;
  if (!match) return false;
  const { pathname } = location;
  const { url } = match;
  return pathname.includes(url) && url;
};
function SidebarLink(props) {
  const { title, icon, newLink, route, onClick, hidden } = props;
  return (
    <NavLink
      to={route}
      onClick={onClick}
      activeClassName="sidebar__link-active"
      isActive={checkActive}
      hidden={hidden}
    >
      <li className="sidebar__link">
        {icon ? <span className={`sidebar__link-icon fas fa-${icon}`} /> : ''}
        <p className="sidebar__link-title">
          {title}
          {newLink && (
            <Badge className="sidebar__link-badge">
              <span>New</span>
            </Badge>
          )}
        </p>
      </li>
    </NavLink>
  );
}
SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  newLink: PropTypes.bool,
  route: PropTypes.string,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
};

SidebarLink.defaultProps = {
  icon: '',
  newLink: false,
  route: '/',
  onClick: () => {},
  hidden: false,
};
export default SidebarLink;

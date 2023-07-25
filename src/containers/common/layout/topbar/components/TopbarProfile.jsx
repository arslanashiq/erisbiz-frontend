/* eslint react/forbid-prop-types: 0 */
/* eslint no-script-url: 0 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Collapse } from 'reactstrap';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import TopbarMenuLink from './TopbarMenuLink';
// import { logout } from '../../../redux/actions/authActions';
const Ava = `${process.env.PUBLIC_URL}/img/avatar.png`;

function TopbarProfile() {
  const [state, setState] = useState({
    collapse: false,
  });
  const toggle = () => {
    setState(prevState => ({ ...prevState, collapse: !prevState.collapse }));
  };
  const logout = async () => {
    window.location = '/login';
  };
  const user = {
    profile: {
      photo: 'https://crm-application-storages.s3.amazonaws.com/media/profile_photos/meta.jpg',
      employee_name: 'Accounting',
    },
  };
  return (
    <div className="topbar__profile">
      <button className="topbar__avatar" type="button" onClick={toggle}>
        {user.profile && user.profile.photo && (
          <img className="topbar__avatar-img" src={user.profile.photo} alt="avatar" />
        )}
        {user.profile && user.profile.photo === '' && (
          <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        )}
        <p className="topbar__avatar-name">
          {user.profile && user.profile.employee_name}
          {!user.profile && 'Admin User'}
        </p>
        <ArrowDropDownIcon className="topbar__icon" />
      </button>
      {state.collapse && (
        <button className="topbar__back" type="button" onClick={toggle}>
          {' '}
        </button>
      )}
      <Collapse isOpen={state.collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink
            title="My Profile"
            icon={<PermIdentityIcon />}
            path="/pages/user/profile"
            onClick={toggle}
          />
          <TopbarMenuLink
            title="Calendar"
            icon={<CalendarMonthIcon />}
            path="/pages/user/calendar"
            onClick={toggle}
          />
          <TopbarMenuLink title="Log Out" icon={<LogoutIcon />} path="/login" onClick={logout} />
        </div>
      </Collapse>
    </div>
  );
}
TopbarProfile.propTypes = {
  // user: PropTypes.object.isRequired,
  // doLogout: PropTypes.func.isRequired,
};
export default TopbarProfile;

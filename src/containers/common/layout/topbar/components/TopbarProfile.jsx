import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useNavigate } from 'react-router';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { Link } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem, Avatar, Stack } from '@mui/material';
import 'styles/topbar-profile.scss';

const user = {
  profile: {
    photo: 'https://crm-application-storages.s3.amazonaws.com/media/profile_photos/meta.jpg',
    employee_name: 'Accounting',
  },
};
function TopbarProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.clear();
    await dispatch(setUser({}));
    navigate('/auth/login');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Stack direction="row" className="topbar-profile" onClick={handleClick}>
        {user.profile && user.profile.photo && <Avatar alt="Remy Sharp" src={user.profile.photo} />}
        <Typography className="topbar-profile-name">
          {user.profile ? user.profile.employee_name : 'Admin User'}
        </Typography>
        <ArrowDropDownIcon className="topbar__icon clr-add" />
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box className="topbar-profile-menu">
          <MenuItem className="topbar-profile-menu-item">
            <Link className="topbar-profile-menu-item-link" to="/pages/user/profile">
              <Stack direction="row" spacing={2} style={{ alignItems: 'center' }}>
                <PermIdentityIcon className="topbar-profile-menu-item-icon" />
                <Typography className="topbar-profile-menu-item-option">My Profile</Typography>
              </Stack>
            </Link>
          </MenuItem>
          <MenuItem className="topbar-profile-menu-item">
            <Link className="topbar-profile-menu-item-link" to="/pages/user/calendar">
              <Stack direction="row" spacing={2} style={{ alignItems: 'center' }}>
                <CalendarMonthIcon className="topbar-profile-menu-item-icon" />
                <Typography className="topbar-profile-menu-item-option">Calender</Typography>
              </Stack>
            </Link>
          </MenuItem>
          <MenuItem className="topbar-profile-menu-item" onClick={handleLogout}>
            <Stack direction="row" spacing={2} style={{ alignItems: 'center' }}>
              <LogoutIcon className="topbar-profile-menu-item-icon" />
              <Typography className="topbar-profile-menu-item-option">Logout</Typography>
            </Stack>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}
TopbarProfile.propTypes = {
  // user: PropTypes.object.isRequired,
  // doLogout: PropTypes.func.isRequired,
};
export default TopbarProfile;

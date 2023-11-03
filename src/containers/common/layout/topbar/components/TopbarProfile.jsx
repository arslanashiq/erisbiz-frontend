import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useNavigate } from 'react-router';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { Link } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem, Avatar, Stack } from '@mui/material';
import {
  topbarIcon,
  topbarProfile,
  topbarProfileMenu,
  topbarProfileMenuItem,
  topbarProfileMenuItemIcon,
  topbarProfileMenuItemLink,
  topbarProfileMenuItemOption,
  topbarProfileName,
} from 'styles/mui/common/layouts/topbar/components/topbar-profile';

const user = {
  profile: {
    photo:
      'https://crm-application-storages.s3.amazonaws.com/media/profile_photos/WhatsApp_Image_2023-07-27_at_12.16.48.jpg',
    employee_name: 'Accounting',
  },
};
function TopbarProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.clear();
    await dispatch(setUser({ isAuthenticated: false, user: { email: '', groups: [], profile: {} } }));
    navigate('/auth/login');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Stack direction="row" sx={topbarProfile} onClick={handleClick}>
        {user.profile && user.profile.photo && <Avatar alt="Remy Sharp" src={user.profile.photo} />}
        <Typography sx={topbarProfileName}>
          {user.profile ? user.profile.employee_name : 'Admin User'}
        </Typography>
        <ArrowDropDownIcon sx={topbarIcon} className=" clr-add" />
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
        <Box sx={topbarProfileMenu}>
          <MenuItem sx={topbarProfileMenuItem}>
            <Link style={topbarProfileMenuItemLink} to="/pages/user/profile">
              <Stack direction="row" spacing={2} alignItems="center">
                <PermIdentityIcon sx={topbarProfileMenuItemIcon} />
                <Typography sx={topbarProfileMenuItemOption}>My Profile</Typography>
              </Stack>
            </Link>
          </MenuItem>
          <MenuItem sx={topbarProfileMenuItem}>
            <Link style={topbarProfileMenuItemLink} to="/pages/user/calendar">
              <Stack direction="row" spacing={2} alignItems="center">
                <CalendarMonthIcon sx={topbarProfileMenuItemIcon} />
                <Typography sx={topbarProfileMenuItemOption}>Calender</Typography>
              </Stack>
            </Link>
          </MenuItem>
          <MenuItem sx={topbarProfileMenuItem} onClick={handleLogout}>
            <Stack direction="row" spacing={2} alignItems="center">
              <LogoutIcon sx={topbarProfileMenuItemIcon} />
              <Typography sx={topbarProfileMenuItemOption}>Logout</Typography>
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

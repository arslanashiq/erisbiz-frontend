import React, { useCallback, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useNavigate } from 'react-router';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'store/slices/userSlice';
import { Box, Typography, Menu, MenuItem, Avatar, Stack } from '@mui/material';
import {
  topbarIcon,
  topbarProfile,
  topbarProfileMenu,
  topbarProfileMenuItem,
  topbarProfileMenuItemIcon,
  // topbarProfileMenuItemLink,
  topbarProfileMenuItemOption,
  topbarProfileName,
} from 'styles/mui/common/layouts/topbar/components/topbar-profile';
import { privateApi } from 'services/private';

function TopbarProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const companyDetail = useSelector(state => state?.user?.company);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    localStorage.clear();
    dispatch(privateApi.util.resetApiState());
    await dispatch(logOut());
    navigate('/auth/login');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigate = link => {
    handleClose();
    if (link) {
      setTimeout(() => {
        navigate(link);
      }, 400);
    }
  };

  const getCompanyName = useCallback(companyName => {
    try {
      const comapnyNameList = companyName.split(' ');
      if (comapnyNameList?.length > 1) {
        return comapnyNameList[0];
      }
      return companyName;

      // if (companyName.length <= 5) return companyName;
      // return companyName.slice(0, 5);
    } catch (error) {
      return companyName;
    }
  });
  return (
    <>
      <Stack direction="row" sx={topbarProfile} onClick={handleClick}>
        {companyDetail?.logo && (
          <Avatar
            sx={{ objectFit: 'contain', height: 40, width: 40 }}
            alt="Remy Sharp"
            // src={companyDetail?.logo}
          />
        )}
        <Typography sx={topbarProfileName}>{getCompanyName(companyDetail?.name || 'Admin User')}</Typography>
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
          <MenuItem sx={topbarProfileMenuItem} onClick={() => handleNavigate('/user/profile')}>
            <Stack direction="row" spacing={2} alignItems="center">
              <PermIdentityIcon sx={topbarProfileMenuItemIcon} />
              <Typography sx={topbarProfileMenuItemOption}>My Account</Typography>
            </Stack>
          </MenuItem>
          {/* <MenuItem sx={topbarProfileMenuItem} onClick={() => handleNavigate('/user/calendar')}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarMonthIcon sx={topbarProfileMenuItemIcon} />
              <Typography sx={topbarProfileMenuItemOption}>Calender</Typography>
            </Stack>
          </MenuItem> */}
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

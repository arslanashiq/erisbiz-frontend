import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useLocation } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
// styled components
import DrawerHeader from 'styles/mui/component/DrawerHeader';
// components
import { DRAWER_WIDTH } from 'utilities/constants';
import LargeScreenDrawer from './components/LargeScreenDrawer';
import SmallScreenDrawer from './components/SmallScreenDrawer';
import SideBarLinksList from './utilities/SideBarLinksList';

function Sidebar({ open, setOpen, handleToggleDrawer }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();

  const [showSideBarChildLink, setShowSideBarChildLink] = useState([false, false, false]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const checkActive = link => {
    // if (location.pathname === link) return true;
    // return false;

    // // for parent also selected
    if (location.pathname === '/' && link === '/') return true;
    if (location.pathname === '/' || link === '/') return false;
    if (location.pathname.includes(link)) return true;
    return false;
  };
  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isLargeScreen === false && (
        <SmallScreenDrawer
          open={open}
          setOpen={setOpen}
          showSideBarChildLink={showSideBarChildLink}
          setShowSideBarChildLink={setShowSideBarChildLink}
          handleToggleDrawer={handleToggleDrawer}
          handleDrawerClose={handleDrawerClose}
          checkActive={checkActive}
          AccountantSideBarLinks={SideBarLinksList}
          DrawerHeader={DrawerHeader}
        />
      )}
      <LargeScreenDrawer
        open={open}
        setOpen={setOpen}
        showSideBarChildLink={showSideBarChildLink}
        setShowSideBarChildLink={setShowSideBarChildLink}
        handleToggleDrawer={handleToggleDrawer}
        handleDrawerClose={handleDrawerClose}
        checkActive={checkActive}
        AccountantSideBarLinks={SideBarLinksList}
        DrawerHeader={DrawerHeader}
      />
      <Box
        component="main"
        sx={{
          width: {
            sm: '100%',
            md: `calc(100% - ${open ? DRAWER_WIDTH : '65'}px)`,
          },
        }}
        className="main-wrapper"
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};
export default Sidebar;

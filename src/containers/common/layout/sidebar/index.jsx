import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
// styled components
import DrawerHeader from 'styles/mui/component/DrawerHeader';
// components
import { DRAWER_WIDTH } from 'utilities/constants';
import LargeScreenDrawer from './components/LargeScreenDrawer';
import SmallScreenDrawer from './components/SmallScreenDrawer';
import useGetSideBarLinksList from './custom-hooks/useGetSideBarLinksList';

function Sidebar({ open, setOpen, handleToggleDrawer }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { SideBarLinksList, checkActive, handleChnageSideBarChildDisplay } = useGetSideBarLinksList();
  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isLargeScreen ? (
        <LargeScreenDrawer
          open={open}
          setOpen={setOpen}
          checkActive={checkActive}
          DrawerHeader={DrawerHeader}
          handleToggleDrawer={handleToggleDrawer}
          AccountantSideBarLinks={SideBarLinksList}
          handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
        />
      ) : (
        <SmallScreenDrawer
          open={open}
          setOpen={setOpen}
          checkActive={checkActive}
          DrawerHeader={DrawerHeader}
          handleToggleDrawer={handleToggleDrawer}
          AccountantSideBarLinks={SideBarLinksList}
          handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
        />
      )}

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
        <DrawerHeader className="no-print" />
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

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
// styles and components
import StyledAppBar from 'styles/mui/component/StyledAppBar';
import QuickCreateMenu from './components/QuickCreateMenu';
import RecentActivity from './components/RecentActivity';
import SearchBar from './components/SearchBar';
// import TopbarSettings from './components/TopbarSettings';
import TopbarProfile from './components/TopbarProfile';
import 'styles/topbar/topbar.scss';

function TopBar({ open, handleToggleDrawer }) {
  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar className="no-print">
        <IconButton onClick={handleToggleDrawer}>
          <MenuIcon sx={{ color: 'black' }} />
        </IconButton>
        <Link className="topbar__logo" to="/" />

        <Box sx={{ width: '100%' }}>
          <Box className="topbar__middle">
            <Box className="d-flex align-items-center">
              <QuickCreateMenu />
              <RecentActivity />
            </Box>
            <SearchBar />
          </Box>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Box className="topbar__right">
            {/* <Box className="d-flex align-items-center justify-content-between">
              <TopbarSettings department="hr" />
            </Box> */}
            <TopbarProfile />
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
TopBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default TopBar;

import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import QuickCreateMenu from './components/QuickCreateMenu';
import RecentActivity from './components/RecentActivity';
import SearchBar from './components/SearchBar';
import TopbarSettings from './components/TopbarSettings';
import TopbarProfile from './components/TopbarProfile';
import 'styles/topbar.scss';

function TopBar({ handleToggleDrawer }) {
  return (
    <Toolbar>
      <IconButton onClick={handleToggleDrawer}>
        <MenuIcon sx={{ color: 'black' }} />
      </IconButton>
      <Link className="topbar__logo" to="/" />

      <Box sx={{ width: '100%' }}>
        <div className="topbar__middle">
          <div className="d-flex align-items-center">
            <QuickCreateMenu />
            <RecentActivity />
          </div>
          <SearchBar />
        </div>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <div className="topbar__right">
          <div className="d-flex align-items-center justify-content-between">
            <TopbarSettings department="hr" />
          </div>
          <TopbarProfile />
        </div>
        {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
      </Box>
    </Toolbar>
  );
}
TopBar.propTypes = {
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default TopBar;

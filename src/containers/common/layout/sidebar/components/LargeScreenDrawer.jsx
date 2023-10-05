/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import DrawerHeader from 'styles/mui/component/DrawerHeader';
import { useNavigate } from 'react-router';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StyledDrawer from 'styles/mui/component/StyledDrawer';
import { NavLink } from 'react-router-dom';
import SideBarChildLinks from './SideBarChildLinks';

function LargeScreenDrawer({
  open,
  setOpen,
  handleDrawerClose,
  checkActive,
  showSideBarChildLink,
  setShowSideBarChildLink,
  AccountantSideBarLinks,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <StyledDrawer className="d-none d-md-block" variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {AccountantSideBarLinks.map(sideBar => (
          <div key={sideBar.name}>
            <SideBarListItem
              // onMouseEnter={() => {
              //   setOpen(true);
              // }}
              // onMouseLeave={() => {
              //   setOpen(false);
              // }}
              key={sideBar.name}
              disablePadding
              selected={checkActive(sideBar.link)}
              sx={{ display: 'block' }}
            >
              <NavLink to={sideBar.link} style={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemButton
                  divider={sideBar.divider}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    if (sideBar.children) {
                      setOpen(true);
                      const temp = showSideBarChildLink;
                      temp[sideBar.index] = !showSideBarChildLink[sideBar.index];
                      setShowSideBarChildLink([...showSideBarChildLink]);
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1.2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {sideBar.icon}
                  </ListItemIcon>
                  <ListItemText primary={sideBar.name} sx={{ opacity: open ? 1 : 0 }} />
                  {sideBar.children && open && (
                    <KeyboardArrowRightIcon
                      className={showSideBarChildLink[sideBar.index] ? 'sidebar-parent-list-icon' : ''}
                    />
                  )}
                </ListItemButton>
              </NavLink>
            </SideBarListItem>
            {sideBar?.children?.length > 0 && showSideBarChildLink[sideBar.index] === true && (
              <SideBarChildLinks
                childList={sideBar.children}
                open={open}
                setOpen={setOpen}
                index={sideBar.index}
                checkActive={checkActive}
              />
            )}
          </div>
        ))}
      </List>
    </StyledDrawer>
  );
}
LargeScreenDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  AccountantSideBarLinks: PropTypes.array.isRequired,
  checkActive: PropTypes.func.isRequired,
  showSideBarChildLink: PropTypes.array.isRequired,
  setShowSideBarChildLink: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default LargeScreenDrawer;

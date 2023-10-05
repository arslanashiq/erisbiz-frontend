import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import DrawerHeader from 'styles/mui/component/DrawerHeader';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DRAWER_WIDTH } from 'utilities/constants';
import SideBarChildLinks from './SideBarChildLinks';

function SmallScreenDrawer({
  open,
  setOpen,
  AccountantSideBarLinks,
  checkActive,
  showSideBarChildLink,
  setShowSideBarChildLink,
}) {
  return (
    <Drawer
      className="small-screen-drawer d-block d-md-none d-print-none"
      variant="temporary"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DrawerHeader />
      <Divider />
      <List sx={{ width: DRAWER_WIDTH }}>
        {AccountantSideBarLinks.map(sideBar => (
          <div key={sideBar.name}>
            <SideBarListItem
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
                    pl: 2.5,
                  }}
                  onClick={() => {
                    if (sideBar.children) {
                      const temp = showSideBarChildLink;
                      temp[sideBar.index] = !showSideBarChildLink[sideBar.index];
                      setShowSideBarChildLink([...showSideBarChildLink]);
                    }
                    setOpen(true);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {sideBar.icon}
                  </ListItemIcon>
                  <ListItemText primary={sideBar.name} sx={{ opacity: open ? 1 : 0 }} />
                  {sideBar.children && showSideBarChildLink[sideBar.index] === false && (
                    <KeyboardArrowRightIcon sx={{ display: open ? 'auto' : 'none' }} />
                  )}
                  {sideBar.children && showSideBarChildLink[sideBar.index] === true && (
                    <KeyboardArrowDownIcon sx={{ display: open ? 'auto' : 'none' }} />
                  )}
                </ListItemButton>
              </NavLink>
            </SideBarListItem>
            {sideBar.children &&
              sideBar.children.length > 0 &&
              showSideBarChildLink[sideBar.index] === true && (
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
    </Drawer>
  );
}

SmallScreenDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  AccountantSideBarLinks: PropTypes.array.isRequired,
  checkActive: PropTypes.func.isRequired,
  showSideBarChildLink: PropTypes.array.isRequired,
  setShowSideBarChildLink: PropTypes.func.isRequired,
};

export default SmallScreenDrawer;

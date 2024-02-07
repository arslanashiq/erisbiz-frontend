import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Box, Divider, Drawer, List } from '@mui/material';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import DrawerHeader from 'styles/mui/component/DrawerHeader';
import SideBarChildLinks from './SideBarChildLinks';
import SideBarListItemButton from './SideBarListItemButton';

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
      className="small-screen-drawer d-block d-md-none no-print"
      variant="temporary"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DrawerHeader />
      <Divider />
      <List sx={{ width: '100%', paddingTop: 2 }}>
        {AccountantSideBarLinks.map(sideBar => {
          if (sideBar.name === 'space') {
            return (
              <Box key={sideBar.name} sx={{ padding: '10px 0px' }}>
                <Box sx={{ borderBottom: 1, borderBottomColor: 'silver' }} />
              </Box>
            );
          }
          return (
            <div key={sideBar.name}>
              <SideBarListItem
                key={sideBar.name}
                disablePadding
                selected={checkActive(sideBar.link)}
                sx={{ display: 'block' }}
              >
                {sideBar.children ? (
                  <SideBarListItemButton
                    sideBarListItem={sideBar}
                    open={open}
                    setOpen={setOpen}
                    showSideBarChildLink={showSideBarChildLink}
                    setShowSideBarChildLink={setShowSideBarChildLink}
                  />
                ) : (
                  <NavLink
                    to={sideBar.link}
                    style={{ color: 'inherit', textDecoration: 'none', width: '100%' }}
                  >
                    <SideBarListItemButton
                      sideBarListItem={sideBar}
                      open={open}
                      setOpen={setOpen}
                      showSideBarChildLink={showSideBarChildLink}
                      setShowSideBarChildLink={setShowSideBarChildLink}
                    />
                  </NavLink>
                )}
              </SideBarListItem>
              {sideBar?.children?.length > 0 && (
                <SideBarChildLinks
                  childList={sideBar.children}
                  open={open}
                  setOpen={setOpen}
                  index={sideBar.index}
                  checkActive={checkActive}
                  showSideBarChildLink={showSideBarChildLink}
                  setShowSideBarChildLink={setShowSideBarChildLink}
                />
              )}
            </div>
          );
        })}
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

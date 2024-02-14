import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
// styled components
import StyledDrawer from 'styles/mui/component/StyledDrawer';
import DrawerHeader from 'styles/mui/component/DrawerHeader';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
// components
import SideBarChildLinks from './SideBarChildLinks';
import SideBarListItemButton from './SideBarListItemButton';

function LargeScreenDrawer({
  open,
  setOpen,
  checkActive,
  AccountantSideBarLinks,
  handleChnageSideBarChildDisplay,
}) {
  return (
    <StyledDrawer className="no-print d-none d-md-block" variant="permanent" open={open}>
      <DrawerHeader />
      <Divider />
      <List sx={{ width: '100%', paddingTop: 2 }}>
        {AccountantSideBarLinks.map(sideBar => {
          if (sideBar.space) {
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
                    handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
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
                      handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
                    />
                  </NavLink>
                )}
              </SideBarListItem>

              {sideBar?.children?.length > 0 && (
                <SideBarChildLinks
                  open={open}
                  setOpen={setOpen}
                  sideBar={sideBar}
                  checkActive={checkActive}
                  handleChnageSideBarChildDisplay={handleChnageSideBarChildDisplay}
                />
              )}
            </div>
          );
        })}
      </List>
    </StyledDrawer>
  );
}
LargeScreenDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  AccountantSideBarLinks: PropTypes.array.isRequired,
  checkActive: PropTypes.func.isRequired,
  handleChnageSideBarChildDisplay: PropTypes.func.isRequired,
};

export default LargeScreenDrawer;

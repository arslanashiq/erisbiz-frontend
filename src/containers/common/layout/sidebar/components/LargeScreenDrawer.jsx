import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import { NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  handleDrawerClose,
  checkActive,
  showSideBarChildLink,
  setShowSideBarChildLink,
  AccountantSideBarLinks,
}) {
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
            {sideBar?.children?.length > 0 && showSideBarChildLink[sideBar.index] === true && (
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

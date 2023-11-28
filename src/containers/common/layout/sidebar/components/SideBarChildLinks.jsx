/* eslint-disable react/prop-types */
import React from 'react';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import { NavLink } from 'react-router-dom';
import SideBarListItemButton from './SideBarListItemButton';

function SideBarChildLinks({
  childList,
  open,
  checkActive,
  setOpen,
  showSideBarChildLink,
  setShowSideBarChildLink,
  index,
}) {
  return (
    <div className={showSideBarChildLink[index] === true ? 'show-transition' : 'hide-transition'}>
      {childList.map(child => (
        <SideBarListItem
          selected={checkActive(child.link)}
          key={child.name}
          disablePadding
          sx={{ display: open ? 'auto' : 'none' }}
        >
          <NavLink to={child.link} style={{ color: 'inherit', textDecoration: 'none', width: '100%' }}>
            <SideBarListItemButton
              sideBarListItem={child}
              open={open}
              setOpen={setOpen}
              showSideBarChildLink={showSideBarChildLink}
              setShowSideBarChildLink={setShowSideBarChildLink}
              isParent={false}
            />
          </NavLink>
        </SideBarListItem>
      ))}
    </div>
  );
}

export default SideBarChildLinks;

import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import { NavLink } from 'react-router-dom';

function SideBarChildLinks({ childList, open, checkActive }) {
  return childList.map(child => (
    <SideBarListItem
      selected={checkActive(child.link)}
      key={child.name}
      disablePadding
      sx={{ display: open ? 'auto' : 'none' }}
    >
      <NavLink to={child.link} style={{ color: 'inherit', textDecoration: 'none' }}>
        <ListItemButton
          divider={child.divider}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            paddingLeft: 6.5,
          }}
        >
          <ListItemText primary={child.name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </NavLink>
    </SideBarListItem>
  ));
}

export default SideBarChildLinks;

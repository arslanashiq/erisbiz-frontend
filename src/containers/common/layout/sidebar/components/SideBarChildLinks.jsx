import React from 'react';
import { useNavigate } from 'react-router';
import { ListItemButton, ListItemText } from '@mui/material';
import SideBarListItem from 'styles/mui/component/SideBarListItem';

function SideBarChildLinks({ childList, open, checkActive }) {
  const navigate = useNavigate();
  return childList.map(child => (
    <SideBarListItem
      // onMouseEnter={() => {
      //   setOpen(true);
      // }}
      // onMouseLeave={() => {
      //   setOpen(false);
      // }}
      selected={checkActive(child.link)}
      key={child.name}
      disablePadding
      sx={{ display: open ? 'auto' : 'none' }}
    >
      <ListItemButton
        divider={child.divider}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          paddingLeft: 8.5,
        }}
        onClick={() => {
          if (child.link) {
            navigate(child.link);
          }
        }}
      >
        <ListItemText primary={child.name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </SideBarListItem>
  ));
}

export default SideBarChildLinks;

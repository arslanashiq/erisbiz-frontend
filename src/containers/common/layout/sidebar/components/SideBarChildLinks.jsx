import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

function SideBarChildLinks({ childList, open, checkActive }) {
  const navigate = useNavigate();
  return childList.map(child => (
    <ListItem
      // onMouseEnter={() => {
      //   setOpen(true);
      // }}
      // onMouseLeave={() => {
      //   setOpen(false);
      // }}
      key={child.name}
      disablePadding
      sx={{ display: open ? 'auto' : 'none' }}
    >
      <ListItemButton
        divider={child.divider}
        selected={checkActive(child.link)}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 8.5,
        }}
        onClick={() => {
          if (child.link) {
            navigate(child.link);
          }
        }}
      >
        <ListItemText primary={child.name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ));
}

export default SideBarChildLinks;

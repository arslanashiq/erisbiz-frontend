import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

function SideBarListItemButton({
  sideBarListItem,
  open,
  setOpen,
  showSideBarChildLink,
  setShowSideBarChildLink,
  isParent,
}) {
  return (
    <ListItemButton
      divider={sideBarListItem.divider}
      sx={{
        maxHeight: 45,
        justifyContent: open ? 'initial' : 'center',
        px: isParent ? 2 : 0,
        paddingLeft: isParent ? 2 : 6,
      }}
      onClick={() => {
        if (sideBarListItem.children) {
          setOpen(true);
          const temp = showSideBarChildLink;
          temp[sideBarListItem.index] = !showSideBarChildLink[sideBarListItem.index];
          setShowSideBarChildLink([...showSideBarChildLink]);
        }
      }}
    >
      {sideBarListItem.icon && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 1.2 : 'auto',
            justifyContent: 'center',
          }}
        >
          {sideBarListItem.icon}
        </ListItemIcon>
      )}
      <ListItemText primary={sideBarListItem.name} sx={{ opacity: open ? 1 : 0, fontWeight: 500 }} />
      {sideBarListItem.children && open && (
        <KeyboardArrowRightIcon
          className={showSideBarChildLink[sideBarListItem.index] ? 'sidebar-parent-list-icon' : ''}
        />
      )}
    </ListItemButton>
  );
}
SideBarListItemButton.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  sideBarListItem: PropTypes.object.isRequired,
  showSideBarChildLink: PropTypes.array.isRequired,
  setShowSideBarChildLink: PropTypes.func.isRequired,
  isParent: PropTypes.bool,
};
SideBarListItemButton.defaultProps = {
  isParent: true,
};
export default SideBarListItemButton;

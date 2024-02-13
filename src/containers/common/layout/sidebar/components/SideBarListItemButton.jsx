import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SideBarListItemButtonWrapper from './SideBarListItemButtonWrapper';

function SideBarListItemButton({
  sideBarListItem,
  open,
  setOpen,
  handleChnageSideBarChildDisplay,
  isParent,
  nestingLevel,
}) {
  return (
    <SideBarListItemButtonWrapper open={open} title={sideBarListItem.name}>
      <ListItemButton
        divider={sideBarListItem.divider}
        sx={{
          height: 45,
          justifyContent: open ? 'initial' : 'center',
          px: isParent ? 2 : 0,
          paddingLeft: nestingLevel >= 1 ? nestingLevel * 6 : 2,
        }}
        onClick={() => {
          if (sideBarListItem.children) {
            setOpen(true);
            handleChnageSideBarChildDisplay(sideBarListItem.name);
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
        {open && <ListItemText primary={sideBarListItem.name} sx={{ fontWeight: 500 }} />}
        {sideBarListItem.children && open && (
          <KeyboardArrowRightIcon
            className={sideBarListItem.showChildren ? 'sidebar-parent-list-icon' : ''}
          />
        )}
      </ListItemButton>
    </SideBarListItemButtonWrapper>
  );
}
SideBarListItemButton.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  sideBarListItem: PropTypes.object.isRequired,
  handleChnageSideBarChildDisplay: PropTypes.func.isRequired,
  isParent: PropTypes.bool,
  nestingLevel: PropTypes.number,
};
SideBarListItemButton.defaultProps = {
  isParent: true,
  nestingLevel: 0,
};
export default SideBarListItemButton;

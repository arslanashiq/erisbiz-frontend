import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Stack } from '@mui/material';

function ActionMenu({ anchorEl, setAnchorEl, actionsList }) {
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="text-capitalize"
      >
        Perform Action <KeyboardArrowDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Stack sx={{ minWidth: 130 }}>
          {actionsList.map(action => (
            <MenuItem onClick={action.handleClick}>{action.label}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
}
ActionMenu.propTypes = {
  anchorEl: PropTypes.element.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  actionsList: PropTypes.array.isRequired,
};
export default ActionMenu;

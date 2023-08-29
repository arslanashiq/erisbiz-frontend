import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Stack } from '@mui/material';

function ActionMenu({ buttonTitle, actionsList, variant }) {
  const [anchorEl, setAnchorEl] = useState(null);

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
        variant={variant}
      >
        {buttonTitle} <KeyboardArrowDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <Stack sx={{ minWidth: 130 }}>
          {actionsList.map(action => (
            <MenuItem
              className="text-capitalize"
              key={action.label}
              onClick={() => {
                handleClose();
                action.handleClick(action.label);
              }}
            >
              {action.label}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
}
ActionMenu.propTypes = {
  buttonTitle: PropTypes.string,
  actionsList: PropTypes.array,
  variant: PropTypes.string,
};
ActionMenu.defaultProps = {
  buttonTitle: 'Perform Action',
  actionsList: [],
  variant: 'contained',
};
export default ActionMenu;

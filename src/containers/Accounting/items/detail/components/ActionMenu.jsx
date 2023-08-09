import React from 'react';
import { Menu, MenuItem, Stack } from '@mui/material';
import PropTypes from 'prop-types';

function ActionMenu({ anchorEl, handleClose, handleClickEdit }) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <Stack sx={{ minWidth: 130 }}>
        <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Stack>
    </Menu>
  );
}
ActionMenu.propTypes = {
  anchorEl: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
};
export default ActionMenu;

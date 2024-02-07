import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';

function SideBarListItemButtonWrapper({ open, title, children }) {
  if (open) {
    return children;
  }
  return (
    <Tooltip title={title} arrow placement="right">
      {children}
    </Tooltip>
  );
}

export default SideBarListItemButtonWrapper;

SideBarListItemButtonWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

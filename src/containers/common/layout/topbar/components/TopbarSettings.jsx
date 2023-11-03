import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import {
  topbarSettingMenuItem,
  topbarSettingMenuItemLink,
  topbarSettingMenuItemOption,
} from 'styles/mui/common/layouts/topbar/components/topbar-setting';

const settingOptions = [
  {
    title: 'Opening Balance',
    path: '/pages/accounting/openingBalance',
  },
  {
    title: 'Stamp and Signature',
    path: '/pages/accounting/stampAndSignature',
  },
  {
    title: 'Requester Signature',
    path: '/pages/accounting/uploadSignature',
  },
];
function TopbarSettings() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Setting" placement="bottom" arrow>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <SettingsIcon className="clr-add" />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box>
          {settingOptions.map(option => (
            <MenuItem key={option.title} sx={topbarSettingMenuItem}>
              <Link style={topbarSettingMenuItemLink} to={option.path}>
                <Typography sx={topbarSettingMenuItemOption}>{option.title}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
}

export default TopbarSettings;

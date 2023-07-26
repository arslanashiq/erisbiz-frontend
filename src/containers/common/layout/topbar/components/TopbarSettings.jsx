import * as React from 'react';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton, Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import 'styles/topbar-setting.scss';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
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
        <Box className="topbar-setting">
          {settingOptions.map(option => (
            <MenuItem className="topbar-setting-menu-item">
              <Link className="topbar-setting-menu-item-link" to={option.path}>
                <Typography className="topbar-setting-menu-item-option">{option.title}</Typography>
              </Link>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
}

export default TopbarSettings;

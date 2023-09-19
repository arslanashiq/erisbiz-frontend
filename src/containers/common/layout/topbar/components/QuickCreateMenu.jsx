import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import RedeemIcon from '@mui/icons-material/Redeem';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { generalOptions, purchaseOptions, salesOptions } from '../utilities/constant';
import 'styles/topbar/quick-create-menu.scss';

function QuickCreateMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Quick Create" placement="bottom" arrow>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AddCircleIcon className="clr-add" />
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
        <Box display="flex" className="quick-create-menu">
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
              <MenuIcon />
              <Typography className="quick-create-menu-header">GENERAL</Typography>
            </Stack>

            {generalOptions.map(option => (
              <Stack
                direction="row"
                key={option.label}
                style={{ textDecoration: 'none' }}
                onClick={handleClose}
              >
                <MenuItem className="menu-item">
                  <AddIcon className="menu-item-icon" />
                  <Typography className="menu-item-label">{option.label}</Typography>
                </MenuItem>
              </Stack>
            ))}
          </Box>

          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
              <RedeemIcon />
              <Typography className="quick-create-menu-header">SALES</Typography>
            </Stack>

            {salesOptions.map(option => (
              <Link key={option.label} style={{ textDecoration: 'none' }} to={option.to}>
                <MenuItem className="menu-item">
                  <AddIcon className="menu-item-icon" />
                  <Typography className="menu-item-label">{option.label}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
              <ShoppingBasketIcon />
              <Typography className="quick-create-menu-header">PURCHASE</Typography>
            </Stack>

            {purchaseOptions.map(option => (
              <Link key={option.label} style={{ textDecoration: 'none' }} to={option.to}>
                <MenuItem className="menu-item">
                  <AddIcon className="menu-item-icon" />
                  <Typography className="menu-item-label">{option.label}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>
        </Box>
      </Menu>
    </div>
  );
}

export default QuickCreateMenu;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = link => {
    setAnchorEl(null);
    if (link) {
      setTimeout(() => {
        navigate(link);
      }, 500);
    }
  };
  const handleLinkClick = link => {
    handleClose(link);
  };
  const renderMenuItem = option => (
    <Stack
      direction="row"
      key={option.label}
      style={{ textDecoration: 'none' }}
      onClick={() => handleLinkClick(option.to)}
    >
      <MenuItem className="menu-item">
        <AddIcon className="menu-item-icon" />
        <Typography className="menu-item-label">{option.label}</Typography>
      </MenuItem>
    </Stack>
  );

  return (
    <div>
      <Tooltip title="Quick Create" placement="bottom" arrow>
        <IconButton onClick={handleClick}>
          <AddCircleIcon className="clr-add" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl || false}
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

            {generalOptions.map(option => renderMenuItem(option))}
          </Box>

          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
              <RedeemIcon />
              <Typography className="quick-create-menu-header">SALES</Typography>
            </Stack>

            {salesOptions.map(option => renderMenuItem(option))}
          </Box>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
              <ShoppingBasketIcon />
              <Typography className="quick-create-menu-header">PURCHASE</Typography>
            </Stack>

            {purchaseOptions.map(option => renderMenuItem(option))}
          </Box>
        </Box>
      </Menu>
    </div>
  );
}

export default QuickCreateMenu;

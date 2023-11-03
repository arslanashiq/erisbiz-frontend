import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import RedeemIcon from '@mui/icons-material/Redeem';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import {
  menuItem,
  menuItemIcon,
  menuItemLabel,
  quickCreateMenu,
  quickCreateMenuHeader,
} from 'styles/mui/common/layouts/topbar/components/quick-create-menu';
import { generalOptions, purchaseOptions, salesOptions } from '../utilities/constant';

function QuickCreateMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLinkClick = link => {
    setAnchorEl(null);
    if (link) {
      setTimeout(() => {
        navigate(link);
      }, 500);
    }
  };
  const renderMenuItem = option => (
    <Stack
      direction="row"
      key={option.label}
      style={{ textDecoration: 'none' }}
      onClick={() => handleLinkClick(option.to)}
    >
      <MenuItem sx={menuItem}>
        <AddIcon sx={menuItemIcon} />
        <Typography sx={menuItemLabel}>{option.label}</Typography>
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
        <Box display="flex" sx={quickCreateMenu}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <MenuIcon />
              <Typography sx={quickCreateMenuHeader}>GENERAL</Typography>
            </Stack>

            {generalOptions.map(option => renderMenuItem(option))}
          </Box>

          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <RedeemIcon />
              <Typography sx={quickCreateMenuHeader}>SALES</Typography>
            </Stack>

            {salesOptions.map(option => renderMenuItem(option))}
          </Box>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <ShoppingBasketIcon />
              <Typography sx={quickCreateMenuHeader}>PURCHASE</Typography>
            </Stack>

            {purchaseOptions.map(option => renderMenuItem(option))}
          </Box>
        </Box>
      </Menu>
    </div>
  );
}

export default QuickCreateMenu;

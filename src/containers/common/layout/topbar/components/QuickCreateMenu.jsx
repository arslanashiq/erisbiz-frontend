import * as React from 'react';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import RedeemIcon from '@mui/icons-material/Redeem';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import 'styles/quick-create-menu.scss';

const generalOptions = [
  { label: 'Item', to: '/pages/accounting/items/add' },
  { label: 'Journal Entry', to: '/pages/accounting/accountant/journals/add' },
  { label: 'Bank Account', to: '/pages/accounting/banking/add' },
];
const salesOptions = [
  { label: 'Account', to: '/pages/accounting/sales/accounts/add' },
  { label: 'Customer', to: '/pages/accounting/sales/customers/add' },
  { label: 'Quotation', to: '/pages/accounting/sales/quotations/add' },
  { label: 'Proforma Invoice', to: '/pages/accounting/sales/proforma-invoices/add' },
  { label: 'Invoice', to: '/pages/accounting/sales/invoices/add' },
  { label: 'Payment Received', to: '/pages/accounting/sales/payments-received/add' },
  { label: 'Credit Note', to: '/pages/accounting/sales/credit-notes/add' },
];
const purchaseOptions = [
  { label: 'Supplier', to: '/pages/accounting/purchases/suppliers/add' },
  { label: 'Expense', to: '/pages/accounting/purchases/expenses/add' },
  { label: 'Purchase Order', to: '/pages/accounting/purchases/purchase-order/add' },
  { label: 'Bill', to: '/pages/accounting/purchases/bills/add' },
  { label: 'Payment Made', to: '/pages/accounting/purchases/payments-made/add' },
  { label: 'Debit Note', to: '/pages/accounting/purchases/supplier-credits/add' },
];
function QuickCreateMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
              <MenuItem key={option.label} className="menu-item">
                <AddIcon className="menu-item-icon" />
                <Link style={{ textDecoration: 'none' }} to={option.to}>
                  <Typography className="menu-item-label">{option.label}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>

          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
              <RedeemIcon />
              <Typography className="quick-create-menu-header">SALES</Typography>
            </Stack>

            {salesOptions.map(option => (
              <MenuItem key={option.label} className="menu-item">
                <AddIcon className="menu-item-icon" />
                <Link style={{ textDecoration: 'none' }} to={option.to}>
                  <Typography className="menu-item-label">{option.label}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginBottom: 2 }}>
              <ShoppingBasketIcon />
              <Typography className="quick-create-menu-header">PURCHASE</Typography>
            </Stack>

            {purchaseOptions.map(option => (
              <MenuItem key={option.label} className="menu-item">
                <AddIcon className="menu-item-icon" />
                <Link style={{ textDecoration: 'none' }} to={option.to}>
                  <Typography className="menu-item-label">{option.label}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>
        </Box>
      </Menu>
    </div>
  );
}

export default QuickCreateMenu;

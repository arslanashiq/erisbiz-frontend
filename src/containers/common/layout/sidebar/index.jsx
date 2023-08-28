import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Outlet, useLocation } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DrawerHeader from 'styles/mui/component/DrawerHeader';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { CssBaseline } from '@mui/material';
import LargeScreenDrawer from './components/LargeScreenDrawer';
import SmallScreenDrawer from './components/SmallScreenDrawer';

const AccountantSideBarLinks = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/',
    divider: true,
  },
  {
    name: 'Bank Master',
    icon: <AccountBalanceIcon />,
    link: '/pages/accounting/banking',
  },
  {
    name: 'Item Master',
    icon: <ShoppingBasketOutlinedIcon />,
    link: '/pages/accounting/items',
  },
  {
    name: 'Brands',
    icon: <ShoppingBasketIcon />,
    link: '/pages/accounting/brands',
  },

  {
    name: 'Purchase',
    icon: <CardGiftcardIcon />,
    index: 0,
    children: [
      { name: 'Supplier Master', link: '/pages/accounting/purchase/suppliers' },
      { name: 'Purchase Order', link: '/pages/accounting/purchase/purchase-orders' },
      { name: 'Purchase Invoice', link: '/pages/accounting/purchase/purchase-invoice' },
      { name: 'Debit Notes', link: '/pages/accounting/purchase/debit-notes' },
      { name: 'Expense', link: '/pages/accounting/purchase/expenses' },
    ],
  },
  {
    name: 'Sales',
    icon: <EqualizerIcon />,
    index: 1,
    children: [
      { name: 'Customer Master', link: '/pages/accounting/sales/customers' },
      { name: 'Quotation', link: '/pages/accounting/sales/quotations' },
      { name: 'Proforma Invoice', link: '/pages/accounting/sales/performa-invoice' },
      { name: 'Sales Invoice', link: '/pages/accounting/sales/invoice' },
      { name: 'Receipt Voucher', link: '/pages/accounting/sales/receipt-voucher' },
      { name: 'Sales Credit Note', link: '/pages/accounting/sales/credit-notes' },
    ],
  },
  {
    name: 'Finance',
    icon: <CurrencyExchangeIcon />,
    index: 1,
    children: [
      { name: 'Chart of Account', link: '/pages/accounting/finance/chart-of-account' },
      { name: 'Journal Voucher', link: '/pages/accounting/sfinance/journal-voucher' },
      { name: 'Tax Payment', link: '/pages/accounting/finance/tax-payments' },
    ],
  },
  {
    name: 'Reports',
    icon: <DocumentScannerIcon />,
    link: '/pages/reports',
  },
];

function Sidebar({ open, setOpen, handleToggleDrawer }) {
  const location = useLocation();

  const [showSideBarChildLink, setShowSideBarChildLink] = React.useState([false, false]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const checkActive = link => {
    if (location.pathname === link) return true;
    return false;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SmallScreenDrawer
        open={open}
        setOpen={setOpen}
        showSideBarChildLink={showSideBarChildLink}
        setShowSideBarChildLink={setShowSideBarChildLink}
        handleToggleDrawer={handleToggleDrawer}
        handleDrawerClose={handleDrawerClose}
        checkActive={checkActive}
        AccountantSideBarLinks={AccountantSideBarLinks}
        DrawerHeader={DrawerHeader}
      />
      <LargeScreenDrawer
        open={open}
        setOpen={setOpen}
        showSideBarChildLink={showSideBarChildLink}
        setShowSideBarChildLink={setShowSideBarChildLink}
        handleToggleDrawer={handleToggleDrawer}
        handleDrawerClose={handleDrawerClose}
        checkActive={checkActive}
        AccountantSideBarLinks={AccountantSideBarLinks}
        DrawerHeader={DrawerHeader}
      />
      <Box
        component="main"
        sx={{
          width: {
            sm: '100%',
            md: `calc(100% - ${open ? '240' : '65'}px)`,
          },
        }}
        className="main-wrapper"
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};
export default Sidebar;

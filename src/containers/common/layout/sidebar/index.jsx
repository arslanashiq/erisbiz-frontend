import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Outlet, useLocation } from 'react-router';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import DrawerHeader from 'styles/mui/component/DrawerHeader';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { CssBaseline } from '@mui/material';
import LargeScreenDrawer from './components/LargeScreenDrawer';
import SmallScreenDrawer from './components/SmallScreenDrawer';

const AccountantSideBarLinks = [
  {
    name: 'Dashboard',
    icon: <SpaceDashboardIcon />,
    link: '/',
    divider: true,
  },
  {
    name: 'Banking',
    icon: <AccountBalanceIcon />,
    link: '/pages/accounting/banking',
  },
  {
    name: 'Brands',
    icon: <ShoppingBasketIcon />,
    link: '/pages/accounting/brands',
  },
  {
    name: 'Item Master',
    icon: <ShoppingBasketIcon />,
    link: '/pages/accounting/items',
  },
  {
    name: 'Purchase',
    icon: <CardGiftcardIcon />,
    index: 0,
    children: [
      { name: 'Suppliers', link: '/pages/accounting/purchase/suppliers' },
      { name: 'Purchase Order', link: '/pages/accounting/purchase/purchase-orders' },
      { name: 'Purchase Invoice', link: '/pages/accounting/purchase/purchase-invoice' },
      { name: 'Debit Notes', link: '/pages/accounting/purchase/debit-notes' },
      { name: 'Expense Entry', link: '/pages/accounting/purchase/expenses' },
    ],
  },
  // {
  //   name: 'Sales',
  //   icon: <CardGiftcardIcon />,
  //   index: 1,
  //   children: [
  //     { name: 'Accounts', link: '/pages/accounting/sales/accounts' },
  //     { name: 'Customers', link: '/pages/accounting/sales/customers' },
  //   ],
  // },
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

/* eslint-disable indent */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
// import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SideBarListItem from 'styles/mui/component/SideBarListItem';
import SideBarChildLinks from './components/SideBarChildLinks';
import TopBar from '../topbar';

const drawerWidth = 240;
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
  // {
  //   name: 'Brands',
  //   icon: <GridViewIcon />,
  //   link: '/pages/accounting/brands',
  // },
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

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [showSideBarChildLink, setShowSideBarChildLink] = React.useState([false, false]);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  const checkActive = link => {
    if (location.pathname === link) return true;
    return false;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <TopBar handleToggleDrawer={handleToggleDrawer} />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {AccountantSideBarLinks.map(sideBar => (
            <>
              <SideBarListItem
                // onMouseEnter={() => {
                //   setOpen(true);
                // }}
                // onMouseLeave={() => {
                //   setOpen(false);
                // }}
                key={sideBar.link}
                disablePadding
                selected={checkActive(sideBar.link)}
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  divider={sideBar.divider}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    if (sideBar.link) {
                      navigate(sideBar.link);
                    } else {
                      showSideBarChildLink[sideBar.index] = !showSideBarChildLink[sideBar.index];
                      setShowSideBarChildLink([...showSideBarChildLink]);
                    }
                    setOpen(true);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {sideBar.icon}
                  </ListItemIcon>
                  <ListItemText primary={sideBar.name} sx={{ opacity: open ? 1 : 0 }} />
                  {sideBar.children && showSideBarChildLink[sideBar.index] === false && (
                    <KeyboardArrowRightIcon sx={{ display: open ? 'auto' : 'none' }} />
                  )}
                  {sideBar.children && showSideBarChildLink[sideBar.index] === true && (
                    <KeyboardArrowDownIcon sx={{ display: open ? 'auto' : 'none' }} />
                  )}
                </ListItemButton>
              </SideBarListItem>
              {sideBar.children &&
                sideBar.children.length > 0 &&
                showSideBarChildLink[sideBar.index] === true && (
                  <SideBarChildLinks
                    childList={sideBar.children}
                    open={open}
                    setOpen={setOpen}
                    index={sideBar.index}
                    checkActive={checkActive}
                  />
                )}
            </>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }} className="container-fluid main-wrapper">
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Sidebar;

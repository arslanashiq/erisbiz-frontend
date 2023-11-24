import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

const SideBarLinksList = [
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
    name: 'Category',
    icon: <ShoppingBasketIcon />,
    link: '/pages/accounting/category',
  },
  {
    name: 'Brands',
    icon: <ShoppingBasketIcon />,
    link: '/pages/accounting/brands',
  },
  {
    name: 'Item Master',
    icon: <ShoppingBasketOutlinedIcon />,
    link: '/pages/accounting/items',
  },

  {
    name: 'Purchase',
    icon: <CardGiftcardIcon />,
    index: 0,
    // link: '/pages/accounting/purchase',
    children: [
      { name: 'Supplier Master', link: '/pages/accounting/purchase/suppliers' },
      { name: 'Purchase Order', link: '/pages/accounting/purchase/purchase-orders' },
      { name: 'Purchase Invoice', link: '/pages/accounting/purchase/purchase-invoice' },
      { name: 'Payment Voucher', link: '/pages/accounting/purchase/payment-voucher' },
      { name: 'Purchase Debit Notes', link: '/pages/accounting/purchase/debit-notes' },
      { name: 'Expense', link: '/pages/accounting/purchase/expenses' },
    ],
  },
  {
    name: 'Sales',
    icon: <EqualizerIcon />,
    index: 1,
    // link: '/pages/accounting/sales',
    children: [
      { name: 'Customer Master', link: '/pages/accounting/sales/customers' },
      { name: 'Quotation', link: '/pages/accounting/sales/quotations' },
      { name: 'Proforma Invoice', link: '/pages/accounting/sales/proforma-invoice' },
      { name: 'Sales Invoice', link: '/pages/accounting/sales/sale-invoice' },
      { name: 'Receipt Voucher', link: '/pages/accounting/sales/receipt-voucher' },
      { name: 'Sales Credit Note', link: '/pages/accounting/sales/credit-notes' },
    ],
  },
  {
    name: 'Finance',
    icon: <CurrencyExchangeIcon />,
    index: 2,
    // link: '/pages/accounting/finance',
    children: [
      { name: 'Chart of Account', link: '/pages/accounting/finance/chart-of-account' },
      { name: 'Journal Voucher', link: '/pages/accounting/finance/journal-voucher' },
      { name: 'Tax Payment', link: '/pages/accounting/finance/tax-payments' },
    ],
  },
  {
    name: 'Reports',
    icon: <DocumentScannerIcon />,
    link: '/pages/reports',
  },
];

export default SideBarLinksList;

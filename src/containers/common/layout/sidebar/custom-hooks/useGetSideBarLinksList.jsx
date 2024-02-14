/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useLocation } from 'react-router';

function useGetSideBarLinksList() {
  const location = useLocation();
  const [SideBarLinksList, setSideBarLinksList] = useState([
    {
      name: 'Dashboard',
      icon: <DashboardOutlinedIcon />,
      link: '/',
    },

    {
      space: true,
      divider: true,
    },
    {
      name: 'Bank Master',
      icon: <AccountBalanceIcon />,
      link: '/pages/accounting/banking',
    },
    {
      name: 'Category',
      icon: <CategoryOutlinedIcon />,
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
      showChildren: false,
      // link: '/pages/accounting/purchase',
      children: [
        { name: 'Supplier Master', link: '/pages/accounting/purchase/suppliers' },
        { name: 'Purchase Order', link: '/pages/accounting/purchase/purchase-orders' },
        { name: 'Purchase Invoice', link: '/pages/accounting/purchase/purchase-invoice' },
        { name: 'Payment Voucher', link: '/pages/accounting/purchase/payment-voucher' },
        { name: 'Purchase Debit Notes', link: '/pages/accounting/purchase/debit-notes' },
        {
          name: 'Expense',
          link: '/pages/accounting/purchase/expenses',
        },
      ],
    },
    {
      name: 'Sales',
      icon: <EqualizerIcon />,
      index: 1,
      showChildren: false,

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
      showChildren: false,
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
  ]);
  const handleGetUpdatedSideBarLinksList = (list, name, status) =>
    list.map(sideBar => {
      if (sideBar?.children?.length > 0) {
        if (sideBar.name === name) {
          const newSideBar = { ...sideBar, showChildren: status || !sideBar.showChildren };
          return newSideBar;
        }
        const newSideBar = {
          ...sideBar,
          children: handleGetUpdatedSideBarLinksList(sideBar.children, name, status),
        };
        return newSideBar;
      }
      return sideBar;
    });

  const handleChnageSideBarChildDisplay = (name, status = null) => {
    if (!name) return;
    const newSideBarLinksList = handleGetUpdatedSideBarLinksList(SideBarLinksList, name, status);
    setSideBarLinksList(newSideBarLinksList);
  };

  const checkActive = link => {
    // if (location.pathname === link) return true;
    // return false;

    // // for parent also selected
    if (location.pathname === '/' && link === '/') return true;
    if (location.pathname === '/' || link === '/') return false;
    if (location.pathname.includes(link)) return true;
    return false;
  };

  const openSelectedSideBar = oldList => {
    try {
      let isActive = false;
      const newList = oldList.map(sideBarItem => {
        if (checkActive(sideBarItem.link)) {
          isActive = true;
          return { ...sideBarItem, showChildren: true };
        }
        if (sideBarItem?.children?.length > 0) {
          const { status, list } = openSelectedSideBar(sideBarItem.children);
          if (status) {
            isActive = status;
            return { ...sideBarItem, children: list, showChildren: true };
          }
        }
        return sideBarItem;
      });
      return {
        list: newList,
        status: isActive,
      };
    } catch (error) {
      return { list: oldList, status: false };
      //
    }
  };
  useEffect(() => {
    const { list: newSideBarList } = openSelectedSideBar(SideBarLinksList);
    setSideBarLinksList(newSideBarList);
  }, []);

  return {
    checkActive,
    SideBarLinksList,
    setSideBarLinksList,
    openSelectedSideBar,
    handleChnageSideBarChildDisplay,
  };
}

export default useGetSideBarLinksList;

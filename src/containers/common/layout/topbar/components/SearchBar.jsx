import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DoneIcon from '@mui/icons-material/Done';
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import useClickOutside from '../custom-hooks/useClickOutside';
import 'styles/topbar/topbar-search-menu.scss';

const searchOptions = [
  { link: 'brands', label: 'Brand' },
  { link: 'banking', label: 'Bank Master' },
  { link: 'category', label: 'Category' },
  { link: 'items', label: 'Item Master' },
  { link: 'purchase/suppliers', label: 'Supplier Master' },
  { link: 'purchase/purchase-order', label: 'Purchase Order' },
  { link: 'purchase/purchase-invoice', label: 'Purchase Invoice' },
  { link: 'purchase/payment-voucher', label: 'Payments Voucher' },
  { link: 'purchase/debit-note', label: 'Debit Note' },
  { link: 'purchase/expenses', label: 'Expenses' },
  { link: 'sales/customers', label: 'Customer Master' },
  { link: 'sales/quotations', label: 'Quotation' },
  { link: 'sales/proforma-invoice', label: 'Proforma Invoice' },
  { link: 'sales/sale-invoice', label: 'Sales Invoice' },
  { link: 'sales/receipt-voucher', label: 'Receipt Voucher' },
  { link: 'sales/credit-note', label: 'Credit Note' },
  { link: 'finance/chart-of-account', label: 'Chart of Account' },
  { link: 'finance/journal-voucher', label: 'Journal Voucher' },
  { link: 'finance/tax-payments', label: 'Tax Payments' },
];

function SearchBar() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const componentRef = useRef();
  const { pathname, search } = useLocation();
  const query = new URLSearchParams(search);

  const searchQuery = query.get('query');

  const [selectedPage, setSelectedPage] = useState(searchOptions[0]);
  const [showMenu, setMenu] = useState(false);
  const [searchText, setSearchText] = useState(searchQuery || '');
  const [showResetBtn, setResetBtn] = useState(!!searchQuery);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeDropDown = () => setMenu(false);

  useClickOutside(componentRef, showMenu, closeDropDown);

  useEffect(() => {
    if (!searchQuery) {
      setResetBtn(false);
      setSearchText('');
    }
  }, [searchQuery]);

  useEffect(() => {
    const currentPage = searchOptions.find(item => pathname.includes(item.link));

    if (currentPage) {
      setSelectedPage(currentPage);
    } else {
      setSelectedPage(searchOptions[1]);
    }
  }, [pathname]);

  const handleSelect = useCallback(item => {
    setSelectedPage(item);
    handleClose();
  }, []);
  const handleSearch = keyCode => {
    if (keyCode === 13) {
      if (searchText) {
        navigate({
          pathname: `/pages/accounting/${selectedPage.link}`,
          search: `query=${searchText}`,
        });
        setResetBtn(true);
      } else {
        navigate(`/pages/accounting/${selectedPage.link}`);
        setResetBtn(false);
      }
      // setSearchText('');
    }
  };

  const handleReset = () => {
    navigate(`/pages/accounting/${selectedPage.link}`);
    setSearchText('');
    setResetBtn(false);
  };

  return (
    <div ref={componentRef} className="topbar__search px-3">
      <Stack direction="row" className="search-menu-dropdown" onClick={handleClick}>
        <SearchIcon sx={{ fontSize: 18 }} className="clr-add" />
        <ArrowDropDownIcon sx={{ fontSize: 20 }} className="clr-add menudown-icon" />
        <Typography className="dropdown-label">{selectedPage.label}</Typography>
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box className="search-option-menu">
          {searchOptions.map(item => (
            <MenuItem key={item.link} onClick={() => handleSelect(item)}>
              <DoneIcon
                className="check-icon"
                sx={{ fontSize: 18, opacity: selectedPage.link === item.link ? 1 : 0 }}
              />
              <Typography sx={{ fontSize: 14 }}>{item.label}</Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
      <input
        className="topbar__search-field"
        name="search"
        autoComplete="off"
        autoSave="off"
        placeholder={`Search in ${selectedPage.label}`}
        ref={inputRef}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onFocus={() => setMenu(false)}
        onKeyUp={e => handleSearch(e.keyCode)}
      />
      {showResetBtn && (
        <span className="topbar__search-reset-btn" role="button" tabIndex={0} onClick={handleReset}>
          Reset
        </span>
      )}
    </div>
  );
}

export default memo(SearchBar);

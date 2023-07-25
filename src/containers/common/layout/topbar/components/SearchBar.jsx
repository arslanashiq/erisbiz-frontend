import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DoneIcon from '@mui/icons-material/Done';
import useClickOutside from './custom-hooks/useClickOutside';

const searchOptions = [
  { link: 'items', label: 'Items' },
  { link: 'sales/accounts', label: 'Accounts' },
  { link: 'sales/customers', label: 'Customers' },
  { link: 'sales/quotations', label: 'Quotations' },
  { link: 'sales/proInvoices', label: 'Proforma Invoices' },
  { link: 'sales/invoices', label: 'Invoices' },
  { link: 'sales/paymentsReceived', label: 'Payments Received' },
  { link: 'sales/creditNotes', label: 'Credit Notes' },
  { link: 'purchases/suppliers', label: 'Suppliers' },
  { link: 'purchases/expenses', label: 'Expenses' },
  { link: 'purchases/purOrders', label: 'Purchase Orders' },
  { link: 'purchases/bills', label: 'Bills' },
  { link: 'purchases/paymentsMade', label: 'Payments Made' },
  { link: 'purchases/supplierCredits', label: 'Debit Notes' },
  { link: 'accountant/journals', label: 'Manual Journals' },
];

function SearchBar() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const componentRef = useRef();
  const { pathname, search } = useLocation();
  const query = new URLSearchParams(search);

  const searchQuery = query.get('query');

  const [selectedPage, setSelectedPage] = useState(searchOptions[1]);
  const [showMenu, setMenu] = useState(false);
  const [searchText, setSearchText] = useState(searchQuery || '');
  const [showResetBtn, setResetBtn] = useState(!!searchQuery);

  const toggleMenu = () => setMenu(prevState => !prevState);

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

  const handleSelect = item => {
    setSelectedPage(item);
    setMenu(false);
    inputRef.current.focus();
  };

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
      <span className="topbar__search-dropdown">
        <span className="topbar__search-dropdown--head" role="button" tabIndex={0} onClick={toggleMenu}>
          <SearchIcon sx={{ fontSize: 18 }} className="clr-add" />
          <ArrowDropDownIcon sx={{ fontSize: 20 }} className="clr-add menudown-icon" />
          <span className="dropdown-label">{selectedPage.label}</span>
        </span>
        <div className={`topbar__search-dropdown--menu${showMenu ? ' show' : ''}`}>
          {searchOptions.map(item => (
            <button key={item.link} type="button" onClick={() => handleSelect(item)}>
              {selectedPage.link === item.link && <DoneIcon className="check-icon" x={{ fontSize: 18 }} />}
              {item.label}
            </button>
          ))}
        </div>
      </span>
      <input
        className="topbar__search-field"
        name="search"
        autoComplete="off"
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

export default SearchBar;

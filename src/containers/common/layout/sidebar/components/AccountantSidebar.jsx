import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

function AccountantSidebar({ handleClick, isAccountingStaff, isAccountingController }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(false);
  const toggleSubSidebar = () => setIsSubSidebarOpen(!isSubSidebarOpen);

  return (
    <>
      {isSubSidebarOpen && (
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isSubSidebarOpen}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
            classNames="fade"
          >
            <>
              <ul className="sidebar__block">
                <NavLink
                  to="#"
                  onClick={() => {
                    const lastURL = localStorage.getItem('lastURL');
                    localStorage.setItem('lastURL', '');
                    toggleSubSidebar();
                    // history.push not working
                    navigate(lastURL);
                    // Temporary purpose
                    window.location.href = lastURL;
                  }}
                >
                  <li className="sidebar__link custom-sidebar-link">
                    <span className="sidebar__link-icon lnr lnr-arrow-left custom-text-primary" />
                    <p className="sidebar__link-title custom-text-primary">Back</p>
                  </li>
                </NavLink>
              </ul>
              <ul className="sidebar__block">
                {isAccountingController && (
                  <SidebarLink
                    title="Employee Salaries"
                    route="/pages/accounting/salaries"
                    icon="money-bill-alt"
                    onClick={handleClick}
                  />
                )}
                {!isAccountingStaff && (
                  <SidebarLink
                    title="Employee Leaves"
                    route="/pages/hr/leaves"
                    icon="file-alt"
                    onClick={handleClick}
                  />
                )}
                <SidebarLink
                  title="Team Meeting"
                  route="/pages/manageInternalMeetings"
                  onClick={handleClick}
                  icon="handshake"
                />
                <SidebarLink
                  icon="folder-open"
                  title="Document Storage"
                  route="/pages/storage/main"
                  onClick={handleClick}
                />
                <SidebarLink
                  icon="trash-alt"
                  title="Trashed Documents"
                  route="/pages/storage/trash"
                  onClick={handleClick}
                />
              </ul>
            </>
          </CSSTransition>
        </SwitchTransition>
      )}
      {!isSubSidebarOpen && (
        <>
          <ul className="sidebar__block">
            <SidebarLink title="Dashboard" icon="tachometer-alt" route="/" onClick={handleClick} />
          </ul>
          <ul className="sidebar__block">
            <SidebarLink
              title="Items"
              icon="shopping-basket"
              route="/pages/accounting/items"
              onClick={handleClick}
            />
            {/* <SidebarLink
              title="Inventory Adjustments"
              icon="cubes"
              route="/pages/accounting/inventoryAdjustments"
              onClick={handleClick}
              hidden={true}
            /> */}
            <SidebarLink
              title="Banking"
              icon="university"
              route="/pages/accounting/banking"
              onClick={handleClick}
            />
            <SidebarLink
              icon="shopping-bag"
              title="Brands"
              route="/pages/accounting/brands"
              onClick={handleClick}
            />

            {/* {isImmediateSupervisor && (
              <SidebarLink
                title="Employee Leave"
                icon="th-list"
                route="/pages/employee/leaves"
                onClick={handleClick}
              />
            )} */}

            <SidebarCategory title="Purchases" icon="shopping-bag">
              {/* <SidebarLink
                title="Item Master"
                route="/pages/accounting/items/add"
                onClick={handleClick}
              /> */}
              <SidebarLink
                title="Suppliers"
                route="/pages/accounting/purchases/suppliers"
                onClick={handleClick}
              />
              <SidebarLink
                title="Expenses"
                route="/pages/accounting/purchases/expenses"
                onClick={handleClick}
              />
              <SidebarLink
                title="Purchase Orders"
                route="/pages/accounting/purchases/purOrders"
                onClick={handleClick}
              />
              <SidebarLink
                title="Purchase Invoice"
                route="/pages/accounting/purchases/bills"
                onClick={handleClick}
              />
              {/* <SidebarLink
                title="Payments Made"
                route="/pages/accounting/purchases/paymentsMade"
                onClick={handleClick}
                hidden={true}
              /> */}
              <SidebarLink
                title="Debit Notes"
                route="/pages/accounting/purchases/supplierCredits"
                onClick={handleClick}
              />
            </SidebarCategory>
            <SidebarCategory title="Sales" icon="gifts">
              {/* <SidebarLink
                title="Accounts"
                route="/pages/accounting/sales/accounts"
                onClick={handleClick}
              /> */}
              <SidebarLink
                title="Customers"
                route="/pages/accounting/sales/customers"
                onClick={handleClick}
              />
              <SidebarLink
                title="Quotations"
                route="/pages/accounting/sales/quotations"
                onClick={handleClick}
              />
              {/* <SidebarLink
                title="Proforma Invoices"
                route="/pages/accounting/sales/proInvoices"
                onClick={handleClick}
              /> */}
              <SidebarLink title="Invoices" route="/pages/accounting/sales/invoices" onClick={handleClick} />
              {/* <SidebarLink
                title="Payments Received"
                route="/pages/accounting/sales/paymentsReceived"
                onClick={handleClick}
              /> */}
              <SidebarLink
                title="Credit Notes"
                route="/pages/accounting/sales/creditNotes"
                onClick={handleClick}
              />
            </SidebarCategory>

            <SidebarCategory title="Accountant" icon="user-tie">
              {/* <SidebarLink
                title="Currencies"
                route="/pages/accounting/accountant/currencies"
                onClick={handleClick}
              /> */}
              <SidebarLink
                title="Manual Journals"
                route="/pages/accounting/accountant/journals"
                onClick={handleClick}
              />
              <SidebarLink
                title="Tax Payments"
                route="/pages/accounting/accountant/taxPayments"
                onClick={handleClick}
              />
              <SidebarLink
                title="Chart of Accounts"
                route="/pages/accounting/accountant/chartOfAccounts"
                onClick={handleClick}
              />
              <SidebarLink
                title="Transaction Locking"
                route="/pages/accounting/accountant/transactionLocking"
                onClick={handleClick}
              />
            </SidebarCategory>
            <SidebarLink
              title="Reports"
              route="/pages/reports"
              icon="project-diagram"
              onClick={handleClick}
            />
          </ul>
          <ul className="sidebar__block">
            <NavLink
              to="#"
              onClick={() => {
                localStorage.setItem('lastURL', location.pathname);
                toggleSubSidebar();
              }}
            >
              <li className="sidebar__link">
                <span className="sidebar__link-icon fas fa-layer-group" />
                <p className="sidebar__link-title">Miscellaneous</p>
              </li>
            </NavLink>
          </ul>
        </>
      )}
    </>
  );
}

AccountantSidebar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isAccountingStaff: PropTypes.bool.isRequired,
  isAccountingController: PropTypes.bool.isRequired,
};

export default AccountantSidebar;

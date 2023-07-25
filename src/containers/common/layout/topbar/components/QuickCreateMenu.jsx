import React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import CartOutlineIcon from 'mdi-react/CartOutlineIcon';
// import PlusIcon from 'mdi-react/PlusIcon';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';

// import ToolTip from 'containers/common/ToolTip';

function QuickCreateMenu() {
  return (
    <UncontrolledDropdown className="mx-2 quick-create-dropdown" style={{ cursor: 'pointer' }}>
      {/* <ToolTip text="Quick Create" position="bottom" className="mr-3 text-nowrap"> */}
      <DropdownToggle tag="div" color="primary">
        <Tooltip title="Quick Create" placement="bottom" arrow>
          <IconButton>
            <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      </DropdownToggle>
      {/* </ToolTip> */}
      <DropdownMenu className="dropdown__menu quick-create-menu">
        <div className="container px-0">
          <div className="row m-0 p-4">
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <span className="sidebar__link-icon fas fa-bars" />
                <i className="fa-solid fa-bars" />
                <h5 className="quick-create-menu-header">GENERAL</h5>
              </div>
              <div className="flex-column mt-3">
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/items/add">
                    <DropdownItem>Item</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/accountant/journals/add">
                    <DropdownItem>Journal Entry</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/banking/add">
                    <DropdownItem>Bank Account</DropdownItem>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <span className="sidebar__link-icon fas fa-gifts" />
                <h5 className="quick-create-menu-header">SALES</h5>
              </div>
              <div className="flex-column mt-3">
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/sales/accounts/add">
                    <DropdownItem>Account</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/sales/customers/add">
                    <DropdownItem>Customer</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/sales/quotations/add">
                    <DropdownItem>Quotation</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/sales/proInvoices/add">
                    <DropdownItem>Proforma Invoice</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/sales/invoices/add">
                    <DropdownItem>Invoice</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/sales/paymentsReceived/add">
                    <DropdownItem>Payment Received</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/sales/creditNotes/add">
                    <DropdownItem>Credit Note</DropdownItem>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center">
                <span className="sidebar__link-icon fas fa-shopping-bag" />
                <h5 className="quick-create-menu-header">PURCHASE</h5>
              </div>
              <div className="flex-column mt-3">
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/purchases/suppliers/add">
                    <DropdownItem>Supplier</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/purchases/expenses/add">
                    <DropdownItem>Expense</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/purchases/purOrders/add">
                    <DropdownItem>Purchase Order</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/purchases/bills/add">
                    <DropdownItem>Bill</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link style={{ textDecoration: 'none' }} to="/pages/accounting/purchases/paymentsMade/add">
                    <DropdownItem>Payment Made</DropdownItem>
                  </Link>
                </div>
                <div className="py-2 d-flex align-items-center">
                  <AddIcon sx={{ fontSize: 12 }} className="mr-2" />
                  <Link
                    style={{ textDecoration: 'none' }}
                    to="/pages/accounting/purchases/supplierCredits/add"
                  >
                    <DropdownItem>Debit Note</DropdownItem>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default QuickCreateMenu;

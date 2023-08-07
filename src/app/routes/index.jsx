/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'containers/common/layout';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

// AUTH
const LoginPage = lazy(() => import('containers/auth/LogIn'));
const ForgetPasswordPage = lazy(() => import('containers/auth/ForgotPassword'));

// Private Routes
const DashboardPage = lazy(() => import('containers/dashboard'));
// Bank
const BankListing = lazy(() => import('containers/accounting/banking/listing'));
const AddBankPage = lazy(() => import('containers/accounting/banking/add'));

// Items
const ItemsListing = lazy(() => import('containers/accounting/items/listing'));
const AddItemPage = lazy(() => import('containers/accounting/items/add'));

// Brands
const BrandsListingPage = lazy(() => import('containers/accounting/brands/listing'));

// Suppliers
const SuppliersListingPage = lazy(() => import('containers/accounting/purchase/suppliers/listing'));

// Reports
const ReportsListPage = lazy(() => import('containers/reports'));

// Purchase Order
const PurchaseOrderListingPage = lazy(() => import('containers/accounting/purchase/purchase-orders/listing'));

// Purchase Invoice
const PurchaseInvoiceListingPage = lazy(() =>
  import('containers/accounting/purchase/purchase-invoice/listing')
);

// Debit Notes
const SupplierCreditListingPage = lazy(() =>
  import('containers/accounting/purchase/supplier-credit/listing')
);

// Expenses Notes
const ExpensesListingPage = lazy(() => import('containers/accounting/purchase/expenses/listing'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          true && (
            <div className="load">
              <div className="load__icon-wrap">
                <svg className="load__icon">
                  <path fill="#e0c46cde" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                </svg>
              </div>
            </div>
          )
        }
      >
        <Routes>
          <Route path="/">
            <Route path="auth" element={<PublicRoutes />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgetPasswordPage />} />
              <Route path="reset-password" element={<>resetpassword</>} />
            </Route>

            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<DashboardPage />} />
                {/* Reports */}
                <Route path="/pages/reports" element={<ReportsListPage />} />

                {/* Banking Master */}
                <Route path="/pages/accounting/banking/add" element={<AddBankPage />} />
                <Route path="/pages/accounting/banking/edit/:id" element={<AddBankPage />} />
                <Route path="/pages/accounting/banking" element={<BankListing />} />

                {/* Brands */}
                <Route path="/pages/accounting/brands" element={<BrandsListingPage />} />

                {/* Item Master */}
                <Route path="/pages/accounting/items/add" element={<AddItemPage />} />
                <Route path="/pages/accounting/items/edit/:id" element={<AddItemPage />} />
                <Route path="/pages/accounting/items" element={<ItemsListing />} />

                {/* supplier */}
                <Route path="/pages/accounting/purchase/suppliers" element={<SuppliersListingPage />} />

                {/* Purchase Orders */}
                <Route
                  path="/pages/accounting/purchase/purchase-orders"
                  element={<PurchaseOrderListingPage />}
                />
                {/* Purchase Invoice */}
                <Route
                  path="/pages/accounting/purchase/purchase-invoice"
                  element={<PurchaseInvoiceListingPage />}
                />
                {/* Supplier Credit */}
                <Route
                  path="/pages/accounting/purchase/debit-notes"
                  element={<SupplierCreditListingPage />}
                />
                {/* Expenses */}
                <Route path="/pages/accounting/purchase/expenses" element={<ExpensesListingPage />} />

                <Route path="/pages/accounting/sales/customers" element={<>customers</>} />
                <Route path="/pages/accounting/sales/accounts" element={<>accounts</>} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;

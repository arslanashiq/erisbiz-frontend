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
const BankDetailPage = lazy(() => import('containers/accounting/banking/detail'));
const AddBankPage = lazy(() => import('containers/accounting/banking/add'));

// Items
const ItemsListing = lazy(() => import('containers/accounting/items/listing'));
const AddItemPage = lazy(() => import('containers/accounting/items/add'));
const ItemDetailPage = lazy(() => import('containers/accounting/items/detail'));

// Brands
const BrandsListingPage = lazy(() => import('containers/accounting/brands/listing'));
const AddBrandPage = lazy(() => import('containers/accounting/brands/add'));

// Suppliers
const SuppliersListingPage = lazy(() => import('containers/accounting/purchase/suppliers/listing'));
const SuppliersAddPage = lazy(() => import('containers/accounting/purchase/suppliers/add'));
const SuppliersDetailPage = lazy(() => import('containers/accounting/purchase/suppliers/detail'));

// Reports
const ReportsListPage = lazy(() => import('containers/reports'));

// Purchase Order
const PurchaseOrderListingPage = lazy(() => import('containers/accounting/purchase/purchase-orders/listing'));
const AddPurchaseOrderPage = lazy(() => import('containers/accounting/purchase/purchase-orders/add'));

// Purchase Invoice
const PurchaseInvoiceListingPage = lazy(() =>
  import('containers/accounting/purchase/purchase-invoice/listing')
);
const AddPurchaseInvoicePage = lazy(() => import('containers/accounting/purchase/purchase-invoice/add'));

// Debit Notes
const SupplierCreditListingPage = lazy(() =>
  import('containers/accounting/purchase/supplier-credit/listing')
);
const AddSupplierCreditPage = lazy(() => import('containers/accounting/purchase/supplier-credit/add'));

// Expenses Notes
const ExpensesListingPage = lazy(() => import('containers/accounting/purchase/expenses/listing'));
const AddExpensesPage = lazy(() => import('containers/accounting/purchase/expenses/add'));

// Page Not Found
const PageNotFound = lazy(() => import('containers/page-not-found'));

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
                <Route path="/pages/accounting/banking/:id/detail" element={<BankDetailPage />} />
                <Route path="/pages/accounting/banking" element={<BankListing />} />

                {/* Brands */}
                <Route path="/pages/accounting/brands" element={<BrandsListingPage />} />
                <Route path="/pages/accounting/brands/add" element={<AddBrandPage />} />

                {/* Item Master */}
                <Route path="/pages/accounting/items/add" element={<AddItemPage />} />
                <Route path="/pages/accounting/items/edit/:id" element={<AddItemPage />} />
                <Route path="/pages/accounting/items" element={<ItemsListing />} />
                <Route path="/pages/accounting/items/:id/detail" element={<ItemDetailPage />} />

                {/* supplier */}
                <Route path="/pages/accounting/purchase/suppliers" element={<SuppliersListingPage />} />
                <Route path="/pages/accounting/purchase/suppliers/add" element={<SuppliersAddPage />} />
                <Route path="/pages/accounting/purchase/suppliers/edit/:id" element={<SuppliersAddPage />} />
                <Route
                  path="/pages/accounting/purchase/suppliers/:id/detail"
                  element={<SuppliersDetailPage />}
                />

                {/* Purchase Orders */}
                <Route
                  path="/pages/accounting/purchase/purchase-orders"
                  element={<PurchaseOrderListingPage />}
                />
                <Route
                  path="/pages/accounting/purchase/purchase-orders/add"
                  element={<AddPurchaseOrderPage />}
                />
                {/* Purchase Invoice */}
                <Route
                  path="/pages/accounting/purchase/purchase-invoice"
                  element={<PurchaseInvoiceListingPage />}
                />
                <Route
                  path="/pages/accounting/purchase/purchase-invoice/add"
                  element={<AddPurchaseInvoicePage />}
                />
                {/* Supplier Credit */}
                <Route
                  path="/pages/accounting/purchase/debit-notes"
                  element={<SupplierCreditListingPage />}
                />
                <Route
                  path="/pages/accounting/purchase/debit-notes/add"
                  element={<AddSupplierCreditPage />}
                />
                {/* Expenses */}
                <Route path="/pages/accounting/purchase/expenses" element={<ExpensesListingPage />} />
                <Route path="/pages/accounting/purchase/expenses/add" element={<AddExpensesPage />} />

                <Route path="/pages/accounting/sales/customers" element={<>customers</>} />
                <Route path="/pages/accounting/sales/accounts" element={<>accounts</>} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;

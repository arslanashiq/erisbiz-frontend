import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

// AUTH
const LoginPage = lazy(() => import('containers/auth/LogIn'));
const ForgetPasswordPage = lazy(() => import('containers/auth/ForgotPassword'));

// Private Routes
const DashboardPage = lazy(() => import('containers/dashboard'));

// User
const ClanderPage = lazy(() => import('containers/user/calender'));
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
const SupplierContactAddPage = lazy(() => import('containers/accounting/purchase/suppliers/contacts/add'));

// Reports
const ReportsListPage = lazy(() => import('containers/reports'));

// Purchase Order
const PurchaseOrderListingPage = lazy(() => import('containers/accounting/purchase/purchase-orders/listing'));
const PurchaseOrderDetailPage = lazy(() => import('containers/accounting/purchase/purchase-orders/detail'));
const AddPurchaseOrderPage = lazy(() => import('containers/accounting/purchase/purchase-orders/add'));

// Purchase Invoice
const PurchaseInvoiceListingPage = lazy(() => import('containers/accounting/purchase/purchase-invoice/listing'));
const AddPurchaseInvoicePage = lazy(() => import('containers/accounting/purchase/purchase-invoice/add'));
const PurchaseInvoiceDetailPage = lazy(() => import('containers/accounting/purchase/purchase-invoice/detail'));

// payment Voucher
const PaymentVoucherListingPage = lazy(() => import('containers/accounting/purchase/payment-voucher/listing'));
const AddPaymentVoucherPage = lazy(() => import('containers/accounting/purchase/payment-voucher/add'));
const PaymentVoucherDetailPage = lazy(() => import('containers/accounting/purchase/payment-voucher/detail'));

// Debit Notes
const SupplierCreditListingPage = lazy(() => import('containers/accounting/purchase/supplier-credit/listing'));
const AddSupplierCreditPage = lazy(() => import('containers/accounting/purchase/supplier-credit/add'));

// Expenses Notes
const ExpensesListingPage = lazy(() => import('containers/accounting/purchase/expenses/listing'));
const AddExpensesPage = lazy(() => import('containers/accounting/purchase/expenses/add'));

// Customer Master
const CustomerListingPage = lazy(() => import('containers/accounting/sale/customers/listing'));
const AddCustomerPage = lazy(() => import('containers/accounting/sale/customers/add'));

// quotations
const QuotationListingPage = lazy(() => import('containers/accounting/sale/quotations/listing'));
const AddQuotationPage = lazy(() => import('containers/accounting/sale/quotations/add'));
// Performa Invoices
const PerformaInvoiceListingPage = lazy(() => import('containers/accounting/sale/performa-invoices/listing'));
const AddPerformaInvoicePage = lazy(() => import('containers/accounting/sale/performa-invoices/add'));

//  Invoices
const InvoiceListingPage = lazy(() => import('containers/accounting/sale/invoices/listing'));
const AddInvoicePage = lazy(() => import('containers/accounting/sale/invoices/add'));

//  Credit Note
const CreditNotesListingPage = lazy(() => import('containers/accounting/sale/credit-notes/listing'));
const AddCreditNotePage = lazy(() => import('containers/accounting/sale/credit-notes/add'));

// Page Not Found
const PageNotFound = lazy(() => import('containers/miscellaneous/page-not-found'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/">
            <Route path="auth" element={<PublicRoutes />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot-password" element={<ForgetPasswordPage />} />
              <Route path="reset-password" element={<>resetpassword</>} />
            </Route>

            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/" element={<DashboardPage />} />
              {/* Reports */}
              <Route path="/pages" element={<Outlet />}>
                <Route path="user" element={<ClanderPage />}>
                  <Route path="calendar" element={<Outlet />} />
                </Route>

                <Route path="reports" element={<ReportsListPage />} />
                <Route path="accounting" element={<Outlet />}>
                  {/* Banking Master */}
                  <Route path="banking" element={<Outlet />}>
                    <Route path="" index element={<BankListing />} />
                    <Route path="add" element={<AddBankPage />} />
                    <Route path="edit/:id" element={<AddBankPage />} />
                    <Route path=":id/detail" element={<BankDetailPage />} />
                  </Route>

                  {/* Brands */}
                  <Route path="brands" element={<Outlet />}>
                    <Route path="" index element={<BrandsListingPage />} />
                    <Route path="add" element={<AddBrandPage />} />
                    <Route path="edit/:id" element={<AddBrandPage />} />
                  </Route>
                  {/* Item Master */}
                  <Route path="items" element={<Outlet />}>
                    <Route path="" index element={<ItemsListing />} />
                    <Route path="add" element={<AddItemPage />} />
                    <Route path="edit/:id" element={<AddItemPage />} />
                    <Route path=":id/detail" element={<ItemDetailPage />} />
                  </Route>
                  {/* Purchases */}
                  <Route path="purchase" element={<Outlet />}>
                    {/* supplier */}
                    <Route path="suppliers" element={<Outlet />}>
                      <Route path="" index element={<SuppliersListingPage />} />
                      <Route path="add" element={<SuppliersAddPage />} />
                      <Route path="edit/:id" element={<SuppliersAddPage />} />
                      <Route path=":id/detail" element={<SuppliersDetailPage />} />
                      <Route path=":supplierId/contact/edit/:id" element={<SupplierContactAddPage />} />
                      <Route path=":supplierId/contact/add" element={<SupplierContactAddPage />} />
                    </Route>

                    {/* Purchase Orders */}
                    <Route path="purchase-orders" element={<Outlet />}>
                      <Route path="" index element={<PurchaseOrderListingPage />} />
                      <Route path="add" element={<AddPurchaseOrderPage />} />
                      <Route path="edit/:id" element={<AddPurchaseOrderPage />} />
                      <Route path=":id/detail" element={<PurchaseOrderDetailPage />} />
                    </Route>

                    {/* Purchase Invoice */}
                    <Route path="purchase-invoice" element={<Outlet />}>
                      <Route path="" index element={<PurchaseInvoiceListingPage />} />
                      <Route path="add" element={<AddPurchaseInvoicePage />} />
                      <Route path="edit/:id" element={<AddPurchaseInvoicePage />} />
                      <Route path=":id/detail" element={<PurchaseInvoiceDetailPage />} />
                    </Route>

                    {/* Payment Voucher */}

                    <Route path="payment-voucher" element={<Outlet />}>
                      <Route path="" index element={<PaymentVoucherListingPage />} />
                      <Route path="add" element={<AddPaymentVoucherPage />} />
                      <Route path=":id/detail" element={<PaymentVoucherDetailPage />} />
                      <Route path="edit/:id" element={<AddPaymentVoucherPage />} />
                    </Route>

                    {/* Supplier Credit */}
                    <Route path="debit-notes" element={<Outlet />}>
                      <Route path="" index element={<SupplierCreditListingPage />} />
                      <Route path="add" element={<AddSupplierCreditPage />} />
                      <Route path="edit/:id" element={<AddSupplierCreditPage />} />
                    </Route>

                    {/* Expenses */}
                    <Route path="expenses" element={<Outlet />}>
                      <Route path="" index element={<ExpensesListingPage />} />
                      <Route path="add" element={<AddExpensesPage />} />
                      <Route path="edit/:id" element={<AddExpensesPage />} />
                    </Route>
                  </Route>

                  <Route path="sales" element={<Outlet />}>
                    {/* Customers */}
                    <Route path="customers" element={<Outlet />}>
                      <Route path="" index element={<CustomerListingPage />} />
                      <Route path="add" element={<AddCustomerPage />} />
                      <Route path="edit/:id" element={<AddCustomerPage />} />
                    </Route>
                    {/* quotation */}
                    <Route path="quotations" element={<Outlet />}>
                      <Route path="" index element={<QuotationListingPage />} />
                      <Route path="add" element={<AddQuotationPage />} />
                      <Route path="edit/:id" element={<AddQuotationPage />} />
                    </Route>
                    {/* performa-invoice */}
                    <Route path="quotations" element={<Outlet />}>
                      <Route path="" index element={<PerformaInvoiceListingPage />} />
                      <Route path="add" element={<AddPerformaInvoicePage />} />
                      <Route path="edit/:id" element={<AddPerformaInvoicePage />} />
                    </Route>
                    {/* invoice */}
                    <Route path="invoice" element={<Outlet />}>
                      <Route path="" index element={<InvoiceListingPage />} />
                      <Route path="add" element={<AddInvoicePage />} />
                      <Route path="edit/:id" element={<AddInvoicePage />} />
                    </Route>
                    {/* credit Note */}
                    <Route path="invoice" element={<Outlet />}>
                      <Route path="" index element={<CreditNotesListingPage />} />
                      <Route path="add" element={<AddCreditNotePage />} />
                      <Route path="edit/:id" element={<AddCreditNotePage />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;

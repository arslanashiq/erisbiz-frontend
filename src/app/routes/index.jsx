/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import CompanyGuardedRoute from './CompanyGuardedRoute';

// AUTH
const LoginPage = lazy(() => import('containers/auth/LogIn'));
const SignUpPage = lazy(() => import('containers/auth/signup'));
const RegisterCompanyPage = lazy(() => import('containers/auth/register-company'));
const ForgetPasswordPage = lazy(() => import('containers/auth/ForgotPassword'));

// USER
const UserProfilePage = lazy(() => import('containers/user/profile'));

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
// Category
const CategoryListingPage = lazy(() => import('containers/accounting/category/listing'));
const AddCategoryPage = lazy(() => import('containers/accounting/category/add'));

// Suppliers
const SuppliersListingPage = lazy(() => import('containers/accounting/purchase/suppliers/listing'));
const SuppliersAddPage = lazy(() => import('containers/accounting/purchase/suppliers/add'));
const SuppliersDetailPage = lazy(() => import('containers/accounting/purchase/suppliers/detail'));
const SupplierContactAddPage = lazy(() => import('containers/accounting/purchase/suppliers/contacts/add'));

// Purchase
// Purchase Order
const PurchaseOrderListingPage = lazy(() => import('containers/accounting/purchase/purchase-orders/listing'));
const PurchaseOrderDetailPage = lazy(() => import('containers/accounting/purchase/purchase-orders/detail'));
const AddPurchaseOrderPage = lazy(() => import('containers/accounting/purchase/purchase-orders/add'));

// Purchase Invoice
const PurchaseInvoiceListingPage = lazy(() =>
  import('containers/accounting/purchase/purchase-invoice/listing')
);
const AddPurchaseInvoicePage = lazy(() => import('containers/accounting/purchase/purchase-invoice/add'));
const PurchaseInvoiceDetailPage = lazy(() =>
  import('containers/accounting/purchase/purchase-invoice/detail')
);

// payment Voucher
const PaymentVoucherListingPage = lazy(() =>
  import('containers/accounting/purchase/payment-voucher/listing')
);
const AddPaymentVoucherPage = lazy(() => import('containers/accounting/purchase/payment-voucher/add'));
const PaymentVoucherDetailPage = lazy(() => import('containers/accounting/purchase/payment-voucher/detail'));

// Debit Notes
const SupplierCreditListingPage = lazy(() =>
  import('containers/accounting/purchase/supplier-credit/listing')
);
const AddSupplierCreditPage = lazy(() => import('containers/accounting/purchase/supplier-credit/add'));
const SupplierCreditDetailPage = lazy(() => import('containers/accounting/purchase/supplier-credit/detail'));

// Expenses Notes
const ExpensesListingPage = lazy(() => import('containers/accounting/purchase/expenses/listing'));
const AddExpensesPage = lazy(() => import('containers/accounting/purchase/expenses/add'));
const ExpenseDetailPage = lazy(() => import('containers/accounting/purchase/expenses/detail'));

// Sale
// Customer Master
const CustomerListingPage = lazy(() => import('containers/accounting/sale/customers/listing'));
const AddCustomerPage = lazy(() => import('containers/accounting/sale/customers/add'));
const CustomerDetailPage = lazy(() => import('containers/accounting/sale/customers/detail'));
const CustomerContactAddPage = lazy(() => import('containers/accounting/purchase/suppliers/contacts/add'));

// Sale  Quotations
const QuotationListingPage = lazy(() => import('containers/accounting/sale/quotations/listing'));
const AddQuotationPage = lazy(() => import('containers/accounting/sale/quotations/add'));
const QuotationDetailPage = lazy(() => import('containers/accounting/sale/quotations/detail'));
// Sale Proforma Invoice
const ProformaInvoiceListingPage = lazy(() => import('containers/accounting/sale/proforma-invoice/listing'));
const AddProformaInvoicePage = lazy(() => import('containers/accounting/sale/proforma-invoice/add'));
const ProformaInvoiceDetailPage = lazy(() => import('containers/accounting/sale/proforma-invoice/detail'));

// Sales Invoices
const SaleInvoiceListingPage = lazy(() => import('containers/accounting/sale/sale-invoice/listing'));
const AddSaleInvoicePage = lazy(() => import('containers/accounting/sale/sale-invoice/add'));
const SaleInvoiceDetailPage = lazy(() => import('containers/accounting/sale/sale-invoice/detail'));

// Sale Receipt Voucer
const ReceiptVoucherListingPage = lazy(() => import('containers/accounting/sale/receipt-voucher/listing'));
const AddReceiptVoucherPage = lazy(() => import('containers/accounting/sale/receipt-voucher/add'));
const ReceiptVoucherDetailPage = lazy(() => import('containers/accounting/sale/receipt-voucher/detail'));

//  Credit Note
const CreditNotesListingPage = lazy(() => import('containers/accounting/sale/credit-notes/listing'));
const AddCreditNotePage = lazy(() => import('containers/accounting/sale/credit-notes/add'));
const CreditNoteDetailPage = lazy(() => import('containers/accounting/sale/credit-notes/detail'));

// finance
// Chart of account
const ChartOfAccountListingPage = lazy(() =>
  import('containers/accounting/finance/chart-of-account/listing')
);
const AddChartOfAccount = lazy(() => import('containers/accounting/finance/chart-of-account/add'));
const ChartOfAccountDetailPage = lazy(() => import('containers/accounting/finance/chart-of-account/detail'));

// tax Return
const TaxReturnListingPage = lazy(() => import('containers/accounting/finance/tax-returns/listing'));
// const AddChartOfAccount = lazy(() => import('containers/accounting/finance/chart-of-account/add'));

// journal voucher
const JournalVoucherListingPage = lazy(() => import('containers/accounting/finance/journal-voucher/listing'));
const AddJournalVouchePage = lazy(() => import('containers/accounting/finance/journal-voucher/add'));
const JournalVoucherDetailPage = lazy(() => import('containers/accounting/finance/journal-voucher/detail'));

// Reports
// payables
const ReportsListPage = lazy(() => import('containers/reports/listing'));
const ReportSupplierBalancePage = lazy(() => import('containers/reports/payables/SupplierBalance'));
const ReportSupplierBillBalanceReport = lazy(() => import('containers/reports/payables/SupplierBillBalance'));
const ReportSupplierExcessPaymentBalanceReport = lazy(() =>
  import('containers/reports/payables/SupplierExcessPaymentBalance')
);
const ReportSupplierBalanceDetailReport = lazy(() =>
  import('containers/reports/payables/SupplierBalanceDetail')
);
const ReportApAgingSummaryPage = lazy(() => import('containers/reports/payables/ApAgingSummary'));
const ReportApAgingDetailPage = lazy(() => import('containers/reports/payables/ApAgingDetail'));
const ReportBillDetailsPage = lazy(() => import('containers/reports/payables/BillDetails'));
const ReportPayableDebitNoteDetailPage = lazy(() =>
  import('containers/reports/payables/PayableDebitNoteDetail')
);
const ReportPaymentsMadeDetailPage = lazy(() => import('containers/reports/payables/PaymentsMade'));
const ReportPurchaseOrderDetailPage = lazy(() => import('containers/reports/payables/PurchaseOrderDetail'));
const ReportPurchaseOrderBySupplierPage = lazy(() =>
  import('containers/reports/payables/PurchaseOrderBySupplier')
);
const ReportPayableSummaryPage = lazy(() => import('containers/reports/payables/PayableSummary'));
const ReportPayableDetailsPage = lazy(() => import('containers/reports/payables/PayableDetails'));
const ReportSupplierRefundHistoryPage = lazy(() =>
  import('containers/reports/payables/SupplierRefundHistory')
);
// receivables
const ReportReceivableAccountBalancePage = lazy(() =>
  import('containers/reports/receivables/ReceivableAccountBalance')
);
const ReportReceivablesInvoiceBalanceAgainstCustomerPage = lazy(() =>
  import('containers/reports/receivables/ReceivablesInvoiceBalanceAgainstCustomer')
);
const ReportReceivablesCreditNoteBalanceAgainstCustomerPage = lazy(() =>
  import('containers/reports/receivables/ReceivablesCreditNoteBalanceAgainstCustomer')
);
const ReportReceivableBalanceDetailAgainstCustomerPage = lazy(() =>
  import('containers/reports/receivables/ReceivableBalanceDetailAgainstCustomer')
);
const ReportReceivableARAgingSummaryPage = lazy(() =>
  import('containers/reports/receivables/ReceivableARAgingSummary')
);
const ReportReceivableARAgingDetailPage = lazy(() =>
  import('containers/reports/receivables/ReceivableARAgingDetail')
);
const ReportReceivableInvoiceDetailPage = lazy(() =>
  import('containers/reports/receivables/ReceivableInvoiceDetail')
);
const ReportReceivableSummaryPage = lazy(() => import('containers/reports/receivables/ReceivableSummary'));
const ReportReceivableDetailsPage = lazy(() => import('containers/reports/receivables/ReceivableDetails'));
// purchase and expenses
const ReportPurchaseBySupplierPage = lazy(() =>
  import('containers/reports/purchase-and-expenses/PurchaseBySupplier')
);
const ReportPurchaseBySupplierDetailPage = lazy(() =>
  import('containers/reports/purchase-and-expenses/PurchaseBySupplierDetail')
);
const ReportPurchaseByItemPage = lazy(() =>
  import('containers/reports/purchase-and-expenses/PurchaseByItem')
);
const ReportPurchaseByItemDetailPage = lazy(() =>
  import('containers/reports/purchase-and-expenses/PurchaseByItemDetail')
);
const ReportExpenseDetailsPage = lazy(() =>
  import('containers/reports/purchase-and-expenses/ExpenseDetails')
);
const ReportExpenseByCategoryPage = lazy(() =>
  import('containers/reports/purchase-and-expenses/ExpenseByCategory')
);
const ReportExpenseByCategoryDetailPage = lazy(() =>
  import('containers/reports/purchase-and-expenses/ExpenseByCategoryDetail')
);
// sales Report
const ReportSalesByCustomerPage = lazy(() => import('containers/reports/sales/SalesByCustomer'));
const ReportSalesByCustomerDetailPage = lazy(() => import('containers/reports/sales/SalesByCustomerDetail'));
const ReportSalesByItemPage = lazy(() => import('containers/reports/sales/SalesByItem'));
const ReportSalesByItemDetailPage = lazy(() => import('containers/reports/sales/SalesByItemDetail'));
const ReportSalesBySalesPersonPage = lazy(() => import('containers/reports/sales/SalesBySalesPerson'));
const ReportSalesBySalesPersonDetailPage = lazy(() =>
  import('containers/reports/sales/SalesBySalePersonDetail')
);
const ReportSalesBySalesTypePage = lazy(() => import('containers/reports/sales/SalesBySalesType'));

// receipt voucher
const ReportReceiptVoucherPage = lazy(() =>
  import('containers/reports/receipt-voucher/ReceiptVoucherReport')
);
const ReportCreditNoteDetailPage = lazy(() => import('containers/reports/receipt-voucher/CreditNoteDetail'));
const ReportRefundHistoryPage = lazy(() => import('containers/reports/receipt-voucher/RefundHistory'));

// accountant
const ReportAccountTransactionPage = lazy(() => import('containers/reports/accountant/AccountTransaction'));
const ReportAccountTypeSummaryPage = lazy(() => import('containers/reports/accountant/AccountTypeSummary'));
const ReportGeneralLedgerPage = lazy(() => import('containers/reports/accountant/GeneralLedger'));
const ReportDetailGeneralLedgerPage = lazy(() => import('containers/reports/accountant/DetailGeneralLedger'));
const ReportJournalReportPage = lazy(() => import('containers/reports/accountant/JournalReport'));
const ReportTrialBalancePage = lazy(() => import('containers/reports/accountant/trial-balance'));
// tax
const ReportTaxReturnReportPage = lazy(() => import('containers/reports/tax/TaxReturnReport'));
const ReportTaxReturnDetailReportPage = lazy(() => import('containers/reports/tax/TaxReturnDetailReport'));
const ReportTaxReturnDetailInformationReportPage = lazy(() =>
  import('containers/reports/tax/TaxReturnDetailInformationReport')
);
const ReportVATAuditReportPage = lazy(() => import('containers/reports/tax/VATAuditReport'));
// financial report
const ProfitAndLossStatementReportPage = lazy(() =>
  import('containers/reports/financial-reports/ProfitAndLossStatement')
);
const CashFlowStatementReportPage = lazy(() =>
  import('containers/reports/financial-reports/cash-flow-statement')
);
const BalanceSheetStatementReportPage = lazy(() =>
  import('containers/reports/financial-reports/balance-sheet-statement')
);
// activity
const ActivityLogsReportPage = lazy(() => import('containers/reports/activity/ActivityLogs'));
const ActivityLogsDetailPage = lazy(() =>
  import('containers/reports/activity/components/ActivityLogsDetail')
);

// PAYPAL PAYMENTS
const PayPalPaymentPage = lazy(() => import('containers/payments/paypal'));
const PayPalPaymentPlansPage = lazy(() => import('containers/payments/payment-plans'));

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
              <Route path="signup" element={<SignUpPage />} />
              {/* <Route path="register-company/:id/:token" element={<RegisterCompanyPage />} /> */}
              <Route path="forgot-password" element={<ForgetPasswordPage />} />
              <Route path="reset-password" element={<>resetpassword</>} />
            </Route>
            <Route path="register-company" element={<CompanyGuardedRoute />}>
              <Route path="" index element={<RegisterCompanyPage />} />
              <Route path=":id/:token" element={<RegisterCompanyPage />} />
              <Route path="payment" element={<PayPalPaymentPage />} />
              <Route path="plans" element={<PayPalPaymentPlansPage />} />
            </Route>

            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="user" element={<Outlet />}>
                <Route path="profile" element={<UserProfilePage />} />
              </Route>
              <Route path="/pages" element={<Outlet />}>
                <Route path="user" element={<ClanderPage />}>
                  <Route path="calendar" element={<Outlet />} />
                </Route>

                <Route path="accounting" element={<Outlet />}>
                  <Route path="banking" element={<Outlet />}>
                    <Route path="" index element={<BankListing />} />
                    <Route path="add" element={<AddBankPage />} />
                    <Route path="edit/:id" element={<AddBankPage />} />
                    <Route path=":id/detail" element={<BankDetailPage />} />
                  </Route>

                  <Route path="brands" element={<Outlet />}>
                    <Route path="" index element={<BrandsListingPage />} />
                    <Route path="add" element={<AddBrandPage />} />
                    <Route path="edit/:id" element={<AddBrandPage />} />
                  </Route>
                  <Route path="category" element={<Outlet />}>
                    <Route path="" index element={<CategoryListingPage />} />
                    <Route path="add" element={<AddCategoryPage />} />
                    <Route path="edit/:id" element={<AddCategoryPage />} />
                  </Route>
                  <Route path="items" element={<Outlet />}>
                    <Route path="" index element={<ItemsListing />} />
                    <Route path="add" element={<AddItemPage />} />
                    <Route path="edit/:id" element={<AddItemPage />} />
                    <Route path=":id/detail" element={<ItemDetailPage />} />
                  </Route>
                  <Route path="purchase" element={<Outlet />}>
                    <Route path="suppliers" element={<Outlet />}>
                      <Route path="" index element={<SuppliersListingPage />} />
                      <Route path="add" element={<SuppliersAddPage />} />
                      <Route path="edit/:id" element={<SuppliersAddPage />} />
                      <Route path=":id/detail" element={<SuppliersDetailPage />} />
                      <Route path=":supplierId/contact/edit/:id" element={<SupplierContactAddPage />} />
                      <Route path=":supplierId/contact/add" element={<SupplierContactAddPage />} />
                    </Route>

                    <Route path="purchase-orders" element={<Outlet />}>
                      <Route path="" index element={<PurchaseOrderListingPage />} />
                      <Route path="add" element={<AddPurchaseOrderPage />} />
                      <Route path="edit/:id" element={<AddPurchaseOrderPage />} />
                      <Route path=":id/detail" element={<PurchaseOrderDetailPage />} />
                    </Route>

                    <Route path="purchase-invoice" element={<Outlet />}>
                      <Route path="" index element={<PurchaseInvoiceListingPage />} />
                      <Route path="add" element={<AddPurchaseInvoicePage />} />
                      <Route path="edit/:id" element={<AddPurchaseInvoicePage />} />
                      <Route path=":id/detail" element={<PurchaseInvoiceDetailPage />} />
                    </Route>

                    <Route path="payment-voucher" element={<Outlet />}>
                      <Route path="" index element={<PaymentVoucherListingPage />} />
                      <Route path="add" element={<AddPaymentVoucherPage />} />
                      <Route path=":id/detail" element={<PaymentVoucherDetailPage />} />
                      <Route path="edit/:id" element={<AddPaymentVoucherPage />} />
                    </Route>

                    <Route path="debit-notes" element={<Outlet />}>
                      <Route path="" index element={<SupplierCreditListingPage />} />
                      <Route path="add" element={<AddSupplierCreditPage />} />
                      <Route path="edit/:id" element={<AddSupplierCreditPage />} />
                      <Route path=":id/detail" element={<SupplierCreditDetailPage />} />
                    </Route>

                    <Route path="expenses" element={<Outlet />}>
                      <Route path="" index element={<ExpensesListingPage />} />
                      <Route path="add" element={<AddExpensesPage />} />
                      <Route path="edit/:id" element={<AddExpensesPage />} />
                      <Route path=":id/detail" element={<ExpenseDetailPage />} />
                    </Route>
                  </Route>

                  <Route path="sales" element={<Outlet />}>
                    <Route path="customers" element={<Outlet />}>
                      <Route path="" index element={<CustomerListingPage />} />
                      <Route path="add" element={<AddCustomerPage />} />
                      <Route path="edit/:id" element={<AddCustomerPage />} />
                      <Route path=":id/detail" element={<CustomerDetailPage />} />
                      <Route path=":customerId/contact/add" element={<CustomerContactAddPage />} />
                      <Route path=":customerId/contact/edit/:id" element={<CustomerContactAddPage />} />
                    </Route>
                    <Route path="quotations" element={<Outlet />}>
                      <Route path="" index element={<QuotationListingPage />} />
                      <Route path="add" element={<AddQuotationPage />} />
                      <Route path="edit/:id" element={<AddQuotationPage />} />
                      <Route path=":id/detail" element={<QuotationDetailPage />} />
                    </Route>
                    <Route path="proforma-invoice" element={<Outlet />}>
                      <Route path="" index element={<ProformaInvoiceListingPage />} />
                      <Route path="add" element={<AddProformaInvoicePage />} />
                      <Route path="edit/:id" element={<AddProformaInvoicePage />} />
                      <Route path=":id/detail" element={<ProformaInvoiceDetailPage />} />
                    </Route>
                    <Route path="sale-invoice" element={<Outlet />}>
                      <Route path="" index element={<SaleInvoiceListingPage />} />
                      <Route path="add" element={<AddSaleInvoicePage />} />
                      <Route path="edit/:id" element={<AddSaleInvoicePage />} />
                      <Route path=":id/detail" element={<SaleInvoiceDetailPage />} />
                    </Route>
                    <Route path="receipt-voucher" element={<Outlet />}>
                      <Route path="" index element={<ReceiptVoucherListingPage />} />
                      <Route path="add" element={<AddReceiptVoucherPage />} />
                      <Route path="edit/:id" element={<AddReceiptVoucherPage />} />
                      <Route path=":id/detail" element={<ReceiptVoucherDetailPage />} />
                    </Route>
                    <Route path="credit-notes" element={<Outlet />}>
                      <Route path="" index element={<CreditNotesListingPage />} />
                      <Route path="add" element={<AddCreditNotePage />} />
                      <Route path="edit/:id" element={<AddCreditNotePage />} />
                      <Route path=":id/detail" element={<CreditNoteDetailPage />} />
                    </Route>
                  </Route>
                  <Route path="finance" element={<Outlet />}>
                    <Route path="journal-voucher" element={<Outlet />}>
                      <Route path="" index element={<JournalVoucherListingPage />} />
                      <Route path="add" element={<AddJournalVouchePage />} />
                      <Route path="edit/:id" element={<AddJournalVouchePage />} />
                      <Route path=":id/detail" element={<JournalVoucherDetailPage />} />
                    </Route>
                    <Route path="chart-of-account" element={<Outlet />}>
                      <Route path="" index element={<ChartOfAccountListingPage />} />
                      <Route path="add" element={<AddChartOfAccount />} />
                      <Route path="edit/:id" element={<AddChartOfAccount />} />
                      <Route path=":id/detail" element={<ChartOfAccountDetailPage />} />
                    </Route>
                    <Route path="tax-payments" element={<Outlet />}>
                      <Route path="" index element={<TaxReturnListingPage />} />
                      {/* <Route path="add" element={<AddChartOfAccount />} />
                      <Route path="edit/:id" element={<AddChartOfAccount />} />
                      <Route path=":id/detail" element={<ChartOfAccountDetailPage />} /> */}
                    </Route>
                  </Route>
                </Route>
                <Route path="reports" element={<Outlet />}>
                  <Route path="" index element={<ReportsListPage />} />
                  <Route path="supplier-balances" element={<Outlet />}>
                    <Route path="" index element={<ReportSupplierBalancePage />} />
                    <Route path="bill/detail" element={<ReportSupplierBillBalanceReport />} />
                    <Route
                      path="excess-payment/detail"
                      element={<ReportSupplierExcessPaymentBalanceReport />}
                    />
                    <Route path="detail" element={<ReportSupplierBalanceDetailReport />} />
                  </Route>
                  <Route path="ap-aging-summary" element={<ReportApAgingSummaryPage />} />
                  <Route path="ap-aging-details" element={<ReportApAgingDetailPage />} />
                  <Route path="bill-details" element={<ReportBillDetailsPage />} />
                  <Route path="debit-note" element={<ReportPayableDebitNoteDetailPage />} />
                  <Route path="payments-made" element={<ReportPaymentsMadeDetailPage />} />
                  <Route path="purchase-order-details" element={<ReportPurchaseOrderDetailPage />} />
                  <Route path="purchase-order-by-supplier" element={<ReportPurchaseOrderBySupplierPage />} />
                  <Route path="payable-summary" element={<ReportPayableSummaryPage />} />
                  <Route path="payable-details" element={<ReportPayableDetailsPage />} />
                  <Route path="supplier-refund-history" element={<ReportSupplierRefundHistoryPage />} />
                  <Route path="customer-balances" element={<Outlet />}>
                    <Route path="" index element={<ReportReceivableAccountBalancePage />} />
                    <Route
                      path="sale-invoice/detail"
                      index
                      element={<ReportReceivablesInvoiceBalanceAgainstCustomerPage />}
                    />
                    <Route
                      path="credit-notes/detail"
                      index
                      element={<ReportReceivablesCreditNoteBalanceAgainstCustomerPage />}
                    />
                    <Route
                      path="detail"
                      index
                      element={<ReportReceivableBalanceDetailAgainstCustomerPage />}
                    />
                  </Route>
                  <Route path="ar-aging-summary" element={<ReportReceivableARAgingSummaryPage />} />
                  <Route path="ar-aging-details" element={<ReportReceivableARAgingDetailPage />} />
                  <Route path="invoice-details" element={<ReportReceivableInvoiceDetailPage />} />
                  <Route path="receivable-summary" element={<ReportReceivableSummaryPage />} />
                  <Route path="receivable-details" element={<ReportReceivableDetailsPage />} />
                  <Route path="purchases-by-supplier" element={<ReportPurchaseBySupplierPage />} />
                  <Route
                    path="purchases-by-supplier/detail"
                    element={<ReportPurchaseBySupplierDetailPage />}
                  />
                  <Route path="purchases-by-item" element={<ReportPurchaseByItemPage />} />
                  <Route path="purchases-by-item/detail" element={<ReportPurchaseByItemDetailPage />} />
                  <Route path="expense-details" element={<ReportExpenseDetailsPage />} />
                  <Route path="expenses-by-category" element={<ReportExpenseByCategoryPage />} />
                  <Route path="expenses-by-category/detail" element={<ReportExpenseByCategoryDetailPage />} />
                  <Route path="sales-by-customer" element={<ReportSalesByCustomerPage />} />
                  <Route path="sales-by-customer/detail" element={<ReportSalesByCustomerDetailPage />} />
                  <Route path="sales-by-item" element={<ReportSalesByItemPage />} />
                  <Route path="sales-by-item/detail" element={<ReportSalesByItemDetailPage />} />
                  <Route path="sales-by-sales-person" element={<ReportSalesBySalesPersonPage />} />
                  <Route
                    path="sales-by-sales-person/detail"
                    element={<ReportSalesBySalesPersonDetailPage />}
                  />
                  <Route path="sales-by-sales-type" element={<ReportSalesBySalesTypePage />} />

                  <Route path="receipt-voucher" element={<ReportReceiptVoucherPage />} />
                  <Route path="credit-note-detail" element={<ReportCreditNoteDetailPage />} />
                  <Route path="refund-history" element={<ReportRefundHistoryPage />} />
                  <Route path="account-transactions" element={<ReportAccountTransactionPage />} />
                  <Route path="account-type-summary" element={<ReportAccountTypeSummaryPage />} />
                  <Route path="general-ledger" element={<ReportGeneralLedgerPage />} />
                  <Route path="detailed-general-ledger" element={<ReportDetailGeneralLedgerPage />} />
                  <Route path="journal-report" element={<ReportJournalReportPage />} />
                  <Route path="trial-balance" element={<ReportTrialBalancePage />} />
                  <Route path="tax-returns" element={<ReportTaxReturnReportPage />} />
                  <Route path="tax-returns/:id" element={<ReportTaxReturnDetailReportPage />} />
                  <Route
                    path="tax-returns/:id/detail"
                    element={<ReportTaxReturnDetailInformationReportPage />}
                  />
                  <Route path="vat-audit" element={<ReportVATAuditReportPage />} />
                  <Route path="profit-loss" element={<ProfitAndLossStatementReportPage />} />
                  <Route path="cash-flow-statement" element={<CashFlowStatementReportPage />} />
                  <Route path="balance-sheet" element={<BalanceSheetStatementReportPage />} />
                  <Route path="activity-logs" element={<Outlet />}>
                    <Route path="" index element={<ActivityLogsReportPage />} />
                    <Route path=":id" index element={<ActivityLogsDetailPage />} />
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

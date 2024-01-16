// filter Date
export const FilterReportsList = [
  { value: 'today', label: 'Today' },
  { value: 'this week', label: 'This Week' },
  { value: 'this month', label: 'This Month' },
  { value: 'this quarter', label: 'This Quarter' },
  { value: 'this year', label: 'This Year' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'previous week', label: 'Previous Week' },
  { value: 'previous month', label: 'Previous Month' },
  { value: 'previous quarter', label: 'Previous Quarter' },
  { value: 'previous year', label: 'Previous Year' },
  { value: '', label: 'Custom' },
];
export const FilterCustomReportsList = [
  { value: 'today', label: 'Today' },
  { value: 'this week', label: 'This Week' },
  { value: 'this month', label: 'This Month' },
  { value: 'this quarter', label: 'This Quarter' },
  { value: 'this year', label: 'This Year' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'previous week', label: 'Previous Week' },
  { value: 'previous month', label: 'Previous Month' },
  { value: 'previous quarter', label: 'Previous Quarter' },
  { value: 'previous year', label: 'Previous Year' },
  { value: 'custom', label: 'Custom' },
];
export const AgingByList = [
  { value: 'date', label: 'Date' },
  { value: 'due_date', label: 'Due Date' },
];

export const payableReports = {
  title: 'Payable Reports',
  reports: [
    {
      label: 'Supplier Balances',
      link: '/pages/reports/supplier-balances?duration=today',
    },
    {
      label: 'AP Aging Summary',
      link: '/pages/reports/ap-aging-summary?duration=today',
    },
    {
      label: 'AP Aging Details',
      link: '/pages/reports/ap-aging-details?duration=today&date_type=date',
    },
    {
      label: 'Bill Details',
      link: '/pages/reports/bill-details?duration=today',
    },
    {
      label: 'Debit Note',
      link: '/pages/reports/debit-note?duration=today',
    },
    {
      label: 'Payment Made',
      link: '/pages/reports/payments-made?duration=today',
    },
    {
      label: 'Refund History',
      link: '/pages/reports/supplier-refund-history?duration=today',
    },
    {
      label: 'Purchase Order Details',
      link: '/pages/reports/purchase-order-details?duration=today',
    },
    {
      label: 'Purchase Order by Supplier',
      link: '/pages/reports/purchase-order-by-supplier?duration=today',
    },

    {
      label: 'Payable Summary',
      link: '/pages/reports/payable-summary?duration=today',
    },
    {
      label: 'Payable Details',
      link: '/pages/reports/payable-details?duration=today',
    },
  ],
};
export const receivableReports = {
  title: 'Receivable Reports',
  reports: [
    {
      label: 'Account Balances',
      link: '/pages/reports/customer-balances?duration=today',
    },
    {
      label: 'AR Aging Summary',
      link: '/pages/reports/ar-aging-summary?duration=today&date_type=date',
    },
    {
      label: 'AR Aging Details',
      link: '/pages/reports/ar-aging-details?duration=today&date_type=date',
    },

    {
      label: 'Invoice Details',
      link: '/pages/reports/invoice-details?duration=today',
    },
    {
      label: 'Receivable Summary',
      link: '/pages/reports/receivable-summary?duration=today',
    },
    {
      label: 'Receivable Details',
      link: '/pages/reports/receivable-details?duration=today',
    },
  ],
};
export const taxes = {
  title: 'Taxes',
  reports: [
    {
      label: 'Tax Returns',
      link: '/pages/reports/tax-returns',
    },
    {
      label: 'VAT Audit',
      link: '/pages/reports/vat-audit',
    },
  ],
};
export const activity = {
  title: 'Activity',
  reports: [
    {
      label: 'Activity Logs',
      link: '/pages/reports/activity-logs?duration=today',
    },
  ],
};
export const purchaseAndExpenses = {
  title: 'Purchase and Expenses',
  reports: [
    {
      label: 'Purchases by Supplier',
      link: '/pages/reports/purchases-by-supplier?duration=today',
    },
    {
      label: 'Purchases by Item',
      link: '/pages/reports/purchases-by-item?duration=today',
    },
    {
      label: 'Expense Details',
      link: '/pages/reports/expense-details?duration=today',
    },
    {
      label: 'Expenses by Category',
      link: '/pages/reports/expenses-by-category?duration=today',
    },
  ],
};
export const sales = {
  title: 'Sales',
  reports: [
    {
      label: 'Sales by Customer',
      link: '/pages/reports/sales-by-customer?duration=today',
    },
    {
      label: 'Sales by Item',
      link: '/pages/reports/sales-by-item?duration=today',
    },
    {
      label: 'Sales by Sales Person',
      link: '/pages/reports/sales-by-sales-person?duration=today',
    },
    // {
    //   label: 'Sales by Sales Type',
    //   link: '/pages/reports/sales-by-sales-type?duration=today',
    // },
  ],
};
export const accountant = {
  title: 'Accountant',
  reports: [
    {
      label: 'Account Transactions',
      link: '/pages/reports/account-transactions?duration=today',
    },
    {
      label: 'Account Type Summary',
      link: '/pages/reports/account-type-summary?duration=today',
    },
    {
      label: 'General Ledger',
      link: '/pages/reports/general-ledger?duration=today',
    },
    {
      label: 'Detailed General Ledger',
      link: '/pages/reports/detailed-general-ledger?duration=today',
    },
    {
      label: 'Journal Report',
      link: '/pages/reports/journal-report?duration=today',
    },
    {
      label: 'Trial Balance',
      link: '/pages/reports/trial-balance?duration=today',
    },
  ],
};
export const financialReports = {
  title: 'Financial Reports',
  reports: [
    {
      label: 'Profit and Loss (Income Statement)',
      link: '/pages/reports/profit-loss?duration=today&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Cash Flow Statement',
      link: '/pages/reports/cash-flow-statement?duration=today&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Balance Sheet',
      link: '/pages/reports/balance-sheet?duration=today&filter_accounts=accounts_without_zero_balance',
    },
  ],
};
export const reciptVoucher = {
  title: 'Receipt Voucher',
  reports: [
    {
      label: 'Receipt Voucehr',
      link: '/pages/reports/receipt-voucher?duration=today',
    },
    {
      label: 'Credit Note Details',
      link: '/pages/reports/credit-Note-detail?duration=today',
    },
    {
      label: 'Refund History',
      link: '/pages/reports/refund-history?duration=today',
    },
  ],
};

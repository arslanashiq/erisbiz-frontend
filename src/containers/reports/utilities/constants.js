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

export const payableReports = {
  title: 'Payable Reports',
  reports: [
    {
      label: 'Supplier Balances',
      link: '/pages/reports/supplier-balances?duration=this+month',
    },
    {
      label: 'AP Aging Summary',
      link: '/pages/reports/ap-aging-summary?duration=this+month',
    },
    {
      label: 'AP Aging Details',
      link: '/pages/reports/ap-aging-details?duration=this+month&date_type=date',
    },
    {
      label: 'Bill Details',
      link: '/pages/reports/bill-details?duration=this+month',
    },
    {
      label: 'Debit Note',
      link: '/pages/reports/debit-note?duration=this+month',
    },
    {
      label: 'Payment Made',
      link: '/pages/reports/payments-made?duration=this+month',
    },
    {
      label: 'Refund History',
      link: '/pages/reports/supplier-refund-history?duration=this+month',
    },
    {
      label: 'Purchase Order Details',
      link: '/pages/reports/purchase-order-details?duration=this+month',
    },
    {
      label: 'Purchase Order by Supplier',
      link: '/pages/reports/purchase-order-by-supplier?duration=this+month',
    },

    {
      label: 'Payable Summary',
      link: '/pages/reports/payable-summary?duration=this+month',
    },
    {
      label: 'Payable Details',
      link: '/pages/reports/payable-details?duration=this+month',
    },
  ],
};
export const receivableReports = {
  title: 'Receivable Reports',
  reports: [
    {
      label: 'Account Balances',
      link: '/pages/reports/customer-balances?duration=this+month',
    },
    {
      label: 'AR Aging Summary',
      link: '/pages/reports/ar-aging-summary?duration=this+month&date_type=date',
    },
    {
      label: 'AR Aging Details',
      link: '/pages/reports/ar-aging-details?duration=this+month&date_type=date',
    },

    {
      label: 'Invoice Details',
      link: '/pages/reports/invoice-details?duration=this+month',
    },
    {
      label: 'Receivable Summary',
      link: '/pages/reports/receivable-summary?duration=this+month',
    },
    {
      label: 'Receivable Details',
      link: '/pages/reports/receivable-details?duration=this+month',
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
      link: '/pages/reports/activity-logs?duration=this+month',
    },
  ],
};
export const purchaseAndExpenses = {
  title: 'Purchase and Expenses',
  reports: [
    {
      label: 'Purchases by Supplier',
      link: '/pages/reports/purchases-by-supplier?duration=this+month',
    },
    {
      label: 'Purchases by Item',
      link: '/pages/reports/purchases-by-item?duration=this+month',
    },
    {
      label: 'Expense Details',
      link: '/pages/reports/expense-details?duration=this+month',
    },
    {
      label: 'Expenses by Category',
      link: '/pages/reports/expenses-by-category?duration=this+month',
    },
  ],
};
export const sales = {
  title: 'Sales',
  reports: [
    {
      label: 'Sales by Customer',
      link: '/pages/reports/sales-by-customer?duration=this+month',
    },
    {
      label: 'Sales by Item',
      link: '/pages/reports/sales-by-item?duration=this+month',
    },
    {
      label: 'Sales by Sales Person',
      link: '/pages/reports/sales-by-sales-person?duration=this+month',
    },
    // {
    //   label: 'Sales by Sales Type',
    //   link: '/pages/reports/sales-by-sales-type?duration=this+month',
    // },
  ],
};
export const accountant = {
  title: 'Accountant',
  reports: [
    {
      label: 'Account Transactions',
      link: '/pages/reports/account-transactions?duration=this+month',
    },
    {
      label: 'Account Type Summary',
      link: '/pages/reports/account-type-summary?duration=this+month',
    },
    {
      label: 'General Ledger',
      link: '/pages/reports/general-ledger?duration=this+month',
    },
    {
      label: 'Detailed General Ledger',
      link: '/pages/reports/detailed-general-ledger?duration=this+month',
    },
    {
      label: 'Journal Report',
      link: '/pages/reports/journal-report?duration=this+month',
    },
    {
      label: 'Trial Balance (Not)',
      link: '/pages/reports/trial-balance?duration=this+month',
    },
  ],
};
export const financialReports = {
  title: 'Financial Reports',
  reports: [
    {
      label: 'Profit and Loss (Income Statement)',
      link: '/pages/reports/profit-loss?duration=this+month&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Cash Flow Statement (Not)',
      link: '/pages/reports/cash-flow-statement?duration=this+month&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Balance Sheet (Not)',
      link: '/pages/reports/balance-sheet?duration=this+month&filter_accounts=accounts_without_zero_balance',
    },
  ],
};
export const reciptVoucher = {
  title: 'Recipt Voucher',
  reports: [
    {
      label: 'Receipt Voucehr',
      link: '/pages/reports/receipt-voucher?duration=this+month',
    },
    {
      label: 'Credit Note Details',
      link: '/pages/reports/credit-Note-detail?duration=this+month',
    },
    {
      label: 'Refund History',
      link: '/pages/reports/refund-history?duration=this+month',
    },
  ],
};

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
export const statusList = [
  { label: 'All', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Due', value: 'due today' },
  { label: 'Partially Paid', value: 'partially paid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Void', value: 'void' },
];
export const comparisonList = [
  { label: 'None', value: '' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];
export const comparisonSpanDuration = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
];

export const groupBy = [
  { label: 'Date', value: 'date' },
  { label: 'Transaction Type', value: 'transaction-type' },
  { label: 'Supplier Name', value: 'supplier_name' },
];
export const entities = [
  { label: 'Expense', value: 'Expense' },
  { label: 'Purchase Invoice', value: 'Bill' },
  { label: 'Purchase Debit Note', value: 'Debit Note' },
];
export const filterBy = [
  { label: 'All', value: '' },
  { label: 'Expense', value: 'Expense' },
  { label: 'Purchase Invoice', value: 'Bill' },
  { label: 'Journal', value: 'Journal' },
];
export const accountTypes = [
  { label: 'All', value: '' },
  { label: 'Asset', value: 'asset' },
  { label: 'Liability', value: 'liability' },
  { label: 'Expense', value: 'expense' },
];
export const transactionType = [
  { label: 'All', value: '' },
  { label: 'Purchase Invoice', value: 'Bill' },
  { label: 'Payment Voucher', value: 'Supplier Payment' },
  { label: 'Purchase Debit Note', value: 'Debit Note' },
  { label: 'Expense', value: 'Expense' },
  { label: 'Sales Invoice', value: 'Invoice' },
  { label: 'Receipt Voucher', value: 'Customer Receipt' },
  { label: 'Sales Credit Note', value: 'Credit Note' },
  { label: 'Journal Voucher', value: 'Journal' },
];

export const payableReports = {
  title: 'Payable Reports',
  reports: [
    {
      label: 'Supplier Balances',
      link: '/pages/reports/supplier-balances?duration=this%20month',
    },
    {
      label: 'AP Aging Summary',
      link: '/pages/reports/ap-aging-summary?duration=this%20month',
    },
    {
      label: 'AP Aging Details',
      link: '/pages/reports/ap-aging-details?duration=this%20month',
    },
    {
      label: 'Purchase Invoice Register',
      link: '/pages/reports/bill-details?duration=this%20month',
    },
    {
      label: 'Purchase Debit Note',
      link: '/pages/reports/debit-note?duration=this%20month',
    },
    {
      label: 'Invoice wise Payments',
      link: '/pages/reports/payments-made?duration=this%20month',
    },
    // {
    //   label: 'Refund History',
    //   link: '/pages/reports/supplier-refund-history?duration=this%20month',
    // },
    {
      label: 'Purchase Order Details',
      link: '/pages/reports/purchase-order-details?duration=this%20month',
    },
    // {
    //   label: 'Purchase Order by Supplier',
    //   link: '/pages/reports/purchase-order-by-supplier?duration=this%20month',
    // },
    {
      label: 'Expense Details',
      link: '/pages/reports/expense-details?duration=this%20month',
    },
    {
      label: 'Payable Summary',
      link: '/pages/reports/payable-summary?duration=this%20month',
    },
    {
      label: 'Payable Details',
      link: '/pages/reports/payable-details?duration=this%20month',
    },
  ],
};
export const receivableReports = {
  title: 'Receivable Reports',
  reports: [
    {
      label: 'Customer Balances',
      link: '/pages/reports/customer-balances?duration=this%20month',
    },
    {
      label: 'AR Aging Summary',
      link: '/pages/reports/ar-aging-summary?duration=this%20month',
    },
    {
      label: 'AR Aging Details',
      link: '/pages/reports/ar-aging-details?duration=this%20month',
    },

    {
      label: 'Sales Invoice Register',
      link: '/pages/reports/invoice-details?duration=this%20month',
    },
    {
      label: 'Sales Credit Note',
      link: '/pages/reports/credit-Note-detail?duration=this%20month',
    },
    {
      label: 'Invoice wise Receivables',
      link: '/pages/reports/receipt-voucher?duration=this%20month',
    },
    {
      label: 'Receivable Summary',
      link: '/pages/reports/receivable-summary?duration=this%20month',
    },
    {
      label: 'Receivable Details',
      link: '/pages/reports/receivable-details?duration=this%20month',
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
      link: '/pages/reports/activity-logs?duration=this%20month',
    },
  ],
};
export const purchaseAndExpenses = {
  title: 'Purchase and Expenses',
  reports: [
    {
      label: 'Purchases by Supplier',
      link: '/pages/reports/purchases-by-supplier?duration=this%20month',
    },
    {
      label: 'Purchases by Item',
      link: '/pages/reports/purchases-by-item?duration=this%20month',
    },
    {
      label: 'Expense Details',
      link: '/pages/reports/expense-details?duration=this%20month',
    },
    {
      label: 'Expenses by Category',
      link: '/pages/reports/expenses-by-category?duration=this%20month',
    },
  ],
};
export const sales = {
  title: 'Sales',
  reports: [
    {
      label: 'Sales by Customer',
      link: '/pages/reports/sales-by-customer?duration=this%20month',
    },
    {
      label: 'Sales by Item',
      link: '/pages/reports/sales-by-item?duration=this%20month',
    },
    // {
    //   label: 'Sales by Sales Person',
    //   link: '/pages/reports/sales-by-sales-person?duration=this%20month',
    // },
    // {
    //   label: 'Sales by Sales Type',
    //   link: '/pages/reports/sales-by-sales-type?duration=this%20month',
    // },
  ],
};
export const accountant = {
  title: 'Accountant',
  reports: [
    {
      label: 'Account Transactions',
      link: '/pages/reports/account-transactions?duration=this%20month',
    },
    {
      label: 'Account Type Summary',
      link: '/pages/reports/account-type-summary?duration=this%20month',
    },
    {
      label: 'General Ledger',
      link: '/pages/reports/general-ledger?duration=this%20month',
    },
    {
      label: 'Detailed General Ledger',
      link: '/pages/reports/detailed-general-ledger?duration=this%20month',
    },
    {
      label: 'Journal Report',
      link: '/pages/reports/journal-report?duration=this%20month',
    },
    {
      label: 'Trial Balance',
      link: '/pages/reports/trial-balance?duration=this%20month',
    },
  ],
};
export const financialReports = {
  title: 'Financial Reports',
  reports: [
    {
      label: 'Profit and Loss (Income Statement)',
      link: '/pages/reports/profit-loss?duration=this%20month',
    },
    {
      label: 'Cash Flow Statement',
      link: '/pages/reports/cash-flow-statement?duration=this%20month',
    },
    {
      label: 'Balance Sheet',
      link: '/pages/reports/balance-sheet?duration=this%20month',
    },
  ],
};
export const reciptVoucher = {
  title: 'Receipt Voucher',
  reports: [
    {
      label: 'Receipt Voucher',
      link: '/pages/reports/receipt-voucher?duration=this%20month',
    },
    {
      label: 'Sales Credit Note',
      link: '/pages/reports/credit-Note-detail?duration=this%20month',
    },
    // {
    //   label: 'Refund History',
    //   link: '/pages/reports/refund-history?duration=this%20month',
    // },
  ],
};

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
      link: '/pages/reports/bill-details?duration=this+month',
    },
    {
      label: 'Debit Note Made',
      link: '/pages/reports/payments-made',
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
      link: '/pages/reports/purchase-order-by-supplier',
    },

    {
      label: 'Payable Summary',
      link: '/pages/reports/payable-summary',
    },
    {
      label: 'Payable Details',
      link: '/pages/reports/payable-details',
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
      link: '/pages/reports/invoice-details',
    },
    {
      label: 'Receivable Summary',
      link: '/pages/reports/receivable-summary',
    },
    {
      label: 'Receivable Details',
      link: '/pages/reports/receivable-details',
    },
  ],
};
export const taxes = {
  title: 'Taxes',
  reports: [
    {
      label: 'Tax Returns',
      link: '/pages/reports/taxReturns',
    },
    {
      label: 'VAT Audit',
      link: '/pages/reports/vatAudit',
    },
  ],
};
export const activity = {
  title: 'Activity',
  reports: [
    {
      label: 'Activity Logs',
      link: 'pages/reports/activityLogs?duration=today',
    },
  ],
};
export const purchaseAndExpenses = {
  title: 'Purchase and Expenses',
  reports: [
    {
      label: 'Purchases by Supplier',
      link: '/pages/reports/purchases-by-supplier',
    },
    {
      label: 'Purchases by Item',
      link: '/pages/reports/purchases-by-item',
    },
    {
      label: 'Expense Details',
      link: '/pages/reports/expense-details',
    },
    {
      label: 'Expenses by Category',
      link: '/pages/reports/expenses-by-category',
    },
  ],
};
export const sales = {
  title: 'Sales',
  reports: [
    {
      label: 'Sales by Customer',
      link: '/pages/reports/sales-by-customer',
    },
    {
      label: 'Sales by Item',
      link: '/pages/reports/sales-by-item',
    },
    {
      label: 'Sales by Sales Person',
      link: '/pages/reports/sales-by-sales-person',
    },
    {
      label: 'Sales by Sales Type',
      link: '/pages/reports/sales-by-sales-type',
    },
  ],
};
export const accountant = {
  title: 'Accountant',
  reports: [
    {
      label: 'Account Transactions',
      link: '/pages/reports/accountTransactions',
    },
    {
      label: 'Account Type Summary',
      link: '/pages/reports/accountTypeSummary?duration=today',
    },
    {
      label: 'General Ledger',
      link: '/pages/reports/generalLedger?duration=today',
    },
    {
      label: 'Detailed General Ledger',
      link: '/pages/reports/detailedgeneralLedger',
    },
    {
      label: 'Journal Report',
      link: '/pages/reports/journalReport',
    },
    {
      label: 'Trial Balance',
      link: '/pages/reports/trialBalance?duration=today',
    },
  ],
};
export const financialReports = {
  title: 'Financial Reports',
  reports: [
    {
      label: 'Profit and Loss (Income Statement)',
      link: '/pages/reports/profitAndLoss?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Cash Flow Statement',
      link: '/pages/reports/cashFlowStatement?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
    {
      label: 'Balance Sheet',
      link: '/pages/reports/balanceSheet?duration=this+year&filter_accounts=accounts_without_zero_balance',
    },
  ],
};
export const reciptVoucher = {
  title: 'Recipt Voucher',
  reports: [
    {
      label: 'Payments Received',
      link: '/pages/reports/paymentsReceived',
    },
    {
      label: 'Credit Note Details',
      link: '/pages/reports/creditNoteDetails?duration=today',
    },
    {
      label: 'Refund History',
      link: '/pages/reports/refundHistory',
    },
  ],
};

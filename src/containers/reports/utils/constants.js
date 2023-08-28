export const payableReports = {
  title: 'Payable Reports',
  reports: [
    {
      label: 'Supplier Balances',
      link: '/pages/reports/supplierBalances?duration=today',
    },
    {
      label: 'AP Aging Summary',
      link: '/pages/reports/apAgingSummary?duration=today&date_type=date',
    },
    {
      label: 'AP Aging Details',
      link: '/pages/reports/apAgingDetails?duration=today&date_type=date',
    },
    {
      label: 'Debit Note Details',
      link: '/pages/reports/supplierCreditDetails',
    },
    {
      label: 'Payments Made',
      link: '/pages/reports/paymentsMade',
    },
    {
      label: 'Refund History',
      link: '/pages/reports/supplierRefundHistory',
    },
    {
      label: 'Purchase Order Details',
      link: '/pages/reports/purchaseOrderDetails',
    },
    {
      label: 'Purchase Order by Supplier',
      link: '/pages/reports/purchaseOrdersBySuppliers',
    },

    {
      label: 'Payable Summary',
      link: '/pages/reports/payableSummary',
    },
    {
      label: 'Payable Details',
      link: '/pages/reports/payableDetails',
    },
  ],
};
export const receivableReports = {
  title: 'Receivable Reports',
  reports: [
    {
      label: 'Account Balances',
      link: '/pages/reports/customerBalances?duration=today',
    },
    {
      label: 'AR Aging Summary',
      link: '/pages/reports/arAgingSummary?duration=today&date_type=date',
    },
    {
      label: 'AR Aging Details',
      link: '/pages/reports/arAgingDetails?duration=today&date_type=date',
    },

    {
      label: 'Invoice Details',
      link: '/pages/reports/invoiceDetails',
    },
    {
      label: 'Receivable Summary',
      link: '/pages/reports/receivableSummary',
    },
    {
      label: 'Receivable Details',
      link: '/pages/reports/receivableDetails',
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
      link: '/pages/reports/purchasesBySupplier',
    },
    {
      label: 'Purchases by Item',
      link: '/pages/reports/purchasesByItem',
    },
    {
      label: 'Expense Details',
      link: '/pages/reports/expenseDetails',
    },
    {
      label: 'Expenses by Category',
      link: '/pages/reports/expensesByCategory',
    },
    {
      label: 'Purchases by Client Type',
      link: '/pages/reports/puchasesByClientType?duration=this month&customer_type=vip',
    },
  ],
};
export const sales = {
  title: 'Sales',
  reports: [
    {
      label: 'Sales by Account',
      link: '/pages/reports/salesByCustomer',
    },
    {
      label: 'Sales by Item',
      link: '/pages/reports/salesByItem',
    },
    {
      label: 'Sales by Sales Person',
      link: '/pages/reports/salesBySalesPerson',
    },
    {
      label: 'Sales by Sales Type',
      link: '/pages/reports/salesBySalesType?duration=this month&customer_type=vip',
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

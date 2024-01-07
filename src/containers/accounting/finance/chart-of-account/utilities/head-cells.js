export const chartOfAccountHeadCells = [
  {
    id: 'account_name',
    numeric: false,
    disablePadding: true,
    label: 'Account Name',
    align: 'left',
    isLink: true,
  },
  {
    id: 'account_type',
    disablePadding: false,
    label: 'Account Type',
    align: 'left',
  },
  {
    id: 'parent_account_name',
    disablePadding: false,
    label: 'Parent Account Name',
    align: 'left',
  },
];
export const chartOfAccountDetailTableHeadCells = [
  {
    id: 'transaction_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'transaction_detail',
    numeric: false,
    disablePadding: true,
    label: 'Transaction Details',
    align: 'left',
  },
  {
    id: 'transaction_type',
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },
  {
    id: 'bcy_debit',
    disablePadding: false,
    label: 'Debit',
    align: 'left',
    formatAmount: true,
  },

  {
    id: 'bcy_credit',
    disablePadding: false,
    label: 'Credit',
    align: 'left',
    formatAmount: true,
  },
];
export const chartOfAccountCompleteDetailTableHeadCells = [
  {
    id: 'transaction_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'account_name',
    numeric: false,
    disablePadding: true,
    label: 'ACCOUNT',
    align: 'left',
    isLink: true,
  },
  {
    id: 'transaction_detail',
    disablePadding: false,
    label: 'TRANSACTION DETAILS',
    align: 'left',
  },
  {
    id: 'transaction_type',
    disablePadding: false,
    label: 'TRANSACTION TYPE',
    align: 'left',
  },
  {
    id: 'transaction_number',
    disablePadding: false,
    label: 'TRANSACTION #',
    align: 'left',
  },
  {
    id: 'reference_number',
    disablePadding: false,
    label: 'REFERENCE #',
    align: 'left',
  },
  {
    id: 'bcy_debit',
    disablePadding: false,
    label: 'DEBIT',
    align: 'left',
    formatAmount: true,
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/payment-voucher/${row.object_id}/detail`,
  },
  {
    id: 'bcy_credit',
    disablePadding: false,
    label: 'Credit',
    align: 'left',
    formatAmount: true,
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/payment-voucher/${row.object_id}/detail`,
  },
  {
    id: 'total_amount',
    disablePadding: false,
    label: 'AMOUNT',
    align: 'left',
    formatAmount: true,
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/payment-voucher/${row.object_id}/detail`,
  },
];

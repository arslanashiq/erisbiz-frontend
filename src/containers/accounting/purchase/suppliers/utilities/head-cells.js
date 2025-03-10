export const supplierHeadCells = [
  {
    id: 'supplier_name',
    numeric: false,
    disablePadding: true,
    label: 'Supplier ',
    align: 'left',
    isLink: true,
    sliceLength: 30,
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
    align: 'left',
  },
  {
    id: 'contact_person',
    numeric: true,
    disablePadding: false,
    label: 'Contact Person',
    align: 'left',
  },

  {
    id: 'mobile_num',
    numeric: true,
    disablePadding: false,
    label: 'Mobile',
    align: 'left',
  },

  // {
  //   id: 'currency_symbol',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Currency',
  //   align: 'left',
  // },
  {
    id: 'payables',
    numeric: true,
    disablePadding: false,
    label: 'Payables',
    align: 'left',
    formatAmount: true,
  },
];

export const supplierOpeningBalanceTransactionHeadCells = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },

  {
    id: 'grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
  {
    id: 'bcy_sales_amount',
    numeric: true,
    disablePadding: false,
    label: 'Balance Due',
    align: 'left',
    formatAmount: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const supplierPurchaseOrderTransactionHeadCells = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },

  {
    id: 'pur_order_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/purchase-orders/${row.id}/detail`,
  },
  {
    id: 'grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const supplierBillTransactionHeadCells = [
  {
    id: 'bill_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'bill_num',
    numeric: true,
    disablePadding: false,
    label: 'Invoice #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/purchase-invoice/${row.id}/detail`,
  },
  {
    id: 'pur_order_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Order #',
    align: 'left',
  },
  {
    id: 'grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
  {
    id: 'amount_due',
    numeric: true,
    disablePadding: false,
    label: 'Balance Due',
    align: 'left',
    formatAmount: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const supplierJournalTransactionHeadCells = [
  {
    id: 'created_at',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Journal #',
    align: 'left',
  },
  {
    id: 'account_name',
    numeric: true,
    disablePadding: false,
    label: 'Account Name',
    align: 'left',
  },
  {
    id: 'debit',
    numeric: true,
    disablePadding: false,
    label: 'Debit',
    align: 'left',
    formatAmount: true,
  },

  {
    id: 'credit',
    numeric: true,
    disablePadding: false,
    label: 'Credit',
    align: 'left',
    formatAmount: true,
  },
];
export const supplierPaymentVoucherTransactionHeadCells = [
  {
    id: 'payment_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'payment_num',
    numeric: true,
    disablePadding: false,
    label: 'Payment #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/payment-voucher/${row.id}/detail`,
  },
  {
    id: 'reference_num',
    numeric: true,
    disablePadding: false,
    label: 'Reference #',
    align: 'left',
  },
  {
    id: 'payment_mode',
    numeric: true,
    disablePadding: false,
    label: 'Payment Mode',
    align: 'left',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Amount Paid',
    align: 'left',
    formatAmount: true,
  },

  {
    id: 'unused_amount',
    numeric: true,
    disablePadding: false,
    label: 'Unused Amount',
    align: 'left',
    formatAmount: true,
  },
];
export const supplierDebitNoteTransactionHeadCells = [
  {
    id: 'supplier_credit_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
  },
  {
    id: 'supplier_credit_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Debit Note #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/debit-notes/${row.id}/detail`,
  },
  {
    id: 'bill_formated_number',
    numeric: true,
    disablePadding: false,
    label: 'Bill #',
    align: 'left',
  },
  {
    id: 'credits_remaining',
    numeric: true,
    disablePadding: false,
    label: 'Balance',
    align: 'left',
    formatAmount: true,
  },

  {
    id: 'grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const supplierExpenseTransactionHeadCells = [
  {
    id: 'expense_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
  },
  {
    id: 'expense_account_name',
    numeric: true,
    disablePadding: false,
    label: 'Account Name',
    align: 'left',
  },
  {
    id: 'paid_through_account_name',
    numeric: true,
    disablePadding: false,
    label: 'Paid Through',
    align: 'left',
  },

  {
    id: 'bcy_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];

export const supplierContactHeadCells = [
  {
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    align: 'left',
  },
  {
    id: 'designation',
    numeric: true,
    disablePadding: false,
    label: 'Designation',
    align: 'left',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
    align: 'left',
  },

  {
    id: 'mobile_num',
    numeric: true,
    disablePadding: false,
    label: 'Mobile Number',
    align: 'left',
  },

  {
    id: 'notes',
    numeric: true,
    disablePadding: false,
    label: 'Remarks',
    align: 'left',
  },
];

export const supplierUnusedCreditHeadCells = [
  {
    id: 'type',
    numeric: false,
    disablePadding: true,
    label: 'Credit Info',
    align: 'left',
    isLink: true,
    handleLink: row => {
      if (row.type === 'Debit Note') {
        return `/pages/accounting/purchase/debit-notes/${row.id}/detail`;
      }
      if (row.type === 'Excess Payment') {
        return `/pages/accounting/purchase/payment-voucher/${row.id}/detail`;
      }
      return '#';
    },
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date Credited',
    align: 'left',
  },
  {
    id: 'amount_due',
    numeric: false,
    disablePadding: true,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
];

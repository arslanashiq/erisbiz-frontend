export const supplierHeadCells = [
  {
    id: 'supplier_name',
    numeric: false,
    disablePadding: true,
    label: 'Supplier ',
    align: 'left',
    isLink: true,
  },
  {
    id: 'contact_person',
    numeric: true,
    disablePadding: false,
    label: 'Contact Person',
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
    mergeCell: true,
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
    mergeCell: true,
  },
  {
    id: 'amount_due',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    mergeCell: true,
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
  },
  {
    id: 'grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    mergeCell: true,
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
    mergeCell: true,
  },
  {
    id: 'amount_due',
    numeric: true,
    disablePadding: false,
    label: 'Amount Due',
    align: 'left',
    mergeCell: true,
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
    id: 'account_name',
    numeric: true,
    disablePadding: false,
    label: 'Account #',
    align: 'left',
  },
  {
    id: 'debit',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    mergeCell: true,
  },

  {
    id: 'credit',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    mergeCell: true,
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
    label: 'Total',
    align: 'left',
    mergeCell: true,
  },

  {
    id: 'unused_amount',
    numeric: true,
    disablePadding: false,
    label: 'Unused Amount',
    align: 'left',
    mergeCell: true,
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
  },
  {
    id: 'bill_formated_number',
    numeric: true,
    disablePadding: false,
    label: 'Bill #',
    align: 'left',
  },
  {
    id: 'grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Balance',
    align: 'left',
    mergeCell: true,
  },

  {
    id: 'credits_remaining',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    mergeCell: true,
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
    mergeCell: true,
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

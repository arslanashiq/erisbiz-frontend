import { handleGetStatusBaseClass } from 'utilities/status-base-style';

export const purchaseInvoiceHeadCells = [
  {
    id: 'bill_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },
  {
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier ',
    align: 'left',
    sliceLength: 30,
  },
  {
    id: 'bill_num',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Invoice#',
    align: 'left',
    isLink: true,
  },

  // {
  //   id: 'bill_formated_number',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Reference #',
  //   align: 'left',
  // },

  {
    id: 'due_date',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
    align: 'left',
    date: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    class: handleGetStatusBaseClass,
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
];

export const paymentsAgainstPurchaseInvoiceHeadCells = [
  {
    id: 'payment_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'payment_number',
    numeric: true,
    disablePadding: false,
    label: 'Payment',
    isLink: true,
    align: 'left',
    handleLink: data => `/pages/accounting/purchase/payment-voucher/${data.payment_id}/detail`,
  },
  {
    id: 'reference_number',
    numeric: true,
    disablePadding: false,
    label: 'Reference#',
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
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
];
export const paymentsAgainstSaleInvoiceHeadCells = [
  {
    id: 'payment_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'payment_number',
    numeric: true,
    disablePadding: false,
    label: 'Payment',
    isLink: true,
    align: 'left',
    handleLink: data => `/pages/accounting/sales/receipt-voucher/${data.payment_id}/detail`,
  },
  {
    id: 'reference_number',
    numeric: true,
    disablePadding: false,
    label: 'Reference#',
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
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
  },
];
export const purchaseDebitNoteAgainstPurchaseInvoiceHeadCells = [
  {
    id: 'credit_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'credit_number',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Debit Note #',
    isLink: true,
    align: 'left',
    handleLink: data => `/pages/accounting/purchase/debit-notes/${data.supplier_credit_id}/detail`,
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Debit Applied',
    align: 'left',
  },
];
export const saleCreditNoteAgainstSaleInvoiceHeadCells = [
  {
    id: 'credit_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'credit_number',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Debit Note #',
    isLink: true,
    align: 'left',
    handleLink: data => `/pages/accounting/sales/credit-notes/${data.supplier_credit_id}/detail`,
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Debit Applied',
    align: 'left',
  },
];

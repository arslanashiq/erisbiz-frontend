// item transactions cells
export const itemInventoryAdjustmentTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'inventory_number',
    numeric: true,
    disablePadding: false,
    label: 'Inventory Number',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemQuotationTransactionHeadCells = [
  {
    id: 'quotation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'quotation_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Qutation #',
    align: 'left',
  },
  {
    id: 'event',
    numeric: true,
    disablePadding: false,
    label: 'Event',
    align: 'left',
  },
  {
    id: 'grand_total_aed',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemPerformaInvoiceTransactionHeadCells = [
  {
    id: 'pro_invoice_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'pro_invoice_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Qutation #',
    align: 'left',
  },
  {
    id: 'event',
    numeric: true,
    disablePadding: false,
    label: 'Event',
    align: 'left',
  },
  {
    id: 'grand_total_aed',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemInvoiceTransactionHeadCells = [
  {
    id: 'pro_invoice_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'invoice_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Qutation #',
    align: 'left',
  },
  {
    id: 'event',
    numeric: true,
    disablePadding: false,
    label: 'Event',
    align: 'left',
  },
  {
    id: 'bcy_grand_total_invoice_currency',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemCreditNoteTransactionHeadCells = [
  {
    id: 'pro_invoice_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'invoice_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'CREDIT NOTE #',
    align: 'left',
  },
  {
    id: 'bcy_grand_total_invoice_currency',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemPurchaseOrderTransactionHeadCells = [
  {
    id: 'pur_order_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
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
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier Name',
    align: 'center',
  },
  {
    id: 'without_change_amount_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemBillTransactionHeadCells = [
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
    id: 'bill_formated_number',
    numeric: true,
    disablePadding: false,
    label: 'Bill #',
    align: 'left',
  },
  {
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier Name',
    align: 'left',
  },
  {
    id: 'amount_due_bill_currency',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemDebitNoteTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'debit_note',
    numeric: true,
    disablePadding: false,
    label: 'Debit Note #',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];

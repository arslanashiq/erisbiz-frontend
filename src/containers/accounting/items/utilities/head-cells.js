export const itemsHeadCell = [
  {
    id: 'item_name',
    numeric: false,
    disablePadding: true,
    label: 'Item Name',
    align: 'left',
    isLink: true,
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Item Type',
    align: 'left',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
    align: 'left',
  },
  {
    id: 'is_active',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'right',
  },
];

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
    id: 'date',
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
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    mergeCell: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemProformaInvoiceTransactionHeadCells = [
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
    id: 'grand_total_aed',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    mergeCell: true,
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
    id: 'date',
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
    id: 'bcy_grand_total_invoice_currency',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    mergeCell: true,
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
    id: 'credit_note_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'credit_note_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'CREDIT NOTE #',
    align: 'left',
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    mergeCell: true,
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
    id: 'date',
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
    label: 'Supplier ',
    align: 'center',
  },
  {
    id: 'without_change_amount_total',
    numeric: true,
    disablePadding: false,
    mergeCell: true,
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
    label: 'Supplier ',
    align: 'left',
  },
  {
    id: 'without_change_grand_total',
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
export const itemDebitNoteTransactionHeadCells = [
  {
    id: 'supplier_credit_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'supplier_credit_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Debit Note #',
    align: 'left',
  },
  {
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier ',
    align: 'left',
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    mergeCell: true,
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

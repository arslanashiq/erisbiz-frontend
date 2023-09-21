export const receiptVoucherHeadCells = [
  {
    id: 'payment_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },
  {
    id: 'customer_info',
    numeric: true,
    disablePadding: false,
    label: 'Customer Name',
    align: 'left',
    cellValueAction: customerInfo => customerInfo.customer_name,
  },
  {
    id: 'payment_num',
    numeric: true,
    disablePadding: false,
    label: 'Payment Number',
    align: 'center',
    isLink: true,
  },

  {
    id: 'reference_num',
    numeric: true,
    disablePadding: false,
    label: 'Reference Number',
    align: 'left',
  },
  {
    id: 'created_by_employee_name',
    numeric: true,
    disablePadding: false,
    label: 'Added By',
    align: 'left',
  },

  {
    id: 'payment_mode',
    numeric: true,
    disablePadding: false,
    label: 'Payment Mode',
    align: 'center',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total Amount',
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
export const UnPaidSaleInvoiceHeadCells = [
  {
    id: 'date',
    disablePadding: true,
    label: 'Date',
    date: true,
  },
  {
    id: 'invoice_id',
    disablePadding: true,
    label: 'Invoice No',
    align: 'left',
    defaultValue: '-',
  },
  {
    id: 'grand_total',
    disablePadding: true,
    label: 'Total Amount',
    align: 'left',
    defaultValue: '-',
  },

  {
    id: 'amount_due',
    disablePadding: true,
    label: 'Amount Due',
    defaultValue: '0',
  },
  {
    id: 'payment',
    disablePadding: true,
    align: 'center',
    label: 'Payment',
    isInput: true,
  },
];

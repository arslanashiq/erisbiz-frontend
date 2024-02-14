import { handleGetStatusBaseClass } from 'utilities/status-base-style';
import { customerSliceValueAction } from '../../quotations/utilities/head-cells';

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
    label: 'Customer',
    align: 'left',
    sliceLength: 30,
    sliceValueAction: customerSliceValueAction,
    cellValueAction: customerInfo => customerInfo.customer_name,
  },
  {
    id: 'payment_num',
    numeric: true,
    disablePadding: false,
    label: 'Payment #',
    align: 'left',
    isLink: true,
  },

  {
    id: 'reference_num',
    numeric: true,
    disablePadding: false,
    label: 'Reference #',
    align: 'left',
  },
  // {
  //   id: 'created_by_employee_name',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Added By',
  //   align: 'left',
  // },

  {
    id: 'payment_mode',
    numeric: true,
    disablePadding: false,
    label: 'Payment Mode',
    align: 'left',
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
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    formatAmount: true,
    align: 'left',
  },
  {
    id: 'over_payment',
    numeric: true,
    disablePadding: false,
    label: 'Unused Amount',
    formatAmount: true,
    align: 'left',
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
    id: 'invoice_formatted_number',
    disablePadding: true,
    label: 'Invoice No',
    align: 'left',
    defaultValue: '-',
    cellValueAction: row => row?.invoice_formatted_number || row?.invoice_num,
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

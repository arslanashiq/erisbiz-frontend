import { handleGetStatusBaseClass } from 'utilities/status-base-style';
import { customerSliceValueAction } from '../../quotations/utilities/head-cells';

export const invoiceHeadCell = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
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
    id: 'invoice_formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Sales Invoice #',
    align: 'left',
    isLink: true,
  },
  // {
  //   id: 'created_by_employee_name',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Added By',
  //   align: 'left',
  // },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    class: handleGetStatusBaseClass,
  },

  {
    id: 'without_change_amount_total',
    numeric: true,
    disablePadding: false,
    label: 'Gross Total',
    align: 'left',
    formatAmount: true,
  },
  {
    id: 'without_change_vat_total',
    numeric: true,
    disablePadding: false,
    label: 'VAT',
    align: 'left',
    formatAmount: true,
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
    align: 'left',
    formatAmount: true,
  },
];
export const test = '';

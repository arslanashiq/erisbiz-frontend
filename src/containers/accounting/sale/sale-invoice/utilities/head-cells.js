import formatAmount from 'utilities/formatAmount';
import { handleGetStatusBaseClass } from 'utilities/status-base-style';

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
    id: 'invoice_formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Invoice Number',
    align: 'left',
    isLink: true,
  },
  {
    id: 'customer_info',
    numeric: true,
    disablePadding: false,
    label: 'Customer',
    align: 'left',
    cellValueAction: customerInfo => customerInfo.customer_name,
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
    cellValueAction: (value, currencySymbol) => `${currencySymbol}${formatAmount(value)}`,
  },
  {
    id: 'without_change_vat_total',
    numeric: true,
    disablePadding: false,
    label: 'VAT',
    align: 'left',
    cellValueAction: (value, currencySymbol) => `${currencySymbol}${formatAmount(value)}`,
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
    align: 'left',
    cellValueAction: (value, currencySymbol) => `${currencySymbol}${formatAmount(value)}`,
  },
];
export const test = '';

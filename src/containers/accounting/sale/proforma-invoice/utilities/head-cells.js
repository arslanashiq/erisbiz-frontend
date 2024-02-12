import { handleGetStatusBaseClass } from 'utilities/status-base-style';

export const proformaInvoiceHeadCell = [
  {
    id: 'pro_invoice_date',
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
    cellValueAction: customerInfo => customerInfo.customer_name,
  },
  {
    id: 'pro_invoice_formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Invoice Number',
    align: 'left',
    isLink: true,
  },

  // {
  //   id: 'sales_person',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Sales Person',
  //   align: 'right',
  // },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    class: handleGetStatusBaseClass,
  },
  // {
  //   id: 'created_by_employee_name',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Added By',
  //   align: 'right',
  // },
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

import formatAmount from 'utilities/formatAmount';
import { handleGetStatusBaseClass } from 'utilities/status-base-style';

export const creditNoteHeadCells = [
  {
    id: 'credit_note_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'invoice_num_with_suffix',
    numeric: false,
    disablePadding: true,
    label: 'Sales Invoice #',
    align: 'left',
  },
  {
    id: 'credit_note_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Credit Note #',
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
    align: 'center',
    cellValueAction: (value, currencySymbol) => `${currencySymbol}${formatAmount(value)}`,
  },
];

export const test = '';

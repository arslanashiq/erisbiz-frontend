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
    label: 'Customer',
    align: 'left',
    cellValueAction: (_, __, row) => row?.invoice?.customer_info?.customer_name || '-',
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
    label: 'Total',
    align: 'center',
    formatAmount: true,
  },
  {
    id: 'credits_remaining',
    numeric: true,
    disablePadding: false,
    label: 'Balance',
    align: 'center',
    formatAmount: true,
  },
];

export const test = '';

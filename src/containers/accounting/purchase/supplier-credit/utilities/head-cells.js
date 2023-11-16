import { handleGetStatusBaseClass } from 'utilities/status-base-style';

export const supplierCreditHeadCells = [
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
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier Name',
    align: 'left',
  },
  {
    id: 'supplier_credit_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Debit Note Number',
    align: 'left',
    isLink: true,
  },
  {
    id: 'bill_num',
    numeric: true,
    disablePadding: false,
    label: 'Bill Number',
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
    id: 'currency_symbol',
    numeric: true,
    disablePadding: false,
    label: 'Currency',
    align: 'left',
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
  },
  {
    id: 'amount_due_bill_currency',
    numeric: true,
    disablePadding: false,
    label: 'Balance',
    align: 'left',
  },
];

export const test = '';

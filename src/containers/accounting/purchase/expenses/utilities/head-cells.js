import { handleGetStatusBaseClass } from 'utilities/status-base-style';

export const expensesHeadCells = [
  {
    id: 'expense_date',
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
    label: 'Supplier ',
    align: 'left',
  },

  {
    id: 'expense_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Expense #',
    align: 'left',
    isLink: true,
  },

  {
    id: 'expense_account_name',
    numeric: true,
    disablePadding: false,
    label: 'Expense Account',
    align: 'left',
  },

  // {
  //   id: 'reference_num',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Reference #',
  //   align: 'left',
  // },
  {
    id: 'paid_through_account_name',
    numeric: true,
    disablePadding: false,
    label: 'Paid Through',
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
    align: 'left',
    formatAmount: true,
  },
];
export const test = '';

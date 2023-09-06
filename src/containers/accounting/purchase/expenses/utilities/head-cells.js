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
    label: 'Supplier Name',
    align: 'left',
  },
  {
    id: 'expense_account_name',
    numeric: true,
    disablePadding: false,
    label: 'Expense Account',
    align: 'left',
    isLink: true,
  },

  {
    id: 'reference_num',
    numeric: true,
    disablePadding: false,
    label: 'Refrence #',
    align: 'left',
  },
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
    style: value => {
      if (value.includes('overdue')) {
        return {
          color: 'red',
        };
      }
      return {};
    },
  },
  {
    id: 'total_without_tax',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Expense Amount(WHT)',
    align: 'center',
  },
];
export const test = '';

export const journalVoucherHeadCells = [
  {
    id: 'journal_date',
    numeric: false,
    disablePadding: true,
    label: 'Journal Date',
    align: 'left',
    date: true,
  },
  {
    id: 'journal_formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Journal Number',
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

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    class: value => {
      if (!value) return '';
      const temp = value.toLowerCase();
      if (temp === 'invoiced') return 'color-primary';
      if (temp === 'draft') return 'color-silver';
      if (temp === 'cancelled') return 'color-danger';

      return '';
    },
  },
  // {
  //   id: 'created_by_employee_name',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Added By',
  //   align: 'right',
  // },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    mergeCell: true,
  },
  {
    id: 'updated_by',
    numeric: true,
    disablePadding: false,
    label: 'Credited By',
    align: 'center',
  },
];
export const journalVoucherAccountTable = [
  {
    id: 'account_name',
    numeric: false,
    disablePadding: true,
    label: 'Account',
    align: 'left',
  },
  {
    id: 'debit',
    numeric: false,
    disablePadding: true,
    label: 'Debit',
    align: 'center',
    isLink: true,
  },
  {
    id: 'credit',
    numeric: true,
    disablePadding: false,
    label: 'Credits',
    align: 'center',
  },
];

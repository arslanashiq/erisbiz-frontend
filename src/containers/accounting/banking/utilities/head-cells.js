export const BankingHeadCells = [
  {
    id: 'bank_name',
    numeric: false,
    disablePadding: true,
    label: 'Bank Name',
    align: 'left',
    isLink: true,
  },
  {
    id: 'branch_name',
    disablePadding: false,
    label: 'Branch Name',
    align: 'left',
  },
  {
    id: 'account_number',
    disablePadding: false,
    label: 'Account Number',
  },
  {
    id: 'is_active',
    disablePadding: false,
    label: 'Status',
    align: 'left',
    cellValueAction: value => {
      if (value === true) return 'Activated';
      return 'Deactivated';
    },
  },
];

export const bankTransactionsHeadCells = [
  {
    id: 'transaction_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    // date: true,
  },
  {
    id: 'reference_number',
    disablePadding: false,
    label: 'Reference #',
    align: 'left',
  },
  {
    id: 'bcy_debit',
    disablePadding: false,
    label: 'Debit',
  },
  {
    id: 'bcy_credit',
    disablePadding: false,
    label: 'Credit',
  },
  {
    id: 'amount_without_tax',
    disablePadding: false,
    label: 'Amount',
  },
];

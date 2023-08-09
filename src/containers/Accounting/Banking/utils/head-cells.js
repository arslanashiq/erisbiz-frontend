/* eslint-disable import/prefer-default-export */
export const BankingHeadCells = [
  {
    id: 'bank_account_name',
    numeric: false,
    disablePadding: true,
    label: 'Account Name',
    align: 'left',
    isLink: true,
  },
  {
    id: 'bank_name',
    disablePadding: false,
    label: 'Bank Name',
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

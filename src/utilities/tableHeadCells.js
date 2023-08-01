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
    true_value: 'Active',
    false_value: 'In Active',
  },
];
export const itemsHeadCell = [
  {
    id: 'item_name',
    numeric: false,
    disablePadding: true,
    label: 'Item Name',
    align: 'left',
    isLink: true,
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Item Type',
    align: 'right',
  },
  {
    id: 'sale_description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
    align: 'right',
  },
  {
    id: 'is_active',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'right',
  },
];

export const chartOfAccountTypeFilter = [
  ['Asset'],
  ['Asset', 'Liability', 'Equity', 'Income', 'Expense'],
  ['Liability'],
  [
    'Expense',
    'Cash',
    'Accounts Receivable',
    'Stock',
    'Bank',
    'Accounts Payable',
    'Credit Card',
    'Cost of Sales',
    'Other Expense',
    'Other Asset',
    'Income',
    'Other Current Liability',
    'Equity',
  ],
];
export function getAccountTypesOptions(
  accountTypes,
  chartOfAccountTypeFilterIndex = [1],
  key = 'account_group'
) {
  const list = {};
  accountTypes.forEach(account => {
    if (!list[account[key]]) {
      list[account[key]] = true;
    }
  });
  const typeOptions = chartOfAccountTypeFilter[chartOfAccountTypeFilterIndex].map(group => ({
    label: group,
    options: accountTypes
      .filter(type => type[key]?.toLowerCase() === group?.toLowerCase())
      .map(item => ({
        label: item.label,
        value: item.value,
      })),
  }));

  return typeOptions;
}

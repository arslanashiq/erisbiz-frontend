export const chartOfAccountTypeFilter = [
  ['Asset'],
  ['Asset', 'Liability', 'Equity', 'Income', 'Expense'],
  ['Liability'],
];
export function getAccountTypesOptions(
  accountTypes,
  chartOfAccountTypeFilterIndex = [1],
  key = 'account_group'
) {
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

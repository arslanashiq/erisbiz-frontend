export const groups = [
  ['Asset'],
  ['Asset', 'Expense'],
  ['Asset', 'Liability', 'Equity', 'Income', 'Expense'],
  ['Liability'],
];
export function getAccountTypesOptions(accountTypes, groupIndex = [2], key = 'account_group') {
  const typeOptions = groups[groupIndex].map(group => ({
    label: group,
    options: accountTypes
      .filter(type => type[key] === group?.toLowerCase())
      .map(item => ({
        label: item.label,
        value: item.value,
      })),
  }));

  return typeOptions;
}

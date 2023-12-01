/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
export const groups = [
  ['Asset'],
  ['Asset', 'Expense'],
  ['Asset', 'Liability', 'Equity', 'Income', 'Expense'],
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

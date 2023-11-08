export const groups = [['Asset'], ['Asset', 'Liability', 'Equity', 'Income', 'Expense']];
export function getAccountTypesOptions(accountTypes, groupIndex = [1]) {
  const typeOptions = groups[groupIndex].map(group => ({
    label: group,
    options: accountTypes
      .filter(type => type?.account_group === group.toLowerCase())
      .map(item => ({
        label: item.label,
        value: item.value,
      })),
  }));

  return typeOptions;
}

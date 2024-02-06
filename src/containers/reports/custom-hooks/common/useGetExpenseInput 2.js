import useListOptions from 'custom-hooks/useListOptions';
import { useGetExpensesListQuery } from 'services/private/expenses';

function useGetExpenseInput() {
  const expenseListResponse = useGetExpensesListQuery();

  const { optionsList: customersOptions } = useListOptions(expenseListResponse?.data?.results, {
    value: 'id',
    label: 'expense_account_name',
  });

  return {
    label: 'Expense',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'expense',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Expense'],
  };
}

export default useGetExpenseInput;

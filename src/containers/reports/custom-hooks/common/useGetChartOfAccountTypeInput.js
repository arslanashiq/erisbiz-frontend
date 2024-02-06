/* eslint-disable no-unused-vars */
import useListOptions from 'custom-hooks/useListOptions';
import { useGetChartOfAccountTypesQuery } from 'services/private/chart-of-account';
import { getAccountTypesOptions } from 'utilities/get-account-type-options';

function useGetChartOfAccountTypeInput(queryOptions) {
  const chartOfAccountTypes = useGetChartOfAccountTypesQuery(queryOptions);

  const { optionsList: chartOfAccountOptions } = useListOptions(
    chartOfAccountTypes?.data?.results,
    {
      value: 'account_type',
      label: 'account_type_formatted',
    },
    ['account_group']
  );
  const sortedAccountType = getAccountTypesOptions(chartOfAccountOptions || [], 1, 'account_group');
  return {
    label: 'Account Type',
    options: [{ label: '', options: [{ label: 'All', value: '' }] }, ...sortedAccountType],
    name: 'account_type',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    isGrouped: true,
  };
}

export default useGetChartOfAccountTypeInput;

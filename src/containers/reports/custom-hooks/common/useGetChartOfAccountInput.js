/* eslint-disable no-unused-vars */
import useListOptions from 'custom-hooks/useListOptions';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';
import { getAccountTypesOptions } from 'utilities/get-account-type-options';

function useGetChartOfAccountInput(queryOptions) {
  const supplierApiResponse = useGetChartOfAccountListQuery(queryOptions);

  const { optionsList: chartOfAccountOptions } = useListOptions(
    supplierApiResponse?.data?.results,
    {
      value: 'account_name',
      label: 'account_name',
    },
    ['account_type']
  );
  const sortedAccountType = getAccountTypesOptions(chartOfAccountOptions || [], 3, 'account_type');

  return {
    label: 'Accounts',
    options: sortedAccountType,
    name: 'coa_name',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    isGrouped: true,
  };
}

export default useGetChartOfAccountInput;

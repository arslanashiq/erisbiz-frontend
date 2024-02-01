import useListOptions from 'custom-hooks/useListOptions';
import { useGetChartOfAccountListQuery } from 'services/private/chart-of-account';

function useGetChartOfAccountInput(queryOptions) {
  const supplierApiResponse = useGetChartOfAccountListQuery(queryOptions);

  const { optionsList: chartOfAccountOptions } = useListOptions(supplierApiResponse?.data?.results, {
    value: 'account_name',
    label: 'account_name',
  });
  return {
    label: 'Accounts',
    options: [{ label: 'All', value: '' }, ...chartOfAccountOptions] || [],
    name: 'coa_name',
    labelClassName: '',
    placeholder: 'Select Item',
    className: 'w-100',
    fullWidth: true,
  };
}

export default useGetChartOfAccountInput;

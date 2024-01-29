import useListOptions from 'custom-hooks/useListOptions';
import { useGetCustomersListQuery } from 'services/private/customers';

function useGetCustomerInput() {
  const customerApiResponse = useGetCustomersListQuery();

  const { optionsList: customersOptions } = useListOptions(customerApiResponse?.data?.results, {
    value: 'id',
    label: 'customer_name',
  });

  return {
    label: 'Customer',
    options: customersOptions || [],
    name: 'customer_id',
    labelClassName: '',
    placeholder: 'Select Customer',
    className: 'w-100',
    fullWidth: true,
  };
}

export default useGetCustomerInput;

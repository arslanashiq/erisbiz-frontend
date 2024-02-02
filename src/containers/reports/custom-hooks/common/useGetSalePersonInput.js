import useListOptions from 'custom-hooks/useListOptions';
import { useGetActiveSalePersonListQuery } from 'services/private/sale-person';

function useGetSalePersonInput() {
  const salesPersonResponse = useGetActiveSalePersonListQuery();

  const { optionsList: salesPersonOptions } = useListOptions(salesPersonResponse?.data?.results, {
    value: 'id',
    label: 'sales_person_name',
  });
  return {
    label: 'Sales Person',
    options: [{ label: 'All', value: '' }, ...salesPersonOptions] || [],
    name: 'sales_person',
    labelClassName: '',
    placeholder: 'Select Sales Person',
    className: 'w-100',
    fullWidth: true,
  };
}

export default useGetSalePersonInput;

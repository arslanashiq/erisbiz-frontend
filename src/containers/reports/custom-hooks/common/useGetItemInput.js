import useListOptions from 'custom-hooks/useListOptions';
import { useGetItemsListQuery } from 'services/private/items';

function useGetItemInput() {
  const supplierApiResponse = useGetItemsListQuery();

  const { optionsList: suppliersOptions } = useListOptions(supplierApiResponse?.data?.results, {
    value: 'item_name',
    label: 'item_name',
  });
  return {
    label: 'Item',
    options: [{ label: 'All', value: '' }, ...suppliersOptions] || [],
    name: 'item_name',
    labelClassName: '',
    placeholder: 'Select Item',
    className: 'w-100',
    fullWidth: true,
  };
}

export default useGetItemInput;

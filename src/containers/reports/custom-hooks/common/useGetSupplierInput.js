import useListOptions from 'custom-hooks/useListOptions';
import { useGetSuppliersListQuery } from 'services/private/suppliers';

function usegetSupplierInput() {
  const supplierApiResponse = useGetSuppliersListQuery();

  const { optionsList: suppliersOptions } = useListOptions(supplierApiResponse?.data?.results, {
    value: 'id',
    label: 'supplier_name',
  });
  return {
    label: 'Supplier',
    options: [{ label: 'All', value: '' }, ...suppliersOptions] || [],
    name: 'supplier_id',
    labelClassName: '',
    placeholder: 'Select Supplier',
    className: 'w-100',
    fullWidth: true,
  };
}

export default usegetSupplierInput;

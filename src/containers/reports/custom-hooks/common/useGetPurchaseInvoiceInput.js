import useListOptions from 'custom-hooks/useListOptions';
import { useGetPurchaseInvoiceListQuery } from 'services/private/purchase-invoice';

function useGetPurchaseInvoiceInput() {
  const purchaseInvoiceListResponse = useGetPurchaseInvoiceListQuery();

  const { optionsList: customersOptions } = useListOptions(purchaseInvoiceListResponse?.data?.results, {
    value: 'id',
    label: 'bill_num',
  });

  return {
    label: 'Purchase Invoice',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'purchase_invoice_id',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Bill'],
  };
}

export default useGetPurchaseInvoiceInput;

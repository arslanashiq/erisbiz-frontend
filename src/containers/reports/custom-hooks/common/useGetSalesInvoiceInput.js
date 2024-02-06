import useListOptions from 'custom-hooks/useListOptions';
import { useGetSaleInvoicesListQuery } from 'services/private/sale-invoice';

function useGetSalesInvoiceInput() {
  const salesInvoiceListResponse = useGetSaleInvoicesListQuery({});

  const { optionsList: customersOptions } = useListOptions(salesInvoiceListResponse?.data?.results, {
    value: 'id',
    label: 'invoice_formatted_number',
  });

  return {
    label: 'Sales Invoice',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'sales_invoice_id',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Sales Invoice'],
  };
}

export default useGetSalesInvoiceInput;

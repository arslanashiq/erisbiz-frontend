import useListOptions from 'custom-hooks/useListOptions';
import { useGetReceiptVoucherListQuery } from 'services/private/receipt-voucher';

function useGetReceiptVoucherInput() {
  const receiptVoucherListResponse = useGetReceiptVoucherListQuery({});

  const { optionsList: customersOptions } = useListOptions(receiptVoucherListResponse?.data?.results, {
    value: 'id',
    label: 'bill_formated_number',
  });

  return {
    label: 'Receipt Voucher',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'receipt_voucher_id',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Receipt Voucher'],
  };
}

export default useGetReceiptVoucherInput;

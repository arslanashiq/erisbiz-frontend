import useListOptions from 'custom-hooks/useListOptions';
import { useGetPaymentVouchersListQuery } from 'services/private/payment-voucher';

function useGetPaymentVoucherInput() {
  const paymentVoucherLitResponse = useGetPaymentVouchersListQuery();

  const { optionsList: customersOptions } = useListOptions(paymentVoucherLitResponse?.data?.results, {
    value: 'id',
    label: 'payment_formatted_number',
  });

  return {
    label: 'Payment Voucher',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'payment_voucher_id',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Payment Voucher'],
  };
}

export default useGetPaymentVoucherInput;

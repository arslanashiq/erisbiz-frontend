import useListOptions from 'custom-hooks/useListOptions';
import { useGetPaymentVouchersListQuery } from 'services/private/payment-voucher';

function useGetPurchaseDebitNoteInput() {
  const paymentVoucherLitResponse = useGetPaymentVouchersListQuery();

  const { optionsList: customersOptions } = useListOptions(paymentVoucherLitResponse?.data?.results, {
    value: 'id',
    label: 'bill_formated_number',
  });

  return {
    label: 'Purchase Debit Note',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'debit_not_id',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Payment Made'],
  };
}

export default useGetPurchaseDebitNoteInput;

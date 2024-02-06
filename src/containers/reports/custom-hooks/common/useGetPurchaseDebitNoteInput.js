import useListOptions from 'custom-hooks/useListOptions';
import { useGetSupplierCreditsListQuery } from 'services/private/supplier-credit';

function useGetPurchaseDebitNoteInput() {
  const purchaseDebitNoteList = useGetSupplierCreditsListQuery();

  const { optionsList: customersOptions } = useListOptions(purchaseDebitNoteList?.data?.results, {
    value: 'id',
    label: 'supplier_credit_formatted_number',
  });

  return {
    label: 'Purchase Debit Note',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'purchase_debit_note_id',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Purchase Debit Note'],
  };
}

export default useGetPurchaseDebitNoteInput;

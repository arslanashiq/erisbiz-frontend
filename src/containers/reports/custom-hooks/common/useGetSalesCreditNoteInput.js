import useListOptions from 'custom-hooks/useListOptions';
import { useGetCreditNotesListQuery } from 'services/private/credit-notes';

function useGetSalesCreditNoteInput() {
  const receiptVoucherListResponse = useGetCreditNotesListQuery({});

  const { optionsList: customersOptions } = useListOptions(receiptVoucherListResponse?.data?.results, {
    value: 'id',
    label: 'credit_note_formatted_number',
  });

  return {
    label: 'Sales Credit Note',
    options: [{ label: 'All', value: '' }, ...customersOptions] || [],
    name: 'sales_credit_note_id',
    labelClassName: '',
    className: 'w-100',
    fullWidth: true,
    hidden: true,
    displayKey: 'transaction_type',
    displayKeyValue: ['Credit Note'],
  };
}

export default useGetSalesCreditNoteInput;

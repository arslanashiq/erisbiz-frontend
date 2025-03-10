import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetPayableDebitNoteData(supplierPayableDebitNoteResponse) {
  const { tableBody, totalBillAmount, totalDueAmount } = useMemo(() => {
    let totalAmount = 0;
    let dueAmount = 0;
    const body = [];
    supplierPayableDebitNoteResponse?.data?.data.forEach(item => {
      totalAmount += item.total_supplier_credit_amount;
      dueAmount += item.balance_amount || 0;
      body.push([
        {
          value: item.supplier_credit_formatted_number,
          link: getLinkByTransactionType('Debit Note', item.id),
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.supplier_credit_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          style: { textAlign: 'left' },
          value: item.supplier__supplier_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: formatAmount(item.total_supplier_credit_amount),
        },
        {
          value: formatAmount(item.balance_amount),
        },
        { value: item.status },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: totalAmount,
      totalDueAmount: dueAmount,
    };
  }, [supplierPayableDebitNoteResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalBillAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalDueAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [tableBody, totalBillAmount, totalDueAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetPayableDebitNoteData;

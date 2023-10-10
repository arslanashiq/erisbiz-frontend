import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetPayableDebitNoteData(supplierPayableDebitNoteResponse) {
  const getLinkByType = item => `/pages/accounting/purchase/debit-notes/${item.id}/detail`;

  const { tableBody, totalBillAmount, totalDueAmount, currencySymbol } = useMemo(() => {
    let totalAmount = 0;
    let dueAmount = 0;
    const currency = 'AED';
    const body = [];
    supplierPayableDebitNoteResponse?.data?.data.forEach(item => {
      totalAmount += item.total_supplier_credit_amount;
      dueAmount += item.balance_due_per_supplier_credit;
      //   currency = item.currency_symbol;
      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        {
          value: moment(item.supplier_credit_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'center' },
        },
        {
          value: item.supplier_credit_num,
          link: getLinkByType(item),
        },
        {
          value: item.supplier__supplier_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: ` ${item.total_supplier_credit_amount}`,
          link: getLinkByType(item),
        },
        {
          value: ` ${item.balance_due_per_supplier_credit}`,
          link: getLinkByType(item),
        },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: totalAmount,
      totalDueAmount: dueAmount,
      currencySymbol: currency,
    };
  }, [supplierPayableDebitNoteResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalBillAmount?.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalDueAmount?.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalBillAmount, totalDueAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetPayableDebitNoteData;

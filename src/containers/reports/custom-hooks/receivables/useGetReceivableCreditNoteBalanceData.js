import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetReceivableCreditNoteBalanceData(creditNoteBalanceResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    if (item.type === 'Excess Payment') {
      return `/pages/accounting/sales/receipt-voucher/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalDueAmount } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    const body = [];
    creditNoteBalanceResponse?.data?.data.forEach(item => {
      amount += item.grand_total;
      dueAmount += item.amount_due;
      body.push([
        {
          value: item.customer_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },

        {
          value: item.formatted_number,
          link: getLinkByType(item),
        },
        {
          value: item.type,
        },

        {
          value: formatAmount(item.grand_total),
        },
        {
          value: formatAmount(item.amount_due),
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalDueAmount: dueAmount };
  }, [creditNoteBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: '' },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalDueAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalDueAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivableCreditNoteBalanceData;

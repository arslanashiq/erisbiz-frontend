import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';
import { salesTransactionTypeLink } from 'utilities/get-link-by-type';

function useGetBalanceDetailData(balanceDetailResponse) {
  const getAmountByType = item => {
    let currentGrandTotal = item.grand_total || 0;
    let currentAmountDue = item.amount_due || 0;

    if (
      (item.type === 'Account Opening Balance' && item.is_credit === true) ||
      item.type === 'Excess Payment' ||
      item.type === 'Credit Note'
    ) {
      currentAmountDue *= currentAmountDue > 0 ? -1 : 1;
      currentGrandTotal *= currentGrandTotal > 0 ? -1 : 1;
    }
    return {
      currentAmountDue,
      currentGrandTotal,
    };
  };
  const { tableBody, totalAmount, totalDueAmount } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    const body = [];
    balanceDetailResponse?.data?.data.forEach(item => {
      const { currentAmountDue, currentGrandTotal } = getAmountByType(item);
      amount += currentGrandTotal;
      dueAmount += currentAmountDue;
      body.push([
        {
          value: item.date,
          style: { textAlign: 'start' },
          // link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },

        {
          value: item.formatted_number,
          link: salesTransactionTypeLink(item.type, item.id),
          style: { textAlign: 'start' },
        },
        {
          value: item.type,
          style: { textAlign: 'start' },
        },

        {
          value: formatAmount(currentGrandTotal),
        },
        {
          value: formatAmount(currentAmountDue),
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalDueAmount: dueAmount };
  }, [balanceDetailResponse]);

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

export default useGetBalanceDetailData;

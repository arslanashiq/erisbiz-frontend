import { useMemo } from 'react';

function useGetBalanceDetailData(balanceDetailResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    if (item.type === 'Excess Payment') {
      return `/pages/accounting/sales/receipt-voucher/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalAmount, totalDueAmount, currencySymbol } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    let currency = 'AED';
    const body = [];
    balanceDetailResponse?.data?.data.forEach(item => {
      amount += item.grand_total;
      dueAmount += item.amount_due;
      currency = item.currency_symbol;
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
          value: `${item.currency_symbol} ${item.grand_total}`,
        },
        {
          value: `${item.currency_symbol} ${item.amount_due}`,
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalDueAmount: dueAmount, currencySymbol: currency };
  }, [balanceDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalDueAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalDueAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetBalanceDetailData;

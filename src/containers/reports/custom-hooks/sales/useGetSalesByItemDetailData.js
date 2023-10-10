import { useMemo } from 'react';

function useGetSalesByItemDetailData(saleByItemDetailResponse) {
  const { tableBody, totalQuantity, totalAmount, currencySymbol } = useMemo(() => {
    let quantity = 0;
    let amount = 0;
    const currency = 'AED';
    const body = [];
    saleByItemDetailResponse?.data?.data.forEach(item => {
      quantity += item.quantity;
      amount += item.amount;
      //   currency = item.currency__symbol;
      body.push([
        {
          value: item.customer,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        {
          value: item.quantity,
        },
        {
          value: `${currency} ${item.amount}`,
        },
        {
          value: `${currency} ${item.average?.toFixed(2)}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalQuantity: quantity,
      totalAmount: amount,
      currencySymbol: currency,
    };
  }, [saleByItemDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalQuantity, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalQuantity, totalAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetSalesByItemDetailData;

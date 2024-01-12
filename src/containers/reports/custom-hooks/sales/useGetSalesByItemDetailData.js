import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetSalesByItemDetailData(saleByItemDetailResponse) {
  const { tableBody, totalQuantity, totalAmount } = useMemo(() => {
    let quantity = 0;
    let amount = 0;
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
          value: formatAmount(item.amount),
        },
        {
          value: formatAmount(item.average),
        },
      ]);
    });
    return {
      tableBody: body,
      totalQuantity: quantity,
      totalAmount: amount,
    };
  }, [saleByItemDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: formatAmount(totalQuantity), style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalQuantity, totalAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetSalesByItemDetailData;

import { useMemo } from 'react';
import { useLocation } from 'react-router';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseByItemData(PurchaseByItemResponse) {
  const location = useLocation();
  const { tableBody, totalAmount, totalQuantity } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const body = [];
    PurchaseByItemResponse?.data?.data.forEach(item => {
      amount += item.amount;
      quantity += item.quantity;
      //   currency = item.currency_symbol;

      body.push([
        { value: item.item, style: { textAlign: 'start' } },
        { value: item.quantity },
        {
          value: formatAmount(item.amount),
          link: `detail${location.search}&item_name=${item.item}`,
        },
        {
          value: formatAmount(item.average),
          link: `detail${location.search}&item_name=${item.item}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: amount,
      totalQuantity: quantity,
    };
  }, [PurchaseByItemResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalQuantity, style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [tableBody, totalAmount, totalQuantity]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseByItemData;

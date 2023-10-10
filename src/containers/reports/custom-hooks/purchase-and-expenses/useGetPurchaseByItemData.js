import { useMemo } from 'react';
import { useLocation } from 'react-router';

function useGetPurchaseByItemData(PurchaseByItemResponse) {
  const location = useLocation();
  const { tableBody, totalAmount, totalQuantity, currencySymbol } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const currency = 'AED';
    const body = [];
    PurchaseByItemResponse?.data?.data.forEach(item => {
      amount += item.amount;
      quantity += item.quantity;
      //   currency = item.currency_symbol;

      body.push([
        { value: item.item, style: { textAlign: 'start' } },
        { value: item.quantity },
        {
          value: `${currency} ${item.amount}`,
          link: `detail${location.search}&item_name=${item.item}`,
        },
        {
          value: `${currency} ${item.average}`,
          link: `detail${location.search}&supplier_id=${item.item}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: amount,
      totalQuantity: quantity,
      currencySymbol: currency,
    };
  }, [PurchaseByItemResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalQuantity, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [tableBody, totalAmount, totalQuantity, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseByItemData;

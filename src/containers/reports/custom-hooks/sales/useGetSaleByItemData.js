import { useMemo } from 'react';
import { useLocation } from 'react-router';

function useGetSaleByItemData(saleByItemResponse) {
  const location = useLocation();
  const getLink = item => {
    if (item) {
      return `detail/${location.search}&item_name=${item.item}`;
    }
    return false;
  };
  const { tableBody, totalQuantity, totalAmount, currencySymbol } = useMemo(() => {
    let quantity = 0;
    let amount = 0;
    const currency = 'AED';
    const body = [];
    saleByItemResponse?.data?.data.forEach(item => {
      quantity += item.quantity;
      amount += item.amount;
      //   currency = item.currency__symbol;
      body.push([
        {
          value: item.item,
          style: { textAlign: 'start' },
        },
        {
          value: item.quantity,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.amount}`,
          link: getLink(item),
        },
        {
          value: `${currency} ${item.average?.toFixed(2)}`,
          link: getLink(item),
        },
      ]);
    });
    return {
      tableBody: body,
      totalQuantity: quantity,
      totalAmount: amount,
      currencySymbol: currency,
    };
  }, [saleByItemResponse]);

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

export default useGetSaleByItemData;

import { useMemo } from 'react';
import { useLocation } from 'react-router';
import formatAmount from 'utilities/formatAmount';

function useGetSaleByItemData(saleByItemResponse) {
  const location = useLocation();
  const getLink = item => {
    if (item) {
      return `detail/${location.search}&item_name=${item.item}`;
    }
    return false;
  };
  const { tableBody, totalQuantity, totalAmount } = useMemo(() => {
    let quantity = 0;
    let amount = 0;
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
  }, [saleByItemResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: totalQuantity, style: { fontWeight: 700 } },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalQuantity, totalAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetSaleByItemData;

import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseByItemDetailData(PurchaseByItemDetailResponse) {
  const { tableBody, totalAmount, totalQuantity } = useMemo(() => {
    let amount = 0;
    let quantity = 0;
    const body = [];
    PurchaseByItemDetailResponse?.data?.data.forEach(item => {
      amount += item.amount;
      quantity += item.quantity;
      //   currency = item.currency_symbol;

      body.push([
        {
          value: item.supplier,
          style: { textAlign: 'start' },
          link: `/pages/accounting/purchase/suppliers/${item.supplier_id}/detail`,
        },
        { value: item.quantity },
        {
          value: formatAmount(item.amount),
          //   link: `detail${location.search}&item_name=${item.item}`,
        },
        {
          value: formatAmount(item.average),
          //   link: `detail${location.search}&supplier_id=${item.item}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: amount,
      totalQuantity: quantity,
    };
  }, [PurchaseByItemDetailResponse]);
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

export default useGetPurchaseByItemDetailData;

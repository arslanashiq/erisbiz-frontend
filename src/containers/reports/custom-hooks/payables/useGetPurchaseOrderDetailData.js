import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseOrderDetailData(purchaseOrderResponse) {
  const { tableBody, totalBalance } = useMemo(() => {
    let balance = 0;
    const body = [];
    purchaseOrderResponse?.data?.data.forEach(item => {
      balance += item.amount;
      body.push([
        { value: item.pur_order_formatted_number, style: { textAlign: 'start' } },
        { value: item.pur_order_date, style: { textAlign: 'start' } },
        { value: item.supplier__supplier_name, style: { textAlign: 'start' } },
        { value: formatAmount(item.amount) },
        { value: item.status, style: { textAlign: 'start' } },
      ]);
    });
    return { tableBody: body, totalBalance: balance };
  }, [purchaseOrderResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalBalance), style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance]
  );
  return {
    tableBody,
    tableFooter,
  };
}

export default useGetPurchaseOrderDetailData;

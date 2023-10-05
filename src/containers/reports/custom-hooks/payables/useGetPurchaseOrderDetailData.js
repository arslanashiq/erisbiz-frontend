import { useMemo } from 'react';

function useGetPurchaseOrderDetailData(purchaseOrderResponse) {
  const { tableBody, totalBalance } = useMemo(() => {
    let balance = 0;
    const body = [];
    purchaseOrderResponse?.data?.data.forEach(item => {
      balance += item.amount;
      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        { value: item.pur_order_date },
        { value: item.pur_order_formatted_number },
        { value: item.supplier__supplier_name },
        { value: item.amount },
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
        { value: `AED ${totalBalance.toFixed(2)}`, style: { fontWeight: 700 } },
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

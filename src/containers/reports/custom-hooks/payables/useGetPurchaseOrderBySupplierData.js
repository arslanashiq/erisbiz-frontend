import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';
import getSearchParamsList from 'utilities/getSearchParamsList';

function useGetPurchaseOrderBySupplierData(purchaseOrderBySupplierResponse) {
  const { tableBody, totalAmount } = useMemo(() => {
    const { duration = 'this%20month' } = getSearchParamsList();
    let amount = 0;
    let balance = 0;
    const body = [];
    purchaseOrderBySupplierResponse?.data?.data.forEach(item => {
      amount += item.amount_with_tax || 0;
      balance += item?.amount || 0;
      body.push([
        { value: item.supplier__supplier_name, style: { textAlign: 'start' } },
        {
          value: item.pur_order_count,
          link: `detail?duration=${duration}&supplier_id=${item.supplier__id}`,
          style: { textAlign: 'start' }
        },
        { value: formatAmount(item.amount_with_tax) },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalBalance: balance };
  }, [purchaseOrderBySupplierResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseOrderBySupplierData;

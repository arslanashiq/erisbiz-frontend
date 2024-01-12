import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseOrderBySupplierData(purchaseOrderBySupplierResponse) {
  const { tableBody, totalAmount } = useMemo(() => {
    let amount = 0;
    const body = [];
    purchaseOrderBySupplierResponse?.data?.data.forEach(item => {
      amount += item.amount_with_tax;
      body.push([
        { value: item.supplier__supplier_name, style: { textAlign: 'start' } },
        { value: item.pur_order_count },
        { value: formatAmount(item.credit_balance) },
        { value: formatAmount(item.amount_with_tax) },
      ]);
    });
    return { tableBody: body, totalAmount: amount };
  }, [purchaseOrderBySupplierResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseOrderBySupplierData;

import { useMemo } from 'react';
import { useLocation } from 'react-router';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseBySupplierData(PurchaseBySupplierResponse) {
  const location = useLocation();
  const { tableBody, totalBillAmount } = useMemo(() => {
    let billAmount = 0;
    const body = [];
    PurchaseBySupplierResponse?.data?.data.forEach(item => {
      billAmount += item.amount_with_tax;

      body.push([
        {
          value: item.supplier__supplier_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        { value: item.expense_count },
        {
          value: item.bill_count,
        },
        {
          value: item.supplier_credit_count,
        },
        {
          value: formatAmount(item.amount_with_tax),
          link: `detail${location.search}&supplier_id=${item.supplier__id}&supplier_name=${item.supplier__supplier_name}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: billAmount,
    };
  }, [PurchaseBySupplierResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalBillAmount), style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalBillAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseBySupplierData;

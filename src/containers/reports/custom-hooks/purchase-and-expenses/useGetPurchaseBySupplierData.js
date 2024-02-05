import { useMemo } from 'react';
import { useLocation } from 'react-router';
import formatAmount from 'utilities/formatAmount';

function useGetPurchaseBySupplierData(PurchaseBySupplierResponse) {
  const location = useLocation();
  const { tableBody, totalBillAmount, totalBillAmountWithTax } = useMemo(() => {
    let billAmount = 0;
    let billAmountWithTax = 0;
    const body = [];
    PurchaseBySupplierResponse?.data?.data.forEach(item => {
      billAmount += item.amount || 0;
      billAmountWithTax += item.amount_with_tax || 0;

      body.push([
        {
          value: item.supplier__supplier_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
        },
        {
          value: item.expense_count,
          link: `detail${location.search}&supplier_id=${item.supplier__id}&supplier_name=${item.supplier__supplier_name}`,
        },

        {
          value: item.bill_count,
          link: `detail${location.search}&supplier_id=${item.supplier__id}&supplier_name=${item.supplier__supplier_name}`,
        },
        {
          value: item.supplier_credit_count,
          link: `detail${location.search}&supplier_id=${item.supplier__id}&supplier_name=${item.supplier__supplier_name}`,
        },
        {
          value: formatAmount(item.amount),
        },
        {
          value: formatAmount(item.amount_with_tax),
        },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: billAmount,
      totalBillAmountWithTax: billAmountWithTax,
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
        { value: formatAmount(totalBillAmountWithTax), style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalBillAmount, totalBillAmountWithTax]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseBySupplierData;

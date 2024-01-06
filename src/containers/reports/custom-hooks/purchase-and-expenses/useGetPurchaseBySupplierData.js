import { useMemo } from 'react';
import { useLocation } from 'react-router';

function useGetPurchaseBySupplierData(PurchaseBySupplierResponse) {
  const location = useLocation();
  const { tableBody, totalBillAmount, currencySymbol } = useMemo(() => {
    let billAmount = 0;
    const currency = 'AED';
    const body = [];
    PurchaseBySupplierResponse?.data?.data.forEach(item => {
      billAmount += item.amount_with_tax;
      //   currency = item.currency_symbol;

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
          value: `${currency} ${item.amount_with_tax}`,
          link: `detail${location.search}&supplier_id=${item.supplier__id}&supplier_name=${item.supplier__supplier_name}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: billAmount,
      currencySymbol: currency,
    };
  }, [PurchaseBySupplierResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalBillAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalBillAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetPurchaseBySupplierData;

import { useMemo } from 'react';

function useGetBillDetailData(supplierPayableBalanceResponse) {
  const { tableBody, totalBillAmount } = useMemo(() => {
    let billAmount = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      billAmount += item.bcy_sales_with_tax_amount;

      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        { value: item.date },
        { value: item.due_date },
        {
          value: item.formatted_number,
          link: `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`,
        },
        {
          value: item.customer_name,
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        {
          value: item.bcy_sales_with_tax_amount,
          link: `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: billAmount,
    };
  }, [supplierPayableBalanceResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `AED ${totalBillAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalBillAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetBillDetailData;

import { useMemo } from 'react';

function useGetBillDetailData(supplierPayableBalanceResponse) {
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalBillAmount, currencySymbol } = useMemo(() => {
    let billAmount = 0;
    let currency = 'AED';
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      billAmount += item.bcy_sales_with_tax_amount;
      currency = item.currency_symbol;

      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        { value: item.date },
        {
          value: item.formatted_number,
          link: getLinkByType(item),
        },
        {
          value: item.customer_name,
          link: getLinkByType(item),
        },
        {
          value: `${item.currency_symbol} ${item.bcy_sales_with_tax_amount}`,
          link: getLinkByType(item),
        },
      ]);
    });
    return {
      tableBody: body,
      totalBillAmount: billAmount,
      currencySymbol: currency,
    };
  }, [supplierPayableBalanceResponse]);
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

export default useGetBillDetailData;

import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetBillDetailData(supplierPayableBalanceResponse) {
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalBillAmount } = useMemo(() => {
    let billAmount = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      billAmount += item.bcy_sales_with_tax_amount;

      body.push([
        { value: item.status, style: { textAlign: 'start' } },
        { value: item.date },
        {
          value: item.formatted_number,
          link: getLinkByType(item),
        },
        {
          value: item.account_name || item.customer_name,
          link: getLinkByType(item),
        },
        {
          value: formatAmount(item.bcy_sales_with_tax_amount),
          link: getLinkByType(item),
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
        { value: formatAmount(totalBillAmount), style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalBillAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetBillDetailData;

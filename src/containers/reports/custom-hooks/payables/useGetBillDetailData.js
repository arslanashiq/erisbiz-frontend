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
        {
          value: item.formatted_number,
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        { value: item.date, style: { textAlign: 'start' } },
        {
          value: item.account_name || item.customer_name,
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        {
          value: item.supplier_invoice_num,
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        {
          value: formatAmount(item.amount_total),
        },
        {
          value: formatAmount(item.without_change_vat_total),
        },
        {
          value: formatAmount(item.grand_total),
        },
        { value: item.due_date, style: { textAlign: 'center' } },

        { value: item.status, style: { textAlign: 'start' } },
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
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
      ],
    ],
    [tableBody, totalBillAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetBillDetailData;

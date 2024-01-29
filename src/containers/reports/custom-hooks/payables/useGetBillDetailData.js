import { useMemo } from 'react';
// import { supplierOpeningBalanceName } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetBillDetailData(supplierPayableBalanceResponse) {
  const getLinkByType = item => {
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
    }
    // if (item.type === supplierOpeningBalanceName) {
    //   return `/pages/accounting/purchase/suppliers/${item.id}/detail`;
    // }
    return false;
  };
  const { tableBody, totalGrossAmount, totalTaxAmount, totalNetAmount } = useMemo(() => {
    let grossAmount = 0;
    let taxAmount = 0;
    let netAmount = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      grossAmount += item.amount_total || 0;
      taxAmount += item.without_change_vat_total || 0;
      netAmount += item.grand_total || 0;

      body.push([
        {
          value: item.formatted_number,
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        { value: item.date, style: { textAlign: 'start' } },
        {
          value: item.account_name || item.customer_name,
          link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
          style: { textAlign: 'start' },
        },
        {
          value: item.supplier_invoice_num,
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

        { value: item.status },
      ]);
    });
    return {
      tableBody: body,
      totalGrossAmount: grossAmount,
      totalTaxAmount: taxAmount,
      totalNetAmount: netAmount,
    };
  }, [supplierPayableBalanceResponse]);
  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalGrossAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalTaxAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalNetAmount), style: { fontWeight: 700 } },
        { value: '' },
        { value: '' },
      ],
    ],
    [tableBody, totalGrossAmount, totalTaxAmount, totalNetAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetBillDetailData;

import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetInvoiceDetailData(supplierPayableBalanceResponse) {
  const getLinkByType = item => {
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }

    return false;
  };
  const { tableBody, totalGrossAmount, totalTaxAmount, totalNetAmount } = useMemo(() => {
    let grossAmount = 0;
    let taxAmount = 0;
    let netAmount = 0;
    const body = [];
    supplierPayableBalanceResponse?.data?.data.forEach(item => {
      grossAmount += item.formatted_number ? item.amount_total || 0 : item.grand_total || 0;
      taxAmount += item.without_change_vat_total || 0;
      netAmount += item.grand_total || 0;

      body.push([
        {
          value: item.formatted_number || item.type || '',
          link: getLinkByType(item),
          style: { textAlign: 'start' },
        },
        { value: item.date, style: { textAlign: 'start' } },
        {
          value: item.account_name || item.customer_name,
          link: `/pages/accounting/sales/customers/${item.customer_id || item.id}/detail`,
          style: { textAlign: 'start' },
        },
        {
          value: formatAmount(item.formatted_number ? item.amount_total || 0 : item.grand_total || 0),
        },
        {
          value: formatAmount(item.without_change_vat_total || 0),
        },
        {
          value: formatAmount(item.grand_total || 0),
        },

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
        { value: formatAmount(totalGrossAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalTaxAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalNetAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [tableBody, totalGrossAmount, totalTaxAmount, totalNetAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetInvoiceDetailData;

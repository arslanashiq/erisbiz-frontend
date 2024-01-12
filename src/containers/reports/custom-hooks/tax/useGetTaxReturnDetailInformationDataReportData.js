import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetTaxReturnDetailInformationDataReportData(taxReturnDetailInformationResponse) {
  const getLinkByType = item => {
    if (item.type === 'Expense') {
      return `/pages/accounting/purchase/expenses/${item.id}/detail`;
    }
    if (item.type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
    }
    if (item.type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.id}/detail`;
    }
    return false;
  };
  const { tableBody, totalTabableAmount, totalTaxAmount } = useMemo(() => {
    let taxableAmount = 0;
    let taxAmount = 0;
    const body = [];
    taxReturnDetailInformationResponse?.data?.data.forEach(item => {
      taxableAmount += item.taxable_amount;
      taxAmount += item.tax_amount;
      // currency = item.currency__symbol;
      body.push([
        {
          value: item.date,
          style: { textAlign: 'start' },
        },
        {
          value: item.number,
          link: getLinkByType(item),
        },
        {
          value: item.type,
        },
        {
          value: item.taxable_amount,
        },
        {
          value: item.tax_amount,
        },
      ]);
    });
    return {
      tableBody: body,
      totalTabableAmount: taxableAmount,
      totalTaxAmount: taxAmount,
    };
  }, [taxReturnDetailInformationResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalTabableAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalTaxAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalTabableAmount]
  );
  return { tableBody, totalTabableAmount, totalTaxAmount, tableFooter };
}

export default useGetTaxReturnDetailInformationDataReportData;

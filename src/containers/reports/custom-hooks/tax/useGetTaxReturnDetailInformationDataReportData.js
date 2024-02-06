import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetTaxReturnDetailInformationDataReportData(taxReturnDetailInformationResponse) {
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
          link: getLinkByTransactionType(item.type, item.id),
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

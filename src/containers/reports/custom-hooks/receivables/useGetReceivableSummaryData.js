import moment from 'moment';
import { useMemo } from 'react';

function useGetReceivableSummaryData(receivableSummaryResponse) {
  const { tableBody, totalAmount, totalRemainingAmount } = useMemo(() => {
    let amount = 0;
    let remainingAmount = 0;
    const body = [];
    receivableSummaryResponse?.data?.data.forEach(item => {
      amount += item.bcy_sales_with_tax_amount;
      remainingAmount += item.amount_due;
      body.push([
        {
          value: item.status,
          style: { textAlign: 'start' },
        },
        { value: moment(item.date).format('DD MMM YYYY') },
        {
          value: item.formatted_number,
        },
        {
          value: item.customer_name,
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        {
          value: item.type,
        },
        {
          value: `${item.currency_symbol} ${item.bcy_sales_with_tax_amount}`,
        },
        {
          value: `${item.currency_symbol} ${item.amount_due}`,
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalRemainingAmount: remainingAmount };
  }, [receivableSummaryResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `AED ${totalAmount.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `AED ${totalRemainingAmount.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalRemainingAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivableSummaryData;

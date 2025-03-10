import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FORMAT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

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
          value: item.customer_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },
        { value: moment(item.date).format(DATE_FORMAT), style: { textAlign: 'start' } },
        {
          value: item.formatted_number,
          link: getLinkByTransactionType(item.type, item.id),
          style: { textAlign: 'start' },
        },
        {
          value: item.type,
          style: { textAlign: 'start' },
        },
        {
          value: formatAmount(item.bcy_sales_with_tax_amount),
        },
        {
          value: formatAmount(item.amount_due),
        },
        {
          value: item.status,
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
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalRemainingAmount), style: { fontWeight: 700 } },
        { value: '' },
      ],
    ],
    [totalAmount, totalRemainingAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivableSummaryData;

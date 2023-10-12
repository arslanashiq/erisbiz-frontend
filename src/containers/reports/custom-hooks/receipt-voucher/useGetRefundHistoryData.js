import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetRefundHistoryData(refundHistoryResponse) {
  const { tableBody, totalAmount, totalDueAmount, currencySymbol } = useMemo(() => {
    let total = 0;
    let dueAmount = 0;

    let currency = 'AED';
    const body = [];
    refundHistoryResponse?.data?.data.forEach(item => {
      total += item.amount_total;
      dueAmount += item.amount_due;
      currency = item.currency_symbol;
      body.push([
        {
          value: item.status,
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.payment_date).format(DATE_FILTER_REPORT),
        },
        {
          value: item.formatted_number,
          link: `/pages/accounting/sales/credit-notes/${item.id}/detail`,
        },
        {
          value: item.customer_name,
          link: `/pages/accounting/sales/customers/${item.sales_account__id}/detail`,
        },

        {
          value: `${currency} ${item.amount_total}`,
        },
        {
          value: `${currency} ${item.amount_due}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
      totalDueAmount: dueAmount,
      currencySymbol: currency,
    };
  }, [refundHistoryResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalAmount}`, style: { textAlign: 'end', fontWeight: 700 } },
        { value: `${currencySymbol} ${totalDueAmount}`, style: { textAlign: 'end', fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalDueAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetRefundHistoryData;

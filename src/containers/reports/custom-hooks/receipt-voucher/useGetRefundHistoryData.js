import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetRefundHistoryData(refundHistoryResponse) {
  const { tableBody, totalAmount, currencySymbol } = useMemo(() => {
    let total = 0;

    let currency = 'AED';
    const body = [];
    refundHistoryResponse?.data?.data.forEach(item => {
      total += item.amount_applied;
      currency = item.currency_symbol;
      body.push([
        {
          value: moment(item.payment_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: item.reference_num,
        },
        {
          value: item.formatted_number,
          // link: `/pages/accounting/sales/credit-notes/${item.id}/detail`,
        },
        {
          value: item.customer_name,
          link: `/pages/accounting/sales/customers/${item.sales_account__id}/detail`,
        },

        {
          value: item.payment_mode,
        },
        {
          value: `${currency} ${item.amount_applied}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
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
        { value: '' },
        { value: `${currencySymbol} ${totalAmount}`, style: { textAlign: 'end', fontWeight: 700 } },
      ],
    ],
    [totalAmount, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetRefundHistoryData;

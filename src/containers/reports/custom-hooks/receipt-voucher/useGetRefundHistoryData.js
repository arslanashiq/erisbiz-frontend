import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetRefundHistoryData(refundHistoryResponse) {
  const { tableBody, totalAmount } = useMemo(() => {
    let total = 0;

    const body = [];
    refundHistoryResponse?.data?.data.forEach(item => {
      total += item.amount_applied;
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
          value: formatAmount(item.amount_applied),
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
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
        { value: formatAmount(totalAmount), style: { textAlign: 'end', fontWeight: 700 } },
      ],
    ],
    [totalAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetRefundHistoryData;

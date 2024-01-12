import moment from 'moment';
import { useMemo } from 'react';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import formatAmount from 'utilities/formatAmount';

function useGetCreditNoteDetailData(creditNoteDetailResponse) {
  const { tableBody, totalAmount, totalDueAmount } = useMemo(() => {
    let total = 0;
    let dueAmount = 0;

    const body = [];
    creditNoteDetailResponse?.data?.data.forEach(item => {
      total += item.amount_total;
      dueAmount += item.amount_due;
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
          value: formatAmount(item.amount_total),
        },
        {
          value: formatAmount(item.amount_due),
        },
      ]);
    });
    return {
      tableBody: body,
      totalAmount: total,
      totalDueAmount: dueAmount,
    };
  }, [creditNoteDetailResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: formatAmount(totalAmount), style: { textAlign: 'end', fontWeight: 700 } },
        { value: formatAmount(totalDueAmount), style: { textAlign: 'end', fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalDueAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetCreditNoteDetailData;

import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';
import { getLinkByTransactionType } from 'utilities/get-link-by-type';

function useGetInvoiceBalanceAgainstCustomerData(invoiceBalanceResponse) {
  const { tableBody, totalAmount, totalDueAmount } = useMemo(() => {
    let amount = 0;
    let dueAmount = 0;
    const body = [];
    invoiceBalanceResponse?.data?.data.forEach(item => {
      amount += item.grand_total;
      dueAmount += item.amount_due;
      body.push([
        {
          value: item.date,
          style: { textAlign: 'start' },
          // link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },

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
          value: formatAmount(item.grand_total),
        },
        {
          value: formatAmount(item.amount_due),
        },
      ]);
    });
    return { tableBody: body, totalAmount: amount, totalDueAmount: dueAmount };
  }, [invoiceBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: '' },
        { value: '' },
        { value: formatAmount(totalAmount), style: { fontWeight: 700 } },
        { value: formatAmount(totalDueAmount), style: { fontWeight: 700 } },
      ],
    ],
    [totalAmount, totalDueAmount]
  );
  return { tableBody, tableFooter };
}

export default useGetInvoiceBalanceAgainstCustomerData;

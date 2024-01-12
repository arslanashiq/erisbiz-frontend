import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetReceivableAccountBalanceData(receivableAccountBalanceResponse) {
  const { tableBody } = useMemo(() => {
    const body = [];

    if (receivableAccountBalanceResponse?.data?.data?.length >= 0) {
      receivableAccountBalanceResponse?.data?.data.forEach(item => {
        body.push([
          {
            value: item?.customer_name,
            style: { textAlign: 'start' },
            link: `/pages/accounting/sales/customers/${item?.customer_id}/detail`,
          },

          {
            value: formatAmount(item.invoice_balance),
            link: `sale-invoice/detail?duration=this+month&customer_id=${item.customer_id}`,
          },
          {
            value: formatAmount(item.credit_balance),
            link: `credit-notes/detail?duration=this+month&customer_id=${item.customer_id}`,
          },

          {
            value: formatAmount(item.balance),
            link: `detail?duration=this+month&customer_id=${item.customer_id}`,
          },
        ]);
      });
    }
    return { tableBody: body };
  }, [receivableAccountBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: '' },
        { value: '' },
        {
          value: formatAmount(receivableAccountBalanceResponse?.data?.total_balance),
          style: { fontWeight: 700 },
        },
      ],
    ],
    [receivableAccountBalanceResponse]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivableAccountBalanceData;

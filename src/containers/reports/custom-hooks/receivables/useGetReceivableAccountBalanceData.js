import { useMemo } from 'react';

function useGetReceivableAccountBalanceData(receivableAccountBalanceResponse) {
  const { tableBody, currencySymbol } = useMemo(() => {
    let currency = 'AED';
    const body = [];

    if (receivableAccountBalanceResponse?.data?.data?.length >= 0) {
      receivableAccountBalanceResponse?.data?.data.forEach(item => {
        currency = item?.currency__symbol || 'AED';
        body.push([
          {
            value: item?.customer_name,
            style: { textAlign: 'start' },
            link: `/pages/accounting/sales/customers/${item?.customer_id}/detail`,
          },

          {
            value: `${item.currency__symbol} ${item.invoice_balance}`,
            link: `sale-invoice/detail?duration=this+month&customer_id=${item.customer_id}`,
          },
          {
            value: `${item.currency__symbol} ${item.credit_balance}`,
            link: `credit-notes/detail?duration=this+month&customer_id=${item.customer_id}`,
          },

          {
            value: `${item.currency__symbol} ${item.balance}`,
            link: `detail?duration=this+month&customer_id=${item.customer_id}`,
          },
        ]);
      });
    }
    return { tableBody: body, currencySymbol: currency };
  }, [receivableAccountBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: '' },
        { value: '' },
        {
          value: `${currencySymbol} ${receivableAccountBalanceResponse?.data?.total_balance?.toFixed(2)}`,
          style: { fontWeight: 700 },
        },
      ],
    ],
    [receivableAccountBalanceResponse, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivableAccountBalanceData;

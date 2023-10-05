import { useMemo } from 'react';

function useGetReceivableAccountBalanceData(receivableAccountBalanceResponse) {
  const { tableBody, totalBalance, totalQuantity, currencySymbol } = useMemo(() => {
    let balance = 0;
    let currency = 'AED';
    const body = [];
    receivableAccountBalanceResponse?.data?.data.forEach(item => {
      balance += item.balance;
      currency = item.currency__symbol;
      body.push([
        {
          value: item.customer_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },

        {
          value: `${item.currency__symbol} ${item.invoice_balance}`,
        },
        {
          value: `${item.currency__symbol} ${item.credit_balance}`,
        },

        {
          value: `${item.currency__symbol} ${item.balance}`,
        },
      ]);
    });
    return { tableBody: body, totalBalance: balance, currencySymbol: currency };
  }, [receivableAccountBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: '' },
        { value: '' },
        { value: `${currencySymbol} ${totalBalance.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [totalBalance, totalQuantity, currencySymbol]
  );
  return { tableBody, tableFooter };
}

export default useGetReceivableAccountBalanceData;

import { useMemo } from 'react';

function useGetARAgingSummaryData(receivableARAgingReportResponse) {
  const {
    tableBody,
    totalCurrentBalance,
    totalQuantity,
    totalDays1To15Balance,
    totalDays16To30Balance,
    totalDays31To45Balance,
    totalAbove45Balance,
    currencySymbol,
  } = useMemo(() => {
    let currentBalance = 0;
    let days1To15Balance = 0;
    let days16To30Balance = 0;
    let days31To45Balance = 0;
    let daysAbove45Balance = 0;
    let currency = 'AED';
    const body = [];
    receivableARAgingReportResponse?.data?.data.forEach(item => {
      currentBalance += item.current_bcy;
      days1To15Balance += item.days_1_15;
      days16To30Balance += item.days_16_30;
      days31To45Balance += item.days_31_45;
      daysAbove45Balance += item.days_above_45;
      currency = item.sales_account__currency_symbol;
      body.push([
        {
          value: item.account_name,
          style: { textAlign: 'start' },
        },

        {
          value: `${item.sales_account__currency_symbol} ${item.current_bcy}`,
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_1_15}`,
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_16_30}`,
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_31_45}`,
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_above_45}`,
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.total_bcy}`,
        },
      ]);
    });
    return {
      tableBody: body,
      totalCurrentBalance: currentBalance,
      totalDays1To15Balance: days1To15Balance,
      totalDays16To30Balance: days16To30Balance,
      totalDays31To45Balance: days31To45Balance,
      totalAbove45Balance: daysAbove45Balance,
      currencySymbol: currency,
    };
  }, [receivableARAgingReportResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: `${currencySymbol} ${totalCurrentBalance.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalDays1To15Balance.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalDays16To30Balance.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalDays31To45Balance.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `${currencySymbol} ${totalAbove45Balance.toFixed(2)}`, style: { fontWeight: 700 } },
      ],
    ],
    [
      totalQuantity,
      totalCurrentBalance,
      totalDays1To15Balance,
      totalDays16To30Balance,
      totalDays31To45Balance,
      totalAbove45Balance,
      currencySymbol,
    ]
  );
  return { tableBody, tableFooter };
}

export default useGetARAgingSummaryData;

import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';

function useGetARAgingSummaryData(receivableARAgingReportResponse) {
  const getARAgingSummaryDetailLink = (item, interval) => `/pages/reports/ar-aging-details?duration=this+month&date_type=date&customer_id=${item.customer_id}&interval=${interval}`;

  const {
    tableBody,
    totalCurrentBalance,
    totalQuantity,
    totalDays1To15Balance,
    totalDays16To30Balance,
    totalDays31To45Balance,
    totalAbove45Balance,
  } = useMemo(() => {
    let currentBalance = 0;
    let days1To15Balance = 0;
    let days16To30Balance = 0;
    let days31To45Balance = 0;
    let daysAbove45Balance = 0;
    const body = [];
    receivableARAgingReportResponse?.data?.data.forEach(item => {
      currentBalance += item.current_bcy;
      days1To15Balance += item.days_1_15;
      days16To30Balance += item.days_16_30;
      days31To45Balance += item.days_31_45;
      daysAbove45Balance += item.days_above_45;
      body.push([
        {
          value: item.customer_name,
          style: { textAlign: 'start' },
          link: `/pages/accounting/sales/customers/${item.customer_id}/detail`,
        },

        {
          value: `${item.sales_account__currency_symbol} ${item.current_bcy}`,
          link: getARAgingSummaryDetailLink(item, 'current'),
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_1_15}`,
          link: getARAgingSummaryDetailLink(item, '1_15'),
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_16_30}`,
          link: getARAgingSummaryDetailLink(item, '16_30'),
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_31_45}`,
          link: getARAgingSummaryDetailLink(item, '31_45'),
        },
        {
          value: `${item.sales_account__currency_symbol} ${item.days_above_45}`,
          link: getARAgingSummaryDetailLink(item, 'gt_45'),
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
    };
  }, [receivableARAgingReportResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },

        { value: formatAmount(totalCurrentBalance), style: { fontWeight: 700 } },
        { value: formatAmount(totalDays1To15Balance), style: { fontWeight: 700 } },
        { value: formatAmount(totalDays16To30Balance), style: { fontWeight: 700 } },
        { value: formatAmount(totalDays31To45Balance), style: { fontWeight: 700 } },
        { value: formatAmount(totalAbove45Balance), style: { fontWeight: 700 } },
      ],
    ],
    [
      totalQuantity,
      totalCurrentBalance,
      totalDays1To15Balance,
      totalDays16To30Balance,
      totalDays31To45Balance,
      totalAbove45Balance,
    ]
  );
  return { tableBody, tableFooter };
}

export default useGetARAgingSummaryData;

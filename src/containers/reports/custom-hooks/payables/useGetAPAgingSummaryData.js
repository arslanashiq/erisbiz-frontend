import { useMemo } from 'react';
import formatAmount from 'utilities/formatAmount';
import getSearchParamsList from 'utilities/getSearchParamsList';

function useGetAPAgingSummaryData(supplierPayableBalanceResponse) {
  const getApAgingSummaryDetailLink = (interval, item) => {
    const { duration } = getSearchParamsList();
    if (duration) {
      return `/pages/reports/ap-aging-details?duration=${duration}&supplier_id=${item.supplier__id}&date_type=date&interval=${interval}`;
    }
    return `/pages/reports/ap-aging-details?duration=this%20month&supplier_id=${item.supplier__id}&date_type=date&interval=${interval}`;
  };

  const { tableBody, totalCurrent, totalDay15, totalDay30, totalDay45, totalDayAbove45, totalBalance } =
    useMemo(() => {
      let current = 0;
      let day15 = 0;
      let day30 = 0;
      let day45 = 0;
      let dayAbove45 = 0;
      let total = 0;
      const body = [];
      supplierPayableBalanceResponse?.data?.data.forEach(item => {
        current += item.current_bcy;
        day15 += item.days_1_15;
        day30 += item.days_16_30;
        day45 += item.days_31_45;
        dayAbove45 += item.days_above_45;
        total += item.total_bcy;
        body.push([
          {
            value: item.account_name,
            style: { textAlign: 'start' },
            link: `/pages/accounting/purchase/suppliers/${item.supplier__id}/detail`,
          },
          { value: formatAmount(item.current_bcy), link: getApAgingSummaryDetailLink('current', item) },
          { value: formatAmount(item.days_1_15), link: getApAgingSummaryDetailLink('1_15', item) },
          { value: formatAmount(item.days_16_30), link: getApAgingSummaryDetailLink('16_30', item) },
          { value: formatAmount(item.days_31_45), link: getApAgingSummaryDetailLink('31_45', item) },
          { value: formatAmount(item.days_above_45), link: getApAgingSummaryDetailLink('gt_45', item) },
          { value: formatAmount(item.total_bcy) },
        ]);
      });
      return {
        tableBody: body,
        totalCurrent: current,
        totalDay15: day15,
        totalDay30: day30,
        totalDay45: day45,
        totalDayAbove45: dayAbove45,
        totalBalance: total,
      };
    }, [supplierPayableBalanceResponse]);

  const tableFooter = useMemo(
    () => [
      [
        { value: 'Total', style: { textAlign: 'start', fontWeight: 700 } },
        { value: formatAmount(totalCurrent), style: { fontWeight: 700 } },
        { value: formatAmount(totalDay15), style: { fontWeight: 700 } },
        { value: formatAmount(totalDay30), style: { fontWeight: 700 } },
        { value: formatAmount(totalDay45), style: { fontWeight: 700 } },
        { value: formatAmount(totalDayAbove45), style: { fontWeight: 700 } },
        { value: formatAmount(totalBalance), style: { fontWeight: 700 } },
      ],
    ],
    [tableBody, totalCurrent, totalDay15, totalDay30, totalDay45, totalDayAbove45, totalBalance]
  );
  return {
    tableBody,
    tableFooter,
  };
}

export default useGetAPAgingSummaryData;

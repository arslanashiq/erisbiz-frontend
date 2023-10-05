import { useMemo } from 'react';

function useGetAPAgingSummaryData(supplierPayableBalanceResponse) {
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
          { value: item.current_bcy },
          { value: item.days_1_15 },
          { value: item.days_16_30 },
          { value: item.days_31_45 },
          { value: item.days_above_45 },
          { value: item.total_bcy },
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
        { value: `AED ${totalCurrent.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `AED ${totalDay15.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `AED ${totalDay30.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `AED ${totalDay45.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `AED ${totalDayAbove45.toFixed(2)}`, style: { fontWeight: 700 } },
        { value: `AED ${totalBalance.toFixed(2)}`, style: { fontWeight: 700 } },
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

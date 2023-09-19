import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Card, CardContent } from '@mui/material';
// services
import { useGetApAgingSummaryQuery } from 'services/private/reports';
// shared
import CustomReport from 'shared/components/custom-report/CustomReport';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { apAgingSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
// styles
import 'styles/reports/reports.scss';

function ApAgingSummary() {
  const location = useLocation();
  const supplierPayableBalanceResponse = useGetApAgingSummaryQuery(location.search);
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
          { value: item.account_name, style: { textAlign: 'start' } },
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
  return (
    <SectionLoader options={[supplierPayableBalanceResponse.isLoading]}>
      <Card>
        <CardContent>
          <div className="reports mx-auto">
            <div className="text-center mb-5">
              <h4>Luxury Events and VIP Travel DMCC</h4>
              <h3>AP Aging Summary By Bill Date</h3>
            </div>
            <CustomReport
              tableHeader={apAgingSummaryReportHeadCells}
              tableBody={tableBody}
              tableFooter={tableFooter}
            />
          </div>
        </CardContent>
      </Card>
    </SectionLoader>
  );
}

export default ApAgingSummary;

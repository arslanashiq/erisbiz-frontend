import React from 'react';
// services
import { useGetPayableSummaryQuery } from 'services/private/reports';
import { payableSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableSummaryData from 'containers/reports/custom-hooks/payables/useGetPayableSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function PayableSummary() {
  return (
    <CustomReportDetailPage
      reportTitle="Payable Summary"
      reportHeadCells={payableSummaryReportHeadCells}
      useGetReportQuery={useGetPayableSummaryQuery}
      useGetReportData={useGetPayableSummaryData}
    />
  );
}

export default PayableSummary;

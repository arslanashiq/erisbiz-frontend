import React from 'react';
// services
import { useGetApAgingSummaryQuery } from 'services/private/reports';
// containers
import { apAgingSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAPAgingSummaryData from 'containers/reports/custom-hooks/payables/useGetAPAgingSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ApAgingSummary() {
  return (
    <CustomReportDetailPage
      reportTitle="AP Aging Summary By Bill Date"
      reportHeadCells={apAgingSummaryReportHeadCells}
      useGetReportQuery={useGetApAgingSummaryQuery}
      useGetReportData={useGetAPAgingSummaryData}
    />
  );
}

export default ApAgingSummary;

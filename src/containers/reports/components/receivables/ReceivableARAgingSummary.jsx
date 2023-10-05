import React from 'react';
// services
import { useGetReceivableARAgingSummaryQuery } from 'services/private/reports';
// constainers
import { receivablesARAgingSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetARAgingSummaryData from 'containers/reports/custom-hooks/receivables/useGetARAgingSummaryData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function ReceivableARAgingSummary() {
  return (
    <CustomReportDetailPage
      reportTitle="AR Aging Summary"
      reportHeadCells={receivablesARAgingSummaryReportHeadCells}
      useGetReportQuery={useGetReceivableARAgingSummaryQuery}
      useGetReportData={useGetARAgingSummaryData}
    />
  );
}

export default ReceivableARAgingSummary;

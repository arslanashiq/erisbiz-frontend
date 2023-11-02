import React from 'react';
// services
import { useGetReceivableSummaryQuery } from 'services/private/reports';
// constainers
import { receivablesSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceivableSummaryData from 'containers/reports/custom-hooks/receivables/useGetReceivableSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ReceivableSummary() {
  return (
    <CustomReportDetailPage
      reportTitle="Receivable Summary"
      reportHeadCells={receivablesSummaryReportHeadCells}
      useGetReportQuery={useGetReceivableSummaryQuery}
      useGetReportData={useGetReceivableSummaryData}
    />
  );
}

export default ReceivableSummary;

import React from 'react';
import { receivablesDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetReceivableDetailQuery } from 'services/private/reports';
import useGetReceivablesDetailData from 'containers/reports/custom-hooks/receivables/useGetReceivablesDetailData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function ReceivableDetails() {
  return (
    <CustomReportDetailPage
      reportTitle="Receivable Detail"
      reportHeadCells={receivablesDetailReportHeadCells}
      useGetReportQuery={useGetReceivableDetailQuery}
      useGetReportData={useGetReceivablesDetailData}
    />
  );
}

export default ReceivableDetails;

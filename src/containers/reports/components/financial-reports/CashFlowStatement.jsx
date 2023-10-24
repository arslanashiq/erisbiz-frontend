import React from 'react';
// services
import { useGetCashFlowStatementQuery } from 'services/private/reports';
import useGetBillDetailData from 'containers/reports/custom-hooks/payables/useGetBillDetailData';
import { payableBillDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';
// components
import CustomReportDetailPage from '../CustomReportDetailPage';

function CashFlowStatement() {
  return (
    <CustomReportDetailPage
      reportTitle="Cash Flow Statement"
      reportHeadCells={payableBillDetailsReportHeadCells}
      useGetReportQuery={useGetCashFlowStatementQuery}
      useGetReportData={useGetBillDetailData}
    />
  );
}

export default CashFlowStatement;

import React from 'react';
// services
import { useGetProfitAndLossStatementQuery } from 'services/private/reports';
import { profitAndLossStatementHeadCells } from 'containers/reports/utilities/head-cells';
import useGetProfitAndLossStatementData from 'containers/reports/custom-hooks/financial-statement/useGetProfitAndLossStatementData';
// components
import CustomReportDetailPage from '../CustomReportDetailPage';

function ProfitAndLossStatement() {
  return (
    <CustomReportDetailPage
      reportTitle="Profit And Loss Statement"
      reportHeadCells={profitAndLossStatementHeadCells}
      useGetReportQuery={useGetProfitAndLossStatementQuery}
      useGetReportData={useGetProfitAndLossStatementData}
    />
  );
}

export default ProfitAndLossStatement;

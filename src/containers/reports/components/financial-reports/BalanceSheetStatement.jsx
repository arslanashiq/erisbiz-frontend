import React from 'react';
// services
import { useGetBalanceSheetStatementQuery } from 'services/private/reports';
import useGetBalanceSheetData from 'containers/reports/custom-hooks/financial-statement/useGetBalanceSheetData';
import { profitAndLossStatementHeadCells } from 'containers/reports/utilities/head-cells';
// components
import CustomReportDetailPage from '../CustomReportDetailPage';

function BalanceSheetStatement() {
  return (
    <CustomReportDetailPage
      reportTitle="Cash Flow Statement"
      reportHeadCells={profitAndLossStatementHeadCells}
      useGetReportQuery={useGetBalanceSheetStatementQuery}
      useGetReportData={useGetBalanceSheetData}
    />
  );
}

export default BalanceSheetStatement;

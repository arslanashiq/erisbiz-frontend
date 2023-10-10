import React from 'react';
import { expenseDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetExpenseDetailsQuery } from 'services/private/reports';
import useGetExpenseDetailData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetExpenseDetailData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function ExpenseDetails() {
  return (
    <CustomReportDetailPage
      reportTitle="Expense Detail"
      reportHeadCells={expenseDetailReportHeadCells}
      useGetReportQuery={useGetExpenseDetailsQuery}
      useGetReportData={useGetExpenseDetailData}
    />
  );
}

export default ExpenseDetails;

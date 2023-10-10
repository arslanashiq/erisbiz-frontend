import useGetExpenseByCategoryData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetExpenseByCategoryData';
import { expenseByCategoryReportHeadCells } from 'containers/reports/utilities/head-cells';
import React from 'react';
import { useGetExpenseByCategoryQuery } from 'services/private/reports';
import CustomReportDetailPage from '../CustomReportDetailPage';

function ExpenseByCategory() {
  return (
    <CustomReportDetailPage
      reportTitle="Expense Detail By CateGory"
      reportHeadCells={expenseByCategoryReportHeadCells}
      useGetReportQuery={useGetExpenseByCategoryQuery}
      useGetReportData={useGetExpenseByCategoryData}
    />
  );
}

export default ExpenseByCategory;

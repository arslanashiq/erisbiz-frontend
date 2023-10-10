import useGetExpenseByCategoryDetailData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetExpenseByCategoryDetailData';
import { expenseByCategoryDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import React from 'react';
import { useGetExpenseByCategoryDetailQuery } from 'services/private/reports';
import CustomReportDetailPage from '../CustomReportDetailPage';

function ExpenseByCategoryDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Expense Detail By Category"
      reportHeadCells={expenseByCategoryDetailReportHeadCells}
      useGetReportQuery={useGetExpenseByCategoryDetailQuery}
      useGetReportData={useGetExpenseByCategoryDetailData}
    />
  );
}

export default ExpenseByCategoryDetail;

import React from 'react';
import { useGetAccountTypeSummaryQuery } from 'services/private/reports';
import { accountTypeSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAccountTypeSummaryData from 'containers/reports/custom-hooks/accountant/useGetAccountTypeSummaryData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function AccountTypeSummary() {
  return (
    <CustomReportDetailPage
      reportTitle="Account Type Summary"
      reportHeadCells={accountTypeSummaryReportHeadCells}
      useGetReportQuery={useGetAccountTypeSummaryQuery}
      useGetReportData={useGetAccountTypeSummaryData}
    />
  );
}

export default AccountTypeSummary;

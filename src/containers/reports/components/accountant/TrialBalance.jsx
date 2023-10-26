/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetTrialBalanceQuery } from 'services/private/reports';
import { trialBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetTrialBalanceData from 'containers/reports/custom-hooks/accountant/useGetTrialBalanceData';
import CustomReportDetailPage from '../CustomReportDetailPage';
import CustomCollapseAbleReport from '../colapsable-report';

function TrialBalance() {
  return (
    // <CustomCollapseAbleReport
    //   reportTitle="Trial Balance"
    //   reportHeadCells={trialBalanceReportHeadCells}
    //   useGetReportQuery={useGetTrialBalanceQuery}
    // />
    <CustomReportDetailPage
      reportTitle="Trial Balance"
      reportHeadCells={trialBalanceReportHeadCells}
      useGetReportQuery={useGetTrialBalanceQuery}
      useGetReportData={useGetTrialBalanceData}
      // options={{
      //   showFilter: true,
      //   showCompanyInfoHeader: true,
      //   replaceTableBody: true,
      //   showPrint: true,
      // }}
    />
  );
}

export default TrialBalance;

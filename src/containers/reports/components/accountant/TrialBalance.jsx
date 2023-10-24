import React from 'react';
import { useGetTrialBalanceQuery } from 'services/private/reports';
import { trialBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetGeneralLedgerData from 'containers/reports/custom-hooks/accountant/useGetGeneralLedgerData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function TrialBalance() {
  return (
    <CustomReportDetailPage
      reportTitle="Trial Balance"
      reportHeadCells={trialBalanceReportHeadCells}
      useGetReportQuery={useGetTrialBalanceQuery}
      useGetReportData={useGetGeneralLedgerData}
      options={{
        showFilter: true,
        showCompanyInfoHeader: true,
        replaceTableBody: true,
        showPrint: true,
      }}
    />
  );
}

export default TrialBalance;

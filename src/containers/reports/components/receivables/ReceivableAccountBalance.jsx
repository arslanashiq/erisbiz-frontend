import React from 'react';
// services
import { useGetReceivableAccountBalanceQuery } from 'services/private/reports';
// constainers
import { receivablesAccountBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceivableAccountBalanceData from 'containers/reports/custom-hooks/receivables/useGetReceivableAccountBalanceData';

import CustomReportDetailPage from '../CustomReportDetailPage';

function ReceivableAccountBalance() {
  return (
    <CustomReportDetailPage
      reportTitle="Customer Balance"
      reportHeadCells={receivablesAccountBalanceReportHeadCells}
      useGetReportQuery={useGetReceivableAccountBalanceQuery}
      useGetReportData={useGetReceivableAccountBalanceData}
    />
  );
}

export default ReceivableAccountBalance;

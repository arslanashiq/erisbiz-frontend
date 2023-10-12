import React from 'react';
import { useGetAccountTransactionsQuery } from 'services/private/reports';
import { accountTransactionReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAccountTransactionData from 'containers/reports/custom-hooks/accountant/useGetAccountTransactionData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function AccountTransaction() {
  return (
    <CustomReportDetailPage
      reportTitle="Account Transaction"
      reportHeadCells={accountTransactionReportHeadCells}
      useGetReportQuery={useGetAccountTransactionsQuery}
      useGetReportData={useGetAccountTransactionData}
    />
  );
}

export default AccountTransaction;

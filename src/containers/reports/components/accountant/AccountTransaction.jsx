import React from 'react';
import {
  useGetAccountTransactionsQuery,
  useGetTrialBalanceAccountDetailReportQuery,
} from 'services/private/reports';
import { accountTransactionReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAccountTransactionData from 'containers/reports/custom-hooks/accountant/useGetAccountTransactionData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomReportDetailPage from '../CustomReportDetailPage';

function AccountTransaction() {
  const { chart_of_account_id: COAId } = getSearchParamsList();
  return (
    <CustomReportDetailPage
      reportTitle="Account Transaction"
      reportHeadCells={accountTransactionReportHeadCells}
      useGetReportQuery={COAId ? useGetTrialBalanceAccountDetailReportQuery : useGetAccountTransactionsQuery}
      useGetReportData={useGetAccountTransactionData}
    />
  );
}

export default AccountTransaction;

import React from 'react';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetReceivableBalanceDetailAgainstCustomerQuery } from 'services/private/reports';
import useGetBalanceDetailData from 'containers/reports/custom-hooks/receivables/useGetBalanceDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ReceivableBalanceDetailAgainstCustomer() {
  return (
    <CustomReportDetailPage
      reportTitle="Account Balance Details"
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetReceivableBalanceDetailAgainstCustomerQuery}
      useGetReportData={useGetBalanceDetailData}
    />
  );
}

export default ReceivableBalanceDetailAgainstCustomer;

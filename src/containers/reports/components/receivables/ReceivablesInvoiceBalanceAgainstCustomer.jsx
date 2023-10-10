import React from 'react';
import { useGetReceivableInvoiceBalanceAgainstCustomerQuery } from 'services/private/reports';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetInvoiceBalanceAgainstCustomerData from 'containers/reports/custom-hooks/receivables/useGetInvoiceBalanceAgainstCustomerData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function ReceivablesInvoiceBalanceAgainstCustomer() {
  return (
    <CustomReportDetailPage
      reportTitle="Account Balance Details"
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetReceivableInvoiceBalanceAgainstCustomerQuery}
      useGetReportData={useGetInvoiceBalanceAgainstCustomerData}
    />
  );
}

export default ReceivablesInvoiceBalanceAgainstCustomer;

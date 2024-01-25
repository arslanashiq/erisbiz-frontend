import React from 'react';
import { useGetReceivableInvoiceBalanceAgainstCustomerQuery } from 'services/private/reports';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetInvoiceBalanceAgainstCustomerData from 'containers/reports/custom-hooks/receivables/useGetInvoiceBalanceAgainstCustomerData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ReceivablesInvoiceBalanceAgainstCustomer() {
  return (
    <CustomReportDetailPage
      reportTitle="Customer Balance Details"
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetReceivableInvoiceBalanceAgainstCustomerQuery}
      useGetReportData={useGetInvoiceBalanceAgainstCustomerData}
    />
  );
}

export default ReceivablesInvoiceBalanceAgainstCustomer;

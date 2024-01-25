import React from 'react';
import { useGetReceivableCreditNoteBalanceAgainstCustomerQuery } from 'services/private/reports';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceivableCreditNoteBalanceData from 'containers/reports/custom-hooks/receivables/useGetReceivableCreditNoteBalanceData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ReceivablesCreditNoteBalanceAgainstCustomer() {
  return (
    <CustomReportDetailPage
      reportTitle="Customer Balance Details"
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetReceivableCreditNoteBalanceAgainstCustomerQuery}
      useGetReportData={useGetReceivableCreditNoteBalanceData}
    />
  );
}

export default ReceivablesCreditNoteBalanceAgainstCustomer;

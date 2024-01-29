import React from 'react';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetSupplierExcessPaymentBalanceDetailQuery } from 'services/private/reports';
import useGetSupplierBillDetailBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBillDetailBalanceData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function SupplierExcessPaymentBalance() {
  return (
    <CustomReportDetailPage
      reportTitle="Supplier Balances"
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetSupplierExcessPaymentBalanceDetailQuery}
      useGetReportData={useGetSupplierBillDetailBalanceData}
      reportDataOptions={{ getAmountByType: false }}
    />
  );
}

export default SupplierExcessPaymentBalance;

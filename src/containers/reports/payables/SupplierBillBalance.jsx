import React from 'react';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetSupplierBillBalanceDetailQuery } from 'services/private/reports';
import useGetSupplierBillDetailBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBillDetailBalanceData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function SupplierBillBalance() {
  return (
    <CustomReportDetailPage
      reportTitle="Supplier Balances"
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetSupplierBillBalanceDetailQuery}
      useGetReportData={useGetSupplierBillDetailBalanceData}
    />
  );
}

export default SupplierBillBalance;

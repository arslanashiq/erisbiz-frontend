import useGetSupplierBillDetailBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBillDetailBalanceData';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import React from 'react';
import { useGetSupplierBalanceDetailQuery } from 'services/private/reports';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function SupplierBalanceDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Supplier Balances"
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetSupplierBalanceDetailQuery}
      useGetReportData={useGetSupplierBillDetailBalanceData}
    />
  );
}

export default SupplierBalanceDetail;

import React from 'react';
// services
import { useGetSupplierPayableBalanceQuery } from 'services/private/reports';
import { supplierPaybleBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSupplierBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBalanceData';
// components
import CustomReportDetailPage from '../CustomReportDetailPage';

function SupplierBalance() {
  return (
    <CustomReportDetailPage
      reportTitle="Supplier Balances"
      reportHeadCells={supplierPaybleBalanceReportHeadCells}
      useGetReportQuery={useGetSupplierPayableBalanceQuery}
      useGetReportData={useGetSupplierBalanceData}
    />
  );
}

export default SupplierBalance;

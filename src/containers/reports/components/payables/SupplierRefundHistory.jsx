import React from 'react';
// services
import { useGetSupplierRefundHistoryQuery } from 'services/private/reports';
// containers
import { supplierRefundHistoryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useSupplierRefundHistoryData from 'containers/reports/custom-hooks/payables/useSupplierRefundHistoryData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function SupplierRefundHistory() {
  return (
    <CustomReportDetailPage
      reportTitle="Supplier Refund History"
      reportHeadCells={supplierRefundHistoryReportHeadCells}
      useGetReportQuery={useGetSupplierRefundHistoryQuery}
      useGetReportData={useSupplierRefundHistoryData}
    />
  );
}

export default SupplierRefundHistory;

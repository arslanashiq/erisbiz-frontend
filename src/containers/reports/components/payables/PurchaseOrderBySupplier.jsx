import React from 'react';
// services
import { useGetPurchaseOrderBySupplierQuery } from 'services/private/reports';
// utilities
import useGetPurchaseOrderBySupplierData from 'containers/reports/custom-hooks/payables/useGetPurchaseOrderBySupplierData';
// utilities
import { payablePurchaseOrderBySupplierReportHeadCells } from '../../utilities/head-cells';
import CustomReportDetailPage from '../CustomReportDetailPage';

function PurchaseOrderBySupplier() {
  return (
    <CustomReportDetailPage
      reportTitle="Purchase Orders By Suppliers"
      reportHeadCells={payablePurchaseOrderBySupplierReportHeadCells}
      useGetReportQuery={useGetPurchaseOrderBySupplierQuery}
      useGetReportData={useGetPurchaseOrderBySupplierData}
    />
  );
}

export default PurchaseOrderBySupplier;

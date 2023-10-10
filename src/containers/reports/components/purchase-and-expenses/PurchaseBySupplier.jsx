import React from 'react';
import { useGetPurchaseBySupplierQuery } from 'services/private/reports';
import { purchaseBySupplierReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseBySupplierData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseBySupplierData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function PurchaseBySupplier() {
  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Supplier"
      reportHeadCells={purchaseBySupplierReportHeadCells}
      useGetReportQuery={useGetPurchaseBySupplierQuery}
      useGetReportData={useGetPurchaseBySupplierData}
    />
  );
}

export default PurchaseBySupplier;

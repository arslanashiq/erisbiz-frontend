import React from 'react';
import { useGetPurchaseBySupplierDetailQuery } from 'services/private/reports';
import { purchaseBySupplierDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseBySupplierDetailData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseBySupplierDetailData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function PurchaseBySupplierDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Supplier"
      reportHeadCells={purchaseBySupplierDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseBySupplierDetailQuery}
      useGetReportData={useGetPurchaseBySupplierDetailData}
    />
  );
}

export default PurchaseBySupplierDetail;

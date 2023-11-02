import React from 'react';
// services
import { useGetPurchaseOrderDetailQuery } from 'services/private/reports';
// containers
import { payablePurchaseOrderDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseOrderDetailData from 'containers/reports/custom-hooks/payables/useGetPurchaseOrderDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function PurchaseOrderDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Purchase Order Detail"
      reportHeadCells={payablePurchaseOrderDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseOrderDetailQuery}
      useGetReportData={useGetPurchaseOrderDetailData}
    />
  );
}

export default PurchaseOrderDetail;

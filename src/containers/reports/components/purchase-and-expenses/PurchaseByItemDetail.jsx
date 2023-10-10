import React from 'react';
import useGetPurchaseByItemDetailData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseByItemDetailData';
import { purchaseByItemDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetPurchaseByItemDetailQuery } from 'services/private/reports';
import CustomReportDetailPage from '../CustomReportDetailPage';

function PurchaseByItemDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Item"
      reportHeadCells={purchaseByItemDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseByItemDetailQuery}
      useGetReportData={useGetPurchaseByItemDetailData}
    />
  );
}

export default PurchaseByItemDetail;

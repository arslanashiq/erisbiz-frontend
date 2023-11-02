import React from 'react';
import { useGetPurchaseByItemQuery } from 'services/private/reports';
import { purchaseByItemReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseByItemData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseByItemData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function PurchaseByItem() {
  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Item"
      reportHeadCells={purchaseByItemReportHeadCells}
      useGetReportQuery={useGetPurchaseByItemQuery}
      useGetReportData={useGetPurchaseByItemData}
    />
  );
}

export default PurchaseByItem;

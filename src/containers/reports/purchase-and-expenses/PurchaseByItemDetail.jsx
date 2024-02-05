import React from 'react';
import useGetPurchaseByItemDetailData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseByItemDetailData';
import { purchaseByItemDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetPurchaseByItemDetailQuery } from 'services/private/reports';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { CustomFilterForReportParams } from '../utilities/custom-filter-for-report';

function PurchaseByItemDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Item"
      reportHeadCells={purchaseByItemDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseByItemDetailQuery}
      useGetReportData={useGetPurchaseByItemDetailData}
      paramsFilter={CustomFilterForReportParams}
      options={{
        showFilter: false,
      }}
    />
  );
}

export default PurchaseByItemDetail;

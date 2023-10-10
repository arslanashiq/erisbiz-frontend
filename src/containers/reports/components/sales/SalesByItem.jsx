import React from 'react';
import { useGetSaleByItemQuery } from 'services/private/reports';
import { saleByItemReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSaleByItemData from 'containers/reports/custom-hooks/sales/useGetSaleByItemData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function SalesByItem() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Item"
      reportHeadCells={saleByItemReportHeadCells}
      useGetReportQuery={useGetSaleByItemQuery}
      useGetReportData={useGetSaleByItemData}
    />
  );
}

export default SalesByItem;

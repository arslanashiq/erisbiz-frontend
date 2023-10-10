import React from 'react';
import { useGetSaleByItemDetailQuery } from 'services/private/reports';
import { saleByItemDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSalesByItemDetailData from 'containers/reports/custom-hooks/sales/useGetSalesByItemDetailData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function SalesByItemDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Item"
      reportHeadCells={saleByItemDetailReportHeadCells}
      useGetReportQuery={useGetSaleByItemDetailQuery}
      useGetReportData={useGetSalesByItemDetailData}
    />
  );
}

export default SalesByItemDetail;

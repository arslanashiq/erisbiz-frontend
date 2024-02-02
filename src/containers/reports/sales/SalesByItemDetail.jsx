import React from 'react';
import { useGetSaleByItemDetailQuery } from 'services/private/reports';
import { saleByItemDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSalesByItemDetailData from 'containers/reports/custom-hooks/sales/useGetSalesByItemDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { CustomFilterForReportParams } from '../utilities/custom-filter-for-report';

function SalesByItemDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Item"
      reportHeadCells={saleByItemDetailReportHeadCells}
      useGetReportQuery={useGetSaleByItemDetailQuery}
      useGetReportData={useGetSalesByItemDetailData}
      options={{ showFilter: false }}
      paramsFilter={CustomFilterForReportParams}

    />
  );
}

export default SalesByItemDetail;

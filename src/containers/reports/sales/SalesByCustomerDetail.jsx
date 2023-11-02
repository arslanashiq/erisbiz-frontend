import React from 'react';
import { useGetSaleByCustomerDetailQuery } from 'services/private/reports';
import { saleByCustomerDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSaleByCustomerDetailData from 'containers/reports/custom-hooks/sales/useGetSaleByCustomerDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function SalesByCustomerDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Customer"
      reportHeadCells={saleByCustomerDetailReportHeadCells}
      useGetReportQuery={useGetSaleByCustomerDetailQuery}
      useGetReportData={useGetSaleByCustomerDetailData}
    />
  );
}

export default SalesByCustomerDetail;

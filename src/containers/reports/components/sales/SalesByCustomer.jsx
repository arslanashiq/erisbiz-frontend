import React from 'react';
import { useGetSaleByCustomerQuery } from 'services/private/reports';
import useGetSaleByCustomerData from 'containers/reports/custom-hooks/sales/useGetSaleByCustomerData';
import { saleByCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import CustomReportDetailPage from '../CustomReportDetailPage';

function SalesByCustomer() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Customer"
      reportHeadCells={saleByCustomerReportHeadCells}
      useGetReportQuery={useGetSaleByCustomerQuery}
      useGetReportData={useGetSaleByCustomerData}
    />
  );
}

export default SalesByCustomer;

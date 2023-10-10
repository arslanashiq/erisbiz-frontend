import React from 'react';
import useGetSalesBySalePersonData from 'containers/reports/custom-hooks/sales/useGetSalesBySalePersonData';
import { saleBySalePersonReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetSaleBySalePersonQuery } from 'services/private/reports';
import CustomReportDetailPage from '../CustomReportDetailPage';

function SalesBySalesPerson() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Sales Person"
      reportHeadCells={saleBySalePersonReportHeadCells}
      useGetReportQuery={useGetSaleBySalePersonQuery}
      useGetReportData={useGetSalesBySalePersonData}
    />
  );
}

export default SalesBySalesPerson;

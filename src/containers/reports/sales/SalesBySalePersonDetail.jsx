import React from 'react';
import { useGetSaleBySalePersonDetailQuery } from 'services/private/reports';
import { saleBySalePersonDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSalesBySalePersonDetailData from 'containers/reports/custom-hooks/sales/useGetSalesBySalePersonDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function SalesBySalePersonDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Sales Person"
      reportHeadCells={saleBySalePersonDetailReportHeadCells}
      useGetReportQuery={useGetSaleBySalePersonDetailQuery}
      useGetReportData={useGetSalesBySalePersonDetailData}
    />
  );
}

export default SalesBySalePersonDetail;

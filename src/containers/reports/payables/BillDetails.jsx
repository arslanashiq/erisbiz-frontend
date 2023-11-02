import React from 'react';
// services
import { useGetPayableBillDetailsQuery } from 'services/private/reports';
import useGetBillDetailData from 'containers/reports/custom-hooks/payables/useGetBillDetailData';
import { payableBillDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';
// components
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function BillDetails() {
  return (
    <CustomReportDetailPage
      reportTitle="Bill Detail"
      reportHeadCells={payableBillDetailsReportHeadCells}
      useGetReportQuery={useGetPayableBillDetailsQuery}
      useGetReportData={useGetBillDetailData}
    />
  );
}

export default BillDetails;

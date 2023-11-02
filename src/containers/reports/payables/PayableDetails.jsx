import React from 'react';
// services
import { useGetPayableDetailQuery } from 'services/private/reports';
// constainers

import { payableDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableDetailData from 'containers/reports/custom-hooks/payables/useGetPayableDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function PayableDetails() {
  return (
    <CustomReportDetailPage
      reportTitle="Payable Detail"
      reportHeadCells={payableDetailReportHeadCells}
      useGetReportQuery={useGetPayableDetailQuery}
      useGetReportData={useGetPayableDetailData}
    />
  );
}

export default PayableDetails;

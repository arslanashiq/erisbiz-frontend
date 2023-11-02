import React from 'react';
// services
import { useGetApAgingDetailQuery } from 'services/private/reports';

import { apAgingDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetApAgingDetailData from 'containers/reports/custom-hooks/payables/useGetApAgingDetailData';
// components
import CustomReportDetailPage from '../components/CustomReportDetailPage';
// styles
import 'styles/reports/reports.scss';

function ApAgingDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Ap Aging Detail"
      reportHeadCells={apAgingDetailReportHeadCells}
      useGetReportQuery={useGetApAgingDetailQuery}
      useGetReportData={useGetApAgingDetailData}
    />
  );
}

export default ApAgingDetail;

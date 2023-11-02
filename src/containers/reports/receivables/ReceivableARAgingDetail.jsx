import React from 'react';
// services
import { useGetReceivableARAgingDetailQuery } from 'services/private/reports';
// constainers
import { receivablesARAgingDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetARAgingDetailData from 'containers/reports/custom-hooks/receivables/useGetARAgingDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ReceivableARAgingDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="AR Aging Detail"
      reportHeadCells={receivablesARAgingDetailReportHeadCells}
      useGetReportQuery={useGetReceivableARAgingDetailQuery}
      useGetReportData={useGetARAgingDetailData}
    />
  );
}

export default ReceivableARAgingDetail;

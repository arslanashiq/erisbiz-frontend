import React from 'react';
// services
import { useGetReceivableInvoiceDetailQuery } from 'services/private/reports';
// containers
import { receivableInvoiceDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';

import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetInvoiceDetailData from '../custom-hooks/receivables/useGetInvoiceDetailData';

function ReceivableInvoiceDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales Invoice Detail"
      reportHeadCells={receivableInvoiceDetailsReportHeadCells}
      useGetReportQuery={useGetReceivableInvoiceDetailQuery}
      useGetReportData={useGetInvoiceDetailData}
    />
  );
}

export default ReceivableInvoiceDetail;

import React from 'react';
// services
import { useGetReceivableInvoiceDetailQuery } from 'services/private/reports';
// containers
import useGetBillDetailData from 'containers/reports/custom-hooks/payables/useGetBillDetailData';
import { payableBillDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';

import CustomReportDetailPage from '../CustomReportDetailPage';

function ReceivableInvoiceDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Invoice Detail"
      reportHeadCells={payableBillDetailsReportHeadCells}
      useGetReportQuery={useGetReceivableInvoiceDetailQuery}
      useGetReportData={useGetBillDetailData}
    />
  );
}

export default ReceivableInvoiceDetail;

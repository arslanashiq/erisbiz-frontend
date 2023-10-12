import React from 'react';
import { useGetRefundHistoryReportQuery } from 'services/private/reports';
import { creditNoteDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetRefundHistoryData from 'containers/reports/custom-hooks/receipt-voucher/useGetRefundHistoryData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function RefundHistory() {
  return (
    <CustomReportDetailPage
      reportTitle="Refund History"
      reportHeadCells={creditNoteDetailReportHeadCells}
      useGetReportQuery={useGetRefundHistoryReportQuery}
      useGetReportData={useGetRefundHistoryData}
    />
  );
}

export default RefundHistory;

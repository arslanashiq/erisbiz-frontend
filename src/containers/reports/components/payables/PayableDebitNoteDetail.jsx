import React from 'react';
import { useGetPayableDebitNoteDetailQuery } from 'services/private/reports';
import { payableDebitNoteReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableDebitNoteData from 'containers/reports/custom-hooks/payables/useGetPayableDebitNoteData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function PayableDebitNoteDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Debit Note"
      reportHeadCells={payableDebitNoteReportHeadCells}
      useGetReportQuery={useGetPayableDebitNoteDetailQuery}
      useGetReportData={useGetPayableDebitNoteData}
    />
  );
}

export default PayableDebitNoteDetail;

import React from 'react';
import { useGetCreditNoteDetailReportQuery } from 'services/private/reports';
import { creditNoteDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetCreditNoteDetailData from 'containers/reports/custom-hooks/receipt-voucher/useGetCreditNoteDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function CreditNoteDetail() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales Credit Note Detail"
      reportHeadCells={creditNoteDetailReportHeadCells}
      useGetReportQuery={useGetCreditNoteDetailReportQuery}
      useGetReportData={useGetCreditNoteDetailData}
    />
  );
}

export default CreditNoteDetail;

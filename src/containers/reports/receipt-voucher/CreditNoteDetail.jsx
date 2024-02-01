import React from 'react';
import { useGetCreditNoteDetailReportQuery } from 'services/private/reports';
import { creditNoteDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetCreditNoteDetailData from 'containers/reports/custom-hooks/receipt-voucher/useGetCreditNoteDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function CreditNoteDetail() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Sales Credit Note"
      reportHeadCells={creditNoteDetailReportHeadCells}
      useGetReportQuery={useGetCreditNoteDetailReportQuery}
      useGetReportData={useGetCreditNoteDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default CreditNoteDetail;

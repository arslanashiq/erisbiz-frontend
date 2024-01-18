import React from 'react';
import { useGetPayableDebitNoteDetailQuery } from 'services/private/reports';
import { payableDebitNoteReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableDebitNoteData from 'containers/reports/custom-hooks/payables/useGetPayableDebitNoteData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function PayableDebitNoteDetail() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Debit Note"
      reportHeadCells={payableDebitNoteReportHeadCells}
      useGetReportQuery={useGetPayableDebitNoteDetailQuery}
      useGetReportData={useGetPayableDebitNoteData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default PayableDebitNoteDetail;

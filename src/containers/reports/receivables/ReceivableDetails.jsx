import React from 'react';
import { receivablesDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetReceivableDetailQuery } from 'services/private/reports';
import useGetReceivablesDetailData from 'containers/reports/custom-hooks/receivables/useGetReceivablesDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceivableDetails() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Receivable Detail"
      reportHeadCells={receivablesDetailReportHeadCells}
      useGetReportQuery={useGetReceivableDetailQuery}
      useGetReportData={useGetReceivablesDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceivableDetails;

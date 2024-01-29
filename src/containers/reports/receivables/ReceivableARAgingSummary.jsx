import React from 'react';
// services
import { useGetReceivableARAgingSummaryQuery } from 'services/private/reports';
// constainers
import { receivablesARAgingSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetARAgingSummaryData from 'containers/reports/custom-hooks/receivables/useGetARAgingSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { arAgingSummaryInitialValues } from '../utilities/initial-values';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { agingByInput } from '../utilities/filter-input-list';
import { arAgingSummaryCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceivableARAgingSummary() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="AR Aging Summary"
      reportHeadCells={receivablesARAgingSummaryReportHeadCells}
      useGetReportQuery={useGetReceivableARAgingSummaryQuery}
      useGetReportData={useGetARAgingSummaryData}
      customReportCustomerInitialValues={arAgingSummaryInitialValues}
      customReportCustomFilter={[...updatedCustomInputList, agingByInput]}
      customReportInputListValidationSchema={arAgingSummaryCustomInputsValidationSchema}
    />
  );
}

export default ReceivableARAgingSummary;

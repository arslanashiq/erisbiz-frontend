import React from 'react';
// services
import { useGetReceivableSummaryQuery } from 'services/private/reports';
// constainers
import { receivablesSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceivableSummaryData from 'containers/reports/custom-hooks/receivables/useGetReceivableSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { statusInput } from '../utilities/filter-input-list';
import { receivableSummaryInitialValues } from '../utilities/initial-values';
import { receivableSummaryCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceivableSummary() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Receivable Summary"
      reportHeadCells={receivablesSummaryReportHeadCells}
      useGetReportQuery={useGetReceivableSummaryQuery}
      useGetReportData={useGetReceivableSummaryData}
      customReportCustomFilter={[...updatedCustomInputList, statusInput]}
      customReportCustomerInitialValues={receivableSummaryInitialValues}
      customReportInputListValidationSchema={receivableSummaryCustomInputsValidationSchema}
    />
  );
}

export default ReceivableSummary;

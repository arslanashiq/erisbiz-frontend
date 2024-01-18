import React from 'react';
// services
import { useGetApAgingSummaryQuery } from 'services/private/reports';
// containers
import { apAgingSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAPAgingSummaryData from 'containers/reports/custom-hooks/payables/useGetAPAgingSummaryData';
import { agingByInput } from '../utilities/filter-input-list';
import { apAgingInitialValues } from '../utilities/initial-values';
import { apAgingFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function ApAgingSummary() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="AP Aging Summary"
      reportHeadCells={apAgingSummaryReportHeadCells}
      useGetReportQuery={useGetApAgingSummaryQuery}
      useGetReportData={useGetAPAgingSummaryData}
      customReportCustomerInitialValues={apAgingInitialValues}
      customReportCustomFilter={[...updatedCustomInputList, agingByInput]}
      customReportInputListValidationSchema={apAgingFilterCustomInputsValidationSchema}
    />
  );
}

export default ApAgingSummary;

import React from 'react';
// services
import { useGetPayableSummaryQuery } from 'services/private/reports';
import { payableSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableSummaryData from 'containers/reports/custom-hooks/payables/useGetPayableSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { statusInput } from '../utilities/filter-input-list';
import { payableSummaryInitialValues } from '../utilities/initial-values';
import { payableSummaryFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function PayableSummary() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Payable Summary"
      reportHeadCells={payableSummaryReportHeadCells}
      useGetReportQuery={useGetPayableSummaryQuery}
      useGetReportData={useGetPayableSummaryData}
      customReportCustomFilter={[...updatedCustomInputList, statusInput]}
      customReportCustomerInitialValues={payableSummaryInitialValues}
      customReportInputListValidationSchema={payableSummaryFilterCustomInputsValidationSchema}
    />
  );
}

export default PayableSummary;

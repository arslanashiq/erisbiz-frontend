import React from 'react';
// services
import { useGetPayableSummaryQuery } from 'services/private/reports';
import { payableSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPayableSummaryData from 'containers/reports/custom-hooks/payables/useGetPayableSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { endDateInput, startDateInput, statusInput } from '../utilities/filter-input-list';
import usegetSupplierInput from '../custom-hooks/common/useGetSupplierInput';
import { payableSummaryInitialValues } from '../utilities/initial-values';
import { payableSummaryFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function PayableSummary() {
  const durationInput = useGetDurationInput();
  const supplierInput = usegetSupplierInput();

  return (
    <CustomReportDetailPage
      reportTitle="Payable Summary"
      reportHeadCells={payableSummaryReportHeadCells}
      useGetReportQuery={useGetPayableSummaryQuery}
      useGetReportData={useGetPayableSummaryData}
      customReportCustomFilter={[durationInput, startDateInput, endDateInput, supplierInput, statusInput]}
      customReportCustomerInitialValues={payableSummaryInitialValues}
      customReportInputListValidationSchema={payableSummaryFilterCustomInputsValidationSchema}
    />
  );
}

export default PayableSummary;

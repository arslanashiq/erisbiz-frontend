import React from 'react';
import { useGetAccountTypeSummaryQuery } from 'services/private/reports';
import { accountTypeSummaryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetAccountTypeSummaryData from 'containers/reports/custom-hooks/accountant/useGetAccountTypeSummaryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import { customDuration } from '../utilities/initial-values';
import { activityLogsFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function AccountTypeSummary() {
  const durationInput = useGetDurationInput();
  return (
    <CustomReportDetailPage
      reportTitle="Account Type Summary"
      reportHeadCells={accountTypeSummaryReportHeadCells}
      useGetReportQuery={useGetAccountTypeSummaryQuery}
      useGetReportData={useGetAccountTypeSummaryData}
      customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput]}
      customReportCustomerInitialValues={customDuration}
      customReportInputListValidationSchema={activityLogsFilterCustomInputsValidationSchema}
    />
  );
}

export default AccountTypeSummary;

import React from 'react';
import { useGetJuornalReportQuery } from 'services/private/reports';
import { journalReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetJournalReportData from 'containers/reports/custom-hooks/accountant/useGetJournalReportData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import { customDuration } from '../utilities/initial-values';
import { activityLogsFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function JournalReport() {
  const durationInput = useGetDurationInput();

  return (
    <CustomReportDetailPage
      reportTitle="Journal Report"
      reportHeadCells={journalReportHeadCells}
      useGetReportQuery={useGetJuornalReportQuery}
      useGetReportData={useGetJournalReportData}
      customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput]}
      customReportCustomerInitialValues={customDuration}
      customReportInputListValidationSchema={activityLogsFilterCustomInputsValidationSchema}
    />
  );
}

export default JournalReport;

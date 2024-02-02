import React from 'react';
import { useGetActivityLogsQuery } from 'services/private/reports';
import { activityLogsHeadCells } from 'containers/reports/utilities/head-cells';
import useActivityLogsData from 'containers/reports/custom-hooks/activity/useActivityLogsData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { customDuration } from '../utilities/initial-values';
import { activityLogsFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';

function ActivityLogs() {
  const durationInput = useGetDurationInput();
  return (
    <CustomReportDetailPage
      reportTitle="Activity Logs"
      reportHeadCells={activityLogsHeadCells}
      useGetReportQuery={useGetActivityLogsQuery}
      useGetReportData={useActivityLogsData}
      options={{
        showFilter: true,
        showCompanyInfoHeader: true,
        replaceTableBody: true,
        showPrint: true,
      }}
      parentWrapperClassName="custom-receipt-activity-log"
      queryOptions={{ refetchOnMountOrArgChange: true }}
      usePagination
      customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput]}
      customReportCustomerInitialValues={customDuration}
      customReportInputListValidationSchema={activityLogsFilterCustomInputsValidationSchema}
    />
  );
}

export default ActivityLogs;

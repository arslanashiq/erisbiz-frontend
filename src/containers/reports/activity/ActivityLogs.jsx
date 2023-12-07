import React from 'react';
import { useGetActivityLogsQuery } from 'services/private/reports';
import { activityLogsHeadCells } from 'containers/reports/utilities/head-cells';
import useActivityLogsData from 'containers/reports/custom-hooks/activity/useActivityLogsData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ActivityLogs() {
  return (
    <CustomReportDetailPage
      reportTitle="Activity Logs"
      reportHeadCells={activityLogsHeadCells}
      useGetReportQuery={useGetActivityLogsQuery}
      useGetReportData={useActivityLogsData}
      options={{
        showFilter: true,
        showCompanyInfoHeader: true,
        replaceTableBody: false,
        showPrint: false,
      }}
      parentWrapperClassName="custom-receipt-activity-log"
      queryOptions={{ refetchOnMountOrArgChange: true }}
    />
  );
}

export default ActivityLogs;

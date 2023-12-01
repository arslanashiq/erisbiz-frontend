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
    />
  );
}

export default ActivityLogs;

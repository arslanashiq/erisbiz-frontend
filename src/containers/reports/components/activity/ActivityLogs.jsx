import React from 'react';
import { useGetActivityLogsQuery } from 'services/private/reports';
import { activityLogsHeadCells } from 'containers/reports/utilities/head-cells';
import useActivityLogsData from 'containers/reports/custom-hooks/activity/useActivityLogsData';
import CustomReportDetailPage from '../CustomReportDetailPage';

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
        replaceTableBody: true,
        showPrint: false,
      }}
    />
  );
}

export default ActivityLogs;

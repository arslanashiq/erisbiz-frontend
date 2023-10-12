import React from 'react';
import { useGetJuornalReportQuery } from 'services/private/reports';
import { journalReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetJournalReportData from 'containers/reports/custom-hooks/accountant/useGetJournalReportData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function JournalReport() {
  return (
    <CustomReportDetailPage
      reportTitle="Journal Report"
      reportHeadCells={journalReportHeadCells}
      useGetReportQuery={useGetJuornalReportQuery}
      useGetReportData={useGetJournalReportData}
    />
  );
}

export default JournalReport;

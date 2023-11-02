import React from 'react';
import { useGetDetailGeneralLedgerQuery } from 'services/private/reports';
import { detailGeneralLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetDetailGeneralLedgerData from 'containers/reports/custom-hooks/accountant/useGetDetailGeneralLedgerData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function DetailGeneralLedger() {
  return (
    <CustomReportDetailPage
      reportTitle="Account Type Summary"
      reportHeadCells={detailGeneralLedgerReportHeadCells}
      useGetReportQuery={useGetDetailGeneralLedgerQuery}
      useGetReportData={useGetDetailGeneralLedgerData}
    />
  );
}

export default DetailGeneralLedger;

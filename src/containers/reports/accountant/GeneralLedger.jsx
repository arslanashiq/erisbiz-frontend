import React from 'react';
import { useGetGeneralLedgerQuery } from 'services/private/reports';
import { generalLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetGeneralLedgerData from 'containers/reports/custom-hooks/accountant/useGetGeneralLedgerData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function GeneralLedger() {
  return (
    <CustomReportDetailPage
      reportTitle="General Ledger"
      reportHeadCells={generalLedgerReportHeadCells}
      useGetReportQuery={useGetGeneralLedgerQuery}
      useGetReportData={useGetGeneralLedgerData}
      options={{
        showFilter: true,
        showCompanyInfoHeader: true,
        replaceTableBody: true,
        showPrint: true,
      }}
    />
  );
}

export default GeneralLedger;

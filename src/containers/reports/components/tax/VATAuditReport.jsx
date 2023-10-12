import React from 'react';
import { useGetVATAuditQuery } from 'services/private/reports';
import { VATAuditReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetVATAuditData from 'containers/reports/custom-hooks/tax/useGetVATAuditData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function VATAuditReport() {
  return (
    <CustomReportDetailPage
      reportTitle="VAT Audit"
      reportHeadCells={VATAuditReportHeadCells}
      useGetReportQuery={useGetVATAuditQuery}
      useGetReportData={useGetVATAuditData}
      options={{
        showFilter: false,
        // customComponent:
      }}
    />
  );
}

export default VATAuditReport;

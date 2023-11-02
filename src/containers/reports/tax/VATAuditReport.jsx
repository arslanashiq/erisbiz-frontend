import React from 'react';
import { useGetVATAuditQuery, useAddVATAuditFileMutation } from 'services/private/reports';
import { VATAuditReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetVATAuditData from 'containers/reports/custom-hooks/tax/useGetVATAuditData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import GenerateTaxReportFile from './components/GenerateTaxReportFile';

function VATAuditReport() {
  return (
    <CustomReportDetailPage
      reportTitle="VAT Audit"
      reportHeadCells={VATAuditReportHeadCells}
      useGetReportQuery={useGetVATAuditQuery}
      useGetReportData={useGetVATAuditData}
      CustomComponent={
        <GenerateTaxReportFile title="Generate Audit File" useMutation={useAddVATAuditFileMutation} />
      }
      options={{
        showFilter: false,
        replaceTableBody: true,
        showCompanyInfoHeader: false,
      }}
    />
  );
}

export default VATAuditReport;

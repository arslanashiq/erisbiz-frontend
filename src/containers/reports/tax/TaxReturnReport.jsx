import React from 'react';
import { useAddTaxReturnMutation, useGetTaxReturnQuery } from 'services/private/reports';
import { taxReturnReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetTaxReturnReportData from 'containers/reports/custom-hooks/tax/useGetTaxReturnReportData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import GenerateTaxReportFile from './components/GenerateTaxReportFile';

function TaxReturnReport() {
  return (
    <CustomReportDetailPage
      reportTitle="Tax Returns"
      reportHeadCells={taxReturnReportHeadCells}
      useGetReportQuery={useGetTaxReturnQuery}
      useGetReportData={useGetTaxReturnReportData}
      CustomComponent={
        <GenerateTaxReportFile title="Generate VAT Return" useMutation={useAddTaxReturnMutation} />
      }
      options={{
        showFilter: false,
        replaceTableBody: true,
        showCompanyInfoHeader: true,
      }}
    />
  );
}

export default TaxReturnReport;

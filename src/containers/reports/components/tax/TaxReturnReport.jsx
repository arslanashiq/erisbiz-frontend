import React from 'react';
import { useGetTaxReturnQuery } from 'services/private/reports';
import { taxReturnReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetTaxReturnReportData from 'containers/reports/custom-hooks/tax/useGetTaxReturnReportData';
import CustomReportDetailPage from '../CustomReportDetailPage';

function TaxReturnReport() {
  return (
    <CustomReportDetailPage
      reportTitle="Tax Returns"
      reportHeadCells={taxReturnReportHeadCells}
      useGetReportQuery={useGetTaxReturnQuery}
      useGetReportData={useGetTaxReturnReportData}
      options={{
        showFilter: false,
      }}
    />
  );
}

export default TaxReturnReport;

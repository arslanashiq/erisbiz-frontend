import React, { useMemo } from 'react';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { useGetTaxReturnDetailInformationQuery } from 'services/private/reports';
import { taxReturnDetailInformationReportHeadCells } from '../utilities/head-cells';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetTaxReturnDetailInformationDataReportData from '../custom-hooks/tax/useGetTaxReturnDetailInformationDataReportData';

function TaxReturnDetailInformationReport() {
  const { tax_rate: taxRate, place_of_supply: placeOfSupply, type } = getSearchParamsList();

  const headerTitle = useMemo(() => {
    let title = '';
    if (taxRate) {
      title = taxRate.replaceAll('%20', ' ');
    }
    if (type) {
      title = `${title} ${type}`;
    }
    if (placeOfSupply) {
      title = `${placeOfSupply.replaceAll('%20', ' ')} (${title.replaceAll('(', '')}`;
    }
    return title;
  }, [taxRate, placeOfSupply, type]);
  return (
    <CustomReportDetailPage
      reportTitle={headerTitle}
      reportHeadCells={taxReturnDetailInformationReportHeadCells}
      useGetReportQuery={useGetTaxReturnDetailInformationQuery}
      useGetReportData={useGetTaxReturnDetailInformationDataReportData}
      options={{
        showFilter: false,
        showCompanyInfoHeader: true,
        replaceTableBody: false,
        showPrint: true,
      }}
    />
  );
}

export default TaxReturnDetailInformationReport;

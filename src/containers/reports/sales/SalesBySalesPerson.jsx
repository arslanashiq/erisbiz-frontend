import React from 'react';
import useGetSalesBySalePersonData from 'containers/reports/custom-hooks/sales/useGetSalesBySalePersonData';
import { saleBySalePersonReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetSaleBySalePersonQuery } from 'services/private/reports';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import useGetSalePersonInput from '../custom-hooks/common/useGetSalePersonInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import { salesBySalePersonInitialValues } from '../utilities/initial-values';
import { salesBySalesPersonmFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function SalesBySalesPerson() {
  const durationInput = useGetDurationInput();
  const salesPersonInput = useGetSalePersonInput();
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Sales Person"
      reportHeadCells={saleBySalePersonReportHeadCells}
      useGetReportQuery={useGetSaleBySalePersonQuery}
      useGetReportData={useGetSalesBySalePersonData}
      customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput, salesPersonInput]}
      customReportCustomerInitialValues={salesBySalePersonInitialValues}
      customReportInputListValidationSchema={salesBySalesPersonmFilterCustomInputsValidationSchema}
    />
  );
}

export default SalesBySalesPerson;

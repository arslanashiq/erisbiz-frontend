import React from 'react';
import { useGetSaleByItemQuery } from 'services/private/reports';
import { saleByItemReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSaleByItemData from 'containers/reports/custom-hooks/sales/useGetSaleByItemData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import useGetItemInput from '../custom-hooks/common/useGetItemInput';
import { salesByItemInitialValues } from '../utilities/initial-values';
import { salesByItemFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import { CustomFilterForReportParams } from '../utilities/custom-filter-for-report';

function SalesByItem() {
  const durationInput = useGetDurationInput();
  const itemInput = useGetItemInput();

  return (
    <CustomReportDetailPage
      reportTitle="Sales By Item"
      reportHeadCells={saleByItemReportHeadCells}
      useGetReportQuery={useGetSaleByItemQuery}
      useGetReportData={useGetSaleByItemData}
      customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput, itemInput]}
      customReportCustomerInitialValues={salesByItemInitialValues}
      customReportInputListValidationSchema={salesByItemFilterCustomInputsValidationSchema}
      paramsFilter={CustomFilterForReportParams}
    />
  );
}

export default SalesByItem;

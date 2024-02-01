import React from 'react';
import { useGetPurchaseByItemQuery } from 'services/private/reports';
import { purchaseByItemReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseByItemData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseByItemData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import useGetItemInput from '../custom-hooks/common/useGetItemInput';
import {
  comparisonInput,
  comparisonSpanInput,
  customEndDateInput,
  customStartDateInput,
  groupByInput,
} from '../utilities/filter-input-list';
import { purchaseByItemInitialValues } from '../utilities/initial-values';
import { purchaseByItemCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetChartOfAccountInput from '../custom-hooks/common/useGetChartOfAccountInput';
import { groupBy } from '../utilities/constants';

function PurchaseByItem() {
  const durationInput = useGetDurationInput();
  const itemInput = useGetItemInput();
  const chartOfAccountInput = useGetChartOfAccountInput({ account_type: 'expense' });
  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Item"
      reportHeadCells={purchaseByItemReportHeadCells}
      useGetReportQuery={useGetPurchaseByItemQuery}
      useGetReportData={useGetPurchaseByItemData}
      customReportCustomFilter={[
        durationInput,
        customStartDateInput,
        customEndDateInput,
        comparisonInput,
        comparisonSpanInput,
        itemInput,
        chartOfAccountInput,
        { ...groupByInput, options: [groupBy[groupBy.length - 1]] },
      ]}
      customReportCustomerInitialValues={purchaseByItemInitialValues}
      customReportInputListValidationSchema={purchaseByItemCustomInputsValidationSchema}
    />
  );
}

export default PurchaseByItem;

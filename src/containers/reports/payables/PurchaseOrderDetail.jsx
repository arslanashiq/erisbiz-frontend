import React from 'react';
// services
import { useGetPurchaseOrderDetailQuery } from 'services/private/reports';
// containers
import { payablePurchaseOrderDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseOrderDetailData from 'containers/reports/custom-hooks/payables/useGetPurchaseOrderDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { payablePurchaseOrderDetailInitialValues } from '../utilities/initial-values';
import { payablePurchaseOrderFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { endDateInput, startDateInput } from '../utilities/filter-input-list';

function PurchaseOrderDetail() {
  const durationInput = useGetDurationInput();
  return (
    <CustomReportDetailPage
      reportTitle="Purchase Order Detail"
      reportHeadCells={payablePurchaseOrderDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseOrderDetailQuery}
      useGetReportData={useGetPurchaseOrderDetailData}
      customReportCustomFilter={[durationInput, startDateInput, endDateInput]}
      customReportCustomerInitialValues={payablePurchaseOrderDetailInitialValues}
      customReportInputListValidationSchema={payablePurchaseOrderFilterCustomInputsValidationSchema}
    />
  );
}

export default PurchaseOrderDetail;

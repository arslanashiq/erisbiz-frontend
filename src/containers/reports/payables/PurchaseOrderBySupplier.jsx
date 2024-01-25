import React from 'react';
// services
import { useGetPurchaseOrderBySupplierQuery } from 'services/private/reports';
// utilities
import useGetPurchaseOrderBySupplierData from 'containers/reports/custom-hooks/payables/useGetPurchaseOrderBySupplierData';
// utilities
import { payablePurchaseOrderBySupplierReportHeadCells } from '../utilities/head-cells';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { endDateInput, startDateInput } from '../utilities/filter-input-list';
import { payablePurchaseOrderDetailInitialValues } from '../utilities/initial-values';
import { payablePurchaseOrderFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function PurchaseOrderBySupplier() {
  const durationInput = useGetDurationInput();

  return (
    <CustomReportDetailPage
      reportTitle="Purchase Orders By Suppliers"
      reportHeadCells={payablePurchaseOrderBySupplierReportHeadCells}
      useGetReportQuery={useGetPurchaseOrderBySupplierQuery}
      useGetReportData={useGetPurchaseOrderBySupplierData}
      customReportCustomFilter={[durationInput, startDateInput, endDateInput]}
      customReportCustomerInitialValues={payablePurchaseOrderDetailInitialValues}
      customReportInputListValidationSchema={payablePurchaseOrderFilterCustomInputsValidationSchema}
    />
  );
}

export default PurchaseOrderBySupplier;

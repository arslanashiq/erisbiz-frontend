import React, { useMemo } from 'react';
// services
import { useGetPurchaseOrderBySupplierDetailQuery } from 'services/private/reports';
// utilities
import getSearchParamsList from 'utilities/getSearchParamsList';
import useGetPurchaseOrderBySupplierDetailData from '../custom-hooks/payables/useGetPurchaseOrderBySupplierDetailData';
// utilities
import { payablePurchaseOrderBySupplierDetailReportHeadCells } from '../utilities/head-cells';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { endDateInput, startDateInput } from '../utilities/filter-input-list';
import { payablePurchaseOrderDetailInitialValues } from '../utilities/initial-values';
import { payablePurchaseOrderFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import usegetSupplierInput from '../custom-hooks/common/useGetSupplierInput';

function PurchaseOrderBySupplierDetail() {
  const { supplier_id: supplierId } = getSearchParamsList();
  const durationInput = useGetDurationInput();
  const supplierInput = usegetSupplierInput();

  const selectedSupplier = useMemo(
    () => supplierInput?.options?.find(option => option.value === Number(supplierId)),
    [supplierInput]
  );

  return (
    <CustomReportDetailPage
      reportTitle={`Purchase Orders by ${selectedSupplier?.label || ''}`}
      reportHeadCells={payablePurchaseOrderBySupplierDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseOrderBySupplierDetailQuery}
      useGetReportData={useGetPurchaseOrderBySupplierDetailData}
      customReportCustomFilter={[durationInput, startDateInput, endDateInput]}
      customReportCustomerInitialValues={payablePurchaseOrderDetailInitialValues}
      customReportInputListValidationSchema={payablePurchaseOrderFilterCustomInputsValidationSchema}
    />
  );
}

export default PurchaseOrderBySupplierDetail;

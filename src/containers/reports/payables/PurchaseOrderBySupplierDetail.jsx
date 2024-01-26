import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
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
  const location = useLocation();
  const { supplier_id: supplierId } = getSearchParamsList(location);

  const durationInput = useGetDurationInput();
  const supplierInput = usegetSupplierInput();

  const reportTitle = useMemo(() => {
    let title = 'Purchase Orders';
    if (supplierInput?.options && supplierId) {
      const selectedSupplier = supplierInput?.options?.find(option => option.value === Number(supplierId));
      title = `${title} by ${selectedSupplier?.label || ''}`;
    }
    return title;
  }, [supplierInput, supplierId]);
  return (
    <CustomReportDetailPage
      reportTitle={reportTitle}
      reportHeadCells={payablePurchaseOrderBySupplierDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseOrderBySupplierDetailQuery}
      useGetReportData={useGetPurchaseOrderBySupplierDetailData}
      customReportCustomFilter={[durationInput, startDateInput, endDateInput, supplierInput]}
      customReportCustomerInitialValues={payablePurchaseOrderDetailInitialValues}
      customReportInputListValidationSchema={payablePurchaseOrderFilterCustomInputsValidationSchema}
    />
  );
}

export default PurchaseOrderBySupplierDetail;

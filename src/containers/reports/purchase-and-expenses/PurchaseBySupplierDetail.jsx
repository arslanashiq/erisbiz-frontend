import React from 'react';
import { useGetPurchaseBySupplierDetailQuery } from 'services/private/reports';
import { purchaseBySupplierDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseBySupplierDetailData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseBySupplierDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function PurchaseBySupplierDetail() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Supplier"
      reportHeadCells={purchaseBySupplierDetailReportHeadCells}
      useGetReportQuery={useGetPurchaseBySupplierDetailQuery}
      useGetReportData={useGetPurchaseBySupplierDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default PurchaseBySupplierDetail;

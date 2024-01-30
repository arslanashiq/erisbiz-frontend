import React from 'react';
import { useGetPurchaseBySupplierQuery } from 'services/private/reports';
import { purchaseBySupplierReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetPurchaseBySupplierData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetPurchaseBySupplierData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function PurchaseBySupplier() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Purchases By Supplier"
      reportHeadCells={purchaseBySupplierReportHeadCells}
      useGetReportQuery={useGetPurchaseBySupplierQuery}
      useGetReportData={useGetPurchaseBySupplierData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default PurchaseBySupplier;

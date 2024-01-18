import React from 'react';
// services
import { useGetSupplierPayableBalanceQuery } from 'services/private/reports';
import { supplierPaybleBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSupplierBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBalanceData';
// components
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function SupplierBalance() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();
  return (
    <CustomReportDetailPage
      reportTitle="Supplier Balances"
      useGetReportData={useGetSupplierBalanceData}
      useGetReportQuery={useGetSupplierPayableBalanceQuery}
      reportHeadCells={supplierPaybleBalanceReportHeadCells}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default SupplierBalance;

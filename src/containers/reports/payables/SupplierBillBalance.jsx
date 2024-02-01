import React, { useMemo } from 'react';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetSupplierBillBalanceDetailQuery } from 'services/private/reports';
import useGetSupplierBillDetailBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBillDetailBalanceData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import usegetSupplierInput from '../custom-hooks/common/useGetSupplierInput';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function SupplierBillBalance() {
  const { supplier_id: supplierID } = getSearchParamsList();
  const supplierInput = usegetSupplierInput();

  const selectedSupplier = useMemo(
    () => supplierInput?.options?.find(option => option.value === Number(supplierID)),
    [supplierInput, supplierID]
  );
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle={`Balance Details for ${selectedSupplier?.label || ''}`}
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetSupplierBillBalanceDetailQuery}
      useGetReportData={useGetSupplierBillDetailBalanceData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default SupplierBillBalance;

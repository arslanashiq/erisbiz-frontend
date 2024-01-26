import React, { useMemo } from 'react';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetSupplierBillBalanceDetailQuery } from 'services/private/reports';
import useGetSupplierBillDetailBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBillDetailBalanceData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import usegetSupplierInput from '../custom-hooks/common/useGetSupplierInput';

function SupplierBillBalance() {
  const { supplier_id: supplierID } = getSearchParamsList();
  const supplierInput = usegetSupplierInput();

  const selectedSupplier = useMemo(
    () => supplierInput?.options?.find(option => option.value === Number(supplierID)),
    [supplierInput]
  );

  return (
    <CustomReportDetailPage
      reportTitle={`Balance Detail for ${selectedSupplier?.label || ''}`}
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetSupplierBillBalanceDetailQuery}
      useGetReportData={useGetSupplierBillDetailBalanceData}
    />
  );
}

export default SupplierBillBalance;

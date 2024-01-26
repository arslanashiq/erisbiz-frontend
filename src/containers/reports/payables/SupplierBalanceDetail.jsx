import React, { useMemo } from 'react';
import { useGetSupplierBalanceDetailQuery } from 'services/private/reports';
import getSearchParamsList from 'utilities/getSearchParamsList';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetSupplierBillDetailBalanceData from 'containers/reports/custom-hooks/payables/useGetSupplierBillDetailBalanceData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import usegetSupplierInput from '../custom-hooks/common/useGetSupplierInput';

function SupplierBalanceDetail() {
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
      useGetReportQuery={useGetSupplierBalanceDetailQuery}
      useGetReportData={useGetSupplierBillDetailBalanceData}
    />
  );
}

export default SupplierBalanceDetail;

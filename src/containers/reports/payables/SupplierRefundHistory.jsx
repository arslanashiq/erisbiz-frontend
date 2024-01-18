import React from 'react';
// services
import { useGetSupplierRefundHistoryQuery } from 'services/private/reports';
// containers
import { supplierRefundHistoryReportHeadCells } from 'containers/reports/utilities/head-cells';
import useSupplierRefundHistoryData from 'containers/reports/custom-hooks/payables/useSupplierRefundHistoryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function SupplierRefundHistory() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();
  return (
    <CustomReportDetailPage
      reportTitle="Supplier Refund History"
      reportHeadCells={supplierRefundHistoryReportHeadCells}
      useGetReportQuery={useGetSupplierRefundHistoryQuery}
      useGetReportData={useSupplierRefundHistoryData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default SupplierRefundHistory;

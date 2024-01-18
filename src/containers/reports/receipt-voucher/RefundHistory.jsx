import React from 'react';
import { useGetRefundHistoryReportQuery } from 'services/private/reports';
import { customerRefundReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetRefundHistoryData from 'containers/reports/custom-hooks/receipt-voucher/useGetRefundHistoryData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function RefundHistory() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Refund History"
      reportHeadCells={customerRefundReportHeadCells}
      useGetReportQuery={useGetRefundHistoryReportQuery}
      useGetReportData={useGetRefundHistoryData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default RefundHistory;

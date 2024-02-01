import React from 'react';
import { useGetReceiptVoucherReportQuery } from 'services/private/reports';
import { receiptVoucherReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceiptVoucherData from 'containers/reports/custom-hooks/receipt-voucher/useGetReceiptVoucherData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceiptVoucherReport() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Receipt Voucher"
      reportHeadCells={receiptVoucherReportHeadCells}
      useGetReportQuery={useGetReceiptVoucherReportQuery}
      useGetReportData={useGetReceiptVoucherData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceiptVoucherReport;

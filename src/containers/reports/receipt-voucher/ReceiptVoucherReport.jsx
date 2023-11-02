import React from 'react';
import { useGetReceiptVoucherReportQuery } from 'services/private/reports';
import { receiptVoucherReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceiptVoucherData from 'containers/reports/custom-hooks/receipt-voucher/useGetReceiptVoucherData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function ReceiptVoucherReport() {
  return (
    <CustomReportDetailPage
      reportTitle="Sales By Sales Person"
      reportHeadCells={receiptVoucherReportHeadCells}
      useGetReportQuery={useGetReceiptVoucherReportQuery}
      useGetReportData={useGetReceiptVoucherData}
    />
  );
}

export default ReceiptVoucherReport;

import React from 'react';
// services
import { useGetPaymentMadeDetailsQuery } from 'services/private/reports';
// containers
import useGetPaymentMadeData from 'containers/reports/custom-hooks/payables/useGetPaymentMadeData';
import { paymentMadeReportHeadCells } from 'containers/reports/utilities/head-cells';
import CustomReportDetailPage from '../components/CustomReportDetailPage';

function PaymentsMade() {
  return (
    <CustomReportDetailPage
      reportTitle="Payment Made"
      reportHeadCells={paymentMadeReportHeadCells}
      useGetReportQuery={useGetPaymentMadeDetailsQuery}
      useGetReportData={useGetPaymentMadeData}
    />
  );
}

export default PaymentsMade;

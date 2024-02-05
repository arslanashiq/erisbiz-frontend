import React from 'react';
// services
import { useGetPaymentMadeDetailsQuery } from 'services/private/reports';
// containers
import useGetPaymentMadeData from 'containers/reports/custom-hooks/payables/useGetPaymentMadeData';
import { paymentMadeReportHeadCells } from 'containers/reports/utilities/head-cells';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { supplierBalanceInitialValues } from '../utilities/initial-values';
import { supplierBalanceFilterCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetPayablesCustomFilterInputs from '../custom-hooks/common/useGetPayablesCustomFilterInputs';

function PaymentsMade() {
  const updatedCustomInputList = useGetPayablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Invoice wise Payments"
      reportHeadCells={paymentMadeReportHeadCells}
      useGetReportQuery={useGetPaymentMadeDetailsQuery}
      useGetReportData={useGetPaymentMadeData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={supplierBalanceInitialValues}
      customReportInputListValidationSchema={supplierBalanceFilterCustomInputsValidationSchema}
    />
  );
}

export default PaymentsMade;

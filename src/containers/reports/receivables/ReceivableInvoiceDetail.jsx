import React from 'react';
// services
import { useGetReceivableInvoiceDetailQuery } from 'services/private/reports';
// containers
import { receivableInvoiceDetailsReportHeadCells } from 'containers/reports/utilities/head-cells';

import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetInvoiceDetailData from '../custom-hooks/receivables/useGetInvoiceDetailData';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceivableInvoiceDetail() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Sales Invoice Register"
      reportHeadCells={receivableInvoiceDetailsReportHeadCells}
      useGetReportQuery={useGetReceivableInvoiceDetailQuery}
      useGetReportData={useGetInvoiceDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceivableInvoiceDetail;

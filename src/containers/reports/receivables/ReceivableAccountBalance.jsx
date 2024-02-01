import React from 'react';
// services
import { useGetReceivableAccountBalanceQuery } from 'services/private/reports';
// constainers
import { receivablesAccountBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceivableAccountBalanceData from 'containers/reports/custom-hooks/receivables/useGetReceivableAccountBalanceData';

import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';

function ReceivableAccountBalance() {
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  return (
    <CustomReportDetailPage
      reportTitle="Customer Balances"
      reportHeadCells={receivablesAccountBalanceReportHeadCells}
      useGetReportQuery={useGetReceivableAccountBalanceQuery}
      useGetReportData={useGetReceivableAccountBalanceData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceivableAccountBalance;

import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetReceivableBalanceDetailAgainstCustomerQuery } from 'services/private/reports';
import useGetBalanceDetailData from 'containers/reports/custom-hooks/receivables/useGetBalanceDetailData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetCustomerInput from '../custom-hooks/common/useGetCustomerInput';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceivableBalanceDetailAgainstCustomer() {
  const location = useLocation();
  const { customer_id: customerID } = getSearchParamsList(location);
  const customerInput = useGetCustomerInput();
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  const selectedCustomer = useMemo(
    () => customerInput?.options?.find(option => option.value === Number(customerID)),
    [customerInput]
  );
  return (
    <CustomReportDetailPage
      reportTitle={`Balance Detail for ${selectedCustomer?.label || ''}`}
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetReceivableBalanceDetailAgainstCustomerQuery}
      useGetReportData={useGetBalanceDetailData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceivableBalanceDetailAgainstCustomer;

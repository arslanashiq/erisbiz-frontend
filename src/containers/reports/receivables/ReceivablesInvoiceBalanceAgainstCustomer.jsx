import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useGetReceivableInvoiceBalanceAgainstCustomerQuery } from 'services/private/reports';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetInvoiceBalanceAgainstCustomerData from 'containers/reports/custom-hooks/receivables/useGetInvoiceBalanceAgainstCustomerData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetCustomerInput from '../custom-hooks/common/useGetCustomerInput';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceivablesInvoiceBalanceAgainstCustomer() {
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
      useGetReportQuery={useGetReceivableInvoiceBalanceAgainstCustomerQuery}
      useGetReportData={useGetInvoiceBalanceAgainstCustomerData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceivablesInvoiceBalanceAgainstCustomer;

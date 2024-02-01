import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useGetReceivableCreditNoteBalanceAgainstCustomerQuery } from 'services/private/reports';
import { receivablesInvoiceBalanceAgainstCustomerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetReceivableCreditNoteBalanceData from 'containers/reports/custom-hooks/receivables/useGetReceivableCreditNoteBalanceData';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetCustomerInput from '../custom-hooks/common/useGetCustomerInput';
import useGetReceivablesCustomFilterInputs from '../custom-hooks/common/useGetReceivablesCustomFilterInputs';
import { customerBalanceInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';

function ReceivablesCreditNoteBalanceAgainstCustomer() {
  const location = useLocation();
  const { customer_id: customerID } = getSearchParamsList(location);
  const customerInput = useGetCustomerInput();
  const updatedCustomInputList = useGetReceivablesCustomFilterInputs();

  const selectedCustomer = useMemo(
    () => customerInput?.options?.find(option => option.value === Number(customerID)),
    [customerInput, customerID]
  );
  return (
    <CustomReportDetailPage
      reportTitle={`Balance Details for ${selectedCustomer?.label || ''}`}
      reportHeadCells={receivablesInvoiceBalanceAgainstCustomerReportHeadCells}
      useGetReportQuery={useGetReceivableCreditNoteBalanceAgainstCustomerQuery}
      useGetReportData={useGetReceivableCreditNoteBalanceData}
      customReportCustomFilter={updatedCustomInputList}
      customReportCustomerInitialValues={customerBalanceInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
    />
  );
}

export default ReceivablesCreditNoteBalanceAgainstCustomer;

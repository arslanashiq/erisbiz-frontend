import { useMemo } from 'react';
import { customEndDateInput, customStartDateInput } from 'containers/reports/utilities/filter-input-list';
import useGetDurationInput from './useGetDurationInput';
import useGetCustomerInput from './useGetCustomerInput';

function useGetReceivablesCustomFilterInputs() {
  const customerInput = useGetCustomerInput();
  const durationInput = useGetDurationInput();

  const updatedPayablesSupplierBalanceCustomInputList = useMemo(
    () => [durationInput, customStartDateInput, customEndDateInput, customerInput],
    [durationInput, customerInput]
  );

  return updatedPayablesSupplierBalanceCustomInputList;
}

export default useGetReceivablesCustomFilterInputs;

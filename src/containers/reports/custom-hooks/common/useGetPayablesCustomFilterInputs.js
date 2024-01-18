import { useMemo } from 'react';
import { customEndDateInput, customStartDateInput } from 'containers/reports/utilities/filter-input-list';
import useGetDurationInput from './useGetDurationInput';
import usegetSupplierInput from './useGetSupplierInput';

function useGetPayablesCustomFilterInputs() {
  const supplierInput = usegetSupplierInput();
  const durationInput = useGetDurationInput();

  const updatedPayablesSupplierBalanceCustomInputList = useMemo(
    () => [durationInput, customStartDateInput, customEndDateInput, supplierInput],
    [durationInput, supplierInput]
  );

  return updatedPayablesSupplierBalanceCustomInputList;
}

export default useGetPayablesCustomFilterInputs;

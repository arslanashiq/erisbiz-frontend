import React from 'react';
import { expenseDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetExpenseDetailsQuery } from 'services/private/reports';
import useGetExpenseDetailData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetExpenseDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { expenseDetailInitialValues } from '../utilities/initial-values';
import { expenseDetailInputsValidationSchema } from '../utilities/validation-schema';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import {
  customEndDateInput,
  customStartDateInput,
  entitiesInput,
  // groupByInput,
} from '../utilities/filter-input-list';

function ExpenseDetails() {
  const durationInput = useGetDurationInput();

  return (
    <CustomReportDetailPage
      reportTitle="Expense Detail"
      reportHeadCells={expenseDetailReportHeadCells}
      useGetReportQuery={useGetExpenseDetailsQuery}
      useGetReportData={useGetExpenseDetailData}
      customReportCustomFilter={[
        durationInput,
        customStartDateInput,
        customEndDateInput,
        // groupByInput,
        entitiesInput,
      ]}
      customReportCustomerInitialValues={expenseDetailInitialValues}
      customReportInputListValidationSchema={expenseDetailInputsValidationSchema}
    />
  );
}

export default ExpenseDetails;

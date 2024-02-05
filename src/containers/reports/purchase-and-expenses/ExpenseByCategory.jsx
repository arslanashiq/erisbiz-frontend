import React from 'react';
import useGetExpenseByCategoryData from 'containers/reports/custom-hooks/purchase-and-expenses/useGetExpenseByCategoryData';
import { expenseByCategoryReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetExpenseByCategoryQuery } from 'services/private/reports';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { accountTypeInput, customEndDateInput, customStartDateInput, filterByInput } from '../utilities/filter-input-list';
import { purchaseByCategoryInitialValues } from '../utilities/initial-values';
import { expenseDetailByCategotyCustomInputsValidationSchema } from '../utilities/validation-schema';

function ExpenseByCategory() {
  const durationInput = useGetDurationInput();
  return (
    <CustomReportDetailPage
      reportTitle="Expense Detail By Category"
      reportHeadCells={expenseByCategoryReportHeadCells}
      useGetReportQuery={useGetExpenseByCategoryQuery}
      useGetReportData={useGetExpenseByCategoryData}
      customReportCustomFilter={[
        durationInput,
        customStartDateInput,
        customEndDateInput,
        filterByInput,
        accountTypeInput,
      ]}
      customReportCustomerInitialValues={purchaseByCategoryInitialValues}
      customReportInputListValidationSchema={expenseDetailByCategotyCustomInputsValidationSchema}
    />
  );
}

export default ExpenseByCategory;

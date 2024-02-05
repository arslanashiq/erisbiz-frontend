import React from 'react';
import { receivablesDetailReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useGetReceivableDetailQuery } from 'services/private/reports';
import useGetReceivablesDetailData from 'containers/reports/custom-hooks/receivables/useGetReceivablesDetailData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import { receivableDetailInitialValues } from '../utilities/initial-values';
import { customerbalanceCustomInputsValidationSchema } from '../utilities/validation-schema';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import useGetCustomerInput from '../custom-hooks/common/useGetCustomerInput';
import useGetItemInput from '../custom-hooks/common/useGetItemInput';
import { CustomFilterForReportParams } from '../utilities/custom-filter-for-report';

function ReceivableDetails() {
  const durationInput = useGetDurationInput();
  const itemInput = useGetItemInput();
  const customerInput = useGetCustomerInput();

  return (
    <CustomReportDetailPage
      reportTitle="Receivable Detail"
      reportHeadCells={receivablesDetailReportHeadCells}
      useGetReportQuery={useGetReceivableDetailQuery}
      useGetReportData={useGetReceivablesDetailData}
      customReportCustomFilter={[
        durationInput,
        customStartDateInput,
        customEndDateInput,
        itemInput,
        customerInput,
      ]}
      customReportCustomerInitialValues={receivableDetailInitialValues}
      customReportInputListValidationSchema={customerbalanceCustomInputsValidationSchema}
      paramsFilter={CustomFilterForReportParams}
    />
  );
}

export default ReceivableDetails;

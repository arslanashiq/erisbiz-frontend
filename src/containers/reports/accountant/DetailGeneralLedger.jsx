import React from 'react';
import { useGetDetailGeneralLedgerQuery } from 'services/private/reports';
import { detailGeneralLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetDetailGeneralLedgerData from 'containers/reports/custom-hooks/accountant/useGetDetailGeneralLedgerData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import { customDuration } from '../utilities/initial-values';
import { activityLogsFilterCustomInputsValidationSchema } from '../utilities/validation-schema';

function DetailGeneralLedger() {
  const durationInput = useGetDurationInput();

  return (
    <CustomReportDetailPage
      reportTitle="Detail General Ledger"
      reportHeadCells={detailGeneralLedgerReportHeadCells}
      useGetReportQuery={useGetDetailGeneralLedgerQuery}
      useGetReportData={useGetDetailGeneralLedgerData}
      customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput]}
      customReportCustomerInitialValues={customDuration}
      customReportInputListValidationSchema={activityLogsFilterCustomInputsValidationSchema}
    />
  );
}

export default DetailGeneralLedger;

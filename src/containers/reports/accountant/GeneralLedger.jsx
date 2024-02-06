import React from 'react';
import { useGetGeneralLedgerQuery } from 'services/private/reports';
import { generalLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import useGetGeneralLedgerData from 'containers/reports/custom-hooks/accountant/useGetGeneralLedgerData';
import CustomReportDetailPage from '../components/CustomReportDetailPage';
import useGetDurationInput from '../custom-hooks/common/useGetDurationInput';
import useGetChartOfAccountTypeInput from '../custom-hooks/common/useGetChartOfAccountTypeInput';
import { customEndDateInput, customStartDateInput } from '../utilities/filter-input-list';
import { generalLedgerInitialValues } from '../utilities/initial-values';
import { generalLedgerCustomInputsValidationSchema } from '../utilities/validation-schema';

function GeneralLedger() {
  const durtionInput = useGetDurationInput();
  const chartOfAccountTypeInput = useGetChartOfAccountTypeInput();
  return (
    <CustomReportDetailPage
      reportTitle="General Ledger"
      reportHeadCells={generalLedgerReportHeadCells}
      useGetReportQuery={useGetGeneralLedgerQuery}
      useGetReportData={useGetGeneralLedgerData}
      customReportCustomFilter={[
        durtionInput,
        customStartDateInput,
        customEndDateInput,
        chartOfAccountTypeInput,
      ]}
      customReportCustomerInitialValues={generalLedgerInitialValues}
      customReportInputListValidationSchema={generalLedgerCustomInputsValidationSchema}
      options={{
        showFilter: true,
        showCompanyInfoHeader: true,
        replaceTableBody: true,
        showPrint: true,
      }}
    />
  );
}

export default GeneralLedger;

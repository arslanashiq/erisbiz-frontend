import React from 'react';
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router';
// services
import { useGetTrialBalanceQuery } from 'services/private/reports';
// conainer
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { trialBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import formatAmount from 'utilities/formatAmount';
import useGetDurationInput from 'containers/reports/custom-hooks/common/useGetDurationInput';
import { customEndDateInput, customStartDateInput } from 'containers/reports/utilities/filter-input-list';
import { customDuration } from 'containers/reports/utilities/initial-values';
import { trialBalanceCustomInputsValidationSchema } from 'containers/reports/utilities/validation-schema';
import RenderTrialBalanceRow from './components/RenderTrialBalanceRow';
import CustomCollapseAbleReport from '../../components/CustomCollapseAbleReport';
import useTrialBalanceData from './custom-hooks/useTrialBalanceData';

const headerStyle = { textAlign: 'start', textTransform: 'capitalize' };
function TrialBalance() {
  const location = useLocation();
  const reportResponse = useGetTrialBalanceQuery(location.search);

  const { totalValue, tableBody, sortedResponse } = useTrialBalanceData(reportResponse);

  const durationInput = useGetDurationInput();

  return (
    <SectionLoader options={[!totalValue, reportResponse.isLoading, !sortedResponse]}>
      <CustomCollapseAbleReport
        reportResponse={reportResponse}
        reportTitle="Trial Balance"
        reportHeadCells={trialBalanceReportHeadCells}
        tableBody={tableBody}
        useGetReportQuery={useGetTrialBalanceQuery}
        customReportCustomFilter={[durationInput, customStartDateInput, customEndDateInput]}
        customReportCustomerInitialValues={customDuration}
        customReportInputListValidationSchema={trialBalanceCustomInputsValidationSchema}
      >
        {['asset', 'liability', 'income', 'expense'].map(type => (
          <tbody key={uuid()}>
            <tr>
              <td style={headerStyle}>{type}</td>
              <td colSpan={2}> </td>
            </tr>
            {sortedResponse[type]?.map(item => (
              <RenderTrialBalanceRow
                key={uuid()}
                data={item}
                padding={0}
                totalCredit={formatAmount(item?.is_debit ? 0 : item.balance)}
                totalDebit={formatAmount(item?.is_debit ? item.balance : 0)}
              />
            ))}
          </tbody>
        ))}
        <tbody>
          <tr>
            <td style={headerStyle}>Total</td>
            <td style={{ textAlign: 'end' }}>{formatAmount(totalValue?.debit)} </td>
            <td style={{ textAlign: 'end' }}>{formatAmount(totalValue?.credit)} </td>
          </tr>
        </tbody>
      </CustomCollapseAbleReport>
    </SectionLoader>
  );
}

export default TrialBalance;

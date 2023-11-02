import React from 'react';
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router';
// services
import { useGetTrialBalanceQuery } from 'services/private/reports';
// conainer
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { trialBalanceReportHeadCells } from 'containers/reports/utilities/head-cells';
import RenderTrialBalanceRow from './components/RenderTrialBalanceRow';
import CustomCollapseAbleReport from '../../components/CustomCollapseAbleReport';
import useTrialBalanceData from './custom-hooks/useTrialBalanceData';

const headerStyle = { textAlign: 'start' };
function TrialBalance() {
  const location = useLocation();
  const reportResponse = useGetTrialBalanceQuery(location.search);

  const { totalValue, tableBody, sortedResponse } = useTrialBalanceData(reportResponse);
  return (
    <SectionLoader options={[!totalValue, reportResponse.isLoading, !sortedResponse]}>
      <CustomCollapseAbleReport
        reportResponse={reportResponse}
        reportTitle="Trial Balance"
        reportHeadCells={trialBalanceReportHeadCells}
        tableBody={tableBody}
        useGetReportQuery={useGetTrialBalanceQuery}
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
                totalCredit={item?.is_debit ? 0 : item.balance}
                totalDebit={item?.is_debit ? item.balance : 0}
              />
            ))}
          </tbody>
        ))}
        <tbody>
          <tr>
            <td style={headerStyle}>Total</td>
            <td style={{ textAlign: 'end' }}>{totalValue?.debit} </td>
            <td style={{ textAlign: 'end' }}>{totalValue?.credit} </td>
          </tr>
        </tbody>
      </CustomCollapseAbleReport>
    </SectionLoader>
  );
}

export default TrialBalance;

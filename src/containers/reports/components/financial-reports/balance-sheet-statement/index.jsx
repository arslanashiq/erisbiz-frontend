import React from 'react';
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router';
// services
import { useGetBalanceSheetStatementQuery } from 'services/private/reports';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { profitAndLossStatementHeadCells } from 'containers/reports/utilities/head-cells';
import formatAmount from 'utilities/formatAmount';
import CustomCollapseAbleReport from '../../CustomCollapseAbleReport';
import RenderBalanceSheetRow from './components/RenderBalanceSheetRow';
import useBalanceSheetStatementDetailData from './custom-hook/useBalanceSheetStatementDetailData';

const headerStyle = { textAlign: 'start', border: 'none' };
function BalanceSheetStatement() {
  const location = useLocation();

  const reportResponse = useGetBalanceSheetStatementQuery(location.search);
  const { sortedResponse, totalAmount, getTotalAmount, tableBody } =
    useBalanceSheetStatementDetailData(reportResponse);
  return (
    <SectionLoader options={[totalAmount === null, !sortedResponse, reportResponse.isLoading]}>
      <CustomCollapseAbleReport
        reportTitle="Balance Sheet"
        reportHeadCells={profitAndLossStatementHeadCells}
        useGetReportQuery={useGetBalanceSheetStatementQuery}
        tableBody={tableBody}
      >
        {['asset', 'liability', 'Equity'].map(
          group => sortedResponse[group] && (
          <tbody key={uuid()}>
            {/* {console.log(sortedResponse[group], 'sortedResponse[group]')} */}
            <tr>
              <td colSpan={2} style={{ ...headerStyle, textTransform: 'capitalize' }}>
                {group}
              </td>
            </tr>
            {Object.keys(sortedResponse[group])?.map(type => (
              <SectionLoader key={uuid()} options={[!sortedResponse[group][type]]}>
                <tr>
                  <td style={{ ...headerStyle, textTransform: 'capitalize' }}>{type}</td>
                  <td style={{ ...headerStyle }} colSpan={2}>
                    {' '}
                  </td>
                </tr>
                {sortedResponse[group][type]?.map(item => (
                  <RenderBalanceSheetRow
                    key={uuid()}
                    data={item}
                    padding={0}
                    getTotalAmount={getTotalAmount}
                  />
                ))}
                <tr>
                  <td style={{ padding: 10, textAlign: 'start', textTransform: 'capitalize' }}>
                    total For {type}
                  </td>
                  <td style={{ textAlign: 'end' }}>{formatAmount(totalAmount[group][type])} </td>
                </tr>
              </SectionLoader>
            ))}
            <tr>
              <td style={{ padding: 10, textAlign: 'end', textTransform: 'capitalize' }}>
                total For {group}
              </td>
              <td style={{ textAlign: 'end' }}>{formatAmount(totalAmount[group]?.total)} </td>
            </tr>
          </tbody>
          )
        )}
        <tbody>
          <tr>
            <td style={{ textAlign: 'end' }}>Total Liabilities & Equities </td>
            <td style={{ textAlign: 'end' }}>
              {formatAmount((totalAmount?.liability?.total || 0) + (totalAmount?.Equity?.total || 0))}
            </td>
          </tr>
        </tbody>
      </CustomCollapseAbleReport>
    </SectionLoader>
  );
}

export default BalanceSheetStatement;

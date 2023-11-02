import React from 'react';
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router';
// services
import { useGetBalanceSheetStatementQuery } from 'services/private/reports';
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { profitAndLossStatementHeadCells } from 'containers/reports/utilities/head-cells';
import formatAmount from 'utilities/formatAmount';
import {
  balanceSheetTotalAmoutLabelStyle,
  balanceSheetTotalAmoutValueStyle,
  balanceSheetgroupStyle,
  balanceSheetheaderStyle,
} from 'styles/mui/container/reports/financial-reports/balance-sheet-statement';
import CustomCollapseAbleReport from '../../components/CustomCollapseAbleReport';
import RenderBalanceSheetRow from './components/RenderBalanceSheetRow';
import useBalanceSheetStatementDetailData from './custom-hook/useBalanceSheetStatementDetailData';

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
              <td colSpan={2} style={balanceSheetgroupStyle}>
                {group}
              </td>
            </tr>
            {Object.keys(sortedResponse[group])?.map(type => (
              <SectionLoader key={uuid()} options={[!sortedResponse[group][type]]}>
                <tr>
                  <td style={balanceSheetgroupStyle}>{type}</td>
                  <td style={balanceSheetheaderStyle} colSpan={2}>
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
                  <td style={balanceSheetTotalAmoutLabelStyle}>total For {type}</td>
                  <td style={balanceSheetTotalAmoutValueStyle}>
                    {formatAmount(totalAmount[group][type])}{' '}
                  </td>
                </tr>
              </SectionLoader>
            ))}
            <tr>
              <td style={balanceSheetTotalAmoutLabelStyle}>total For {group}</td>
              <td style={balanceSheetTotalAmoutValueStyle}>{formatAmount(totalAmount[group]?.total)} </td>
            </tr>
          </tbody>
          )
        )}
        <tbody>
          <tr>
            <td style={balanceSheetTotalAmoutValueStyle}>Total Liabilities & Equities </td>
            <td style={balanceSheetTotalAmoutValueStyle}>
              {formatAmount((totalAmount?.liability?.total || 0) + (totalAmount?.Equity?.total || 0))}
            </td>
          </tr>
        </tbody>
      </CustomCollapseAbleReport>
    </SectionLoader>
  );
}

export default BalanceSheetStatement;

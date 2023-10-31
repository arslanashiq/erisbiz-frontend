import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { v4 as uuid } from 'uuid';
// services
import { useGetCashFlowStatementQuery } from 'services/private/reports';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { profitAndLossStatementHeadCells } from 'containers/reports/utilities/head-cells';
import formatAmount from 'utilities/formatAmount';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomCollapseAbleReport from '../../CustomCollapseAbleReport';
import useCashFlowStatementData from './custom-hooks/useCashFlowStatementData';
import RenderCashFlowStatementRow from './components/RenderCashFlowStatementRow';

const headingTitleStyle = { textAlign: 'start', border: 'none' };
const headingAmountStyle = { textAlign: 'end', border: 'none' };

function CashFlowStatement() {
  const location = useLocation();

  const reportResponse = useGetCashFlowStatementQuery(location.search);
  const { sortedResponse, getTotalAmount, tableBody, totalAmount } = useCashFlowStatementData(reportResponse);
  const { duration } = getSearchParamsList();
  return (
    <SectionLoader options={[!sortedResponse, reportResponse.isLoading]}>
      <CustomCollapseAbleReport
        reportTitle="Cash Flow Statement"
        tableBody={tableBody}
        reportHeadCells={profitAndLossStatementHeadCells}
        useGetReportQuery={useGetCashFlowStatementQuery}
      >
        <tbody>
          <tr>
            <td style={{ textAlign: 'start' }}>
              <span
                style={{
                  padding: '4px 7px',
                  height: 10,
                  width: 10,
                  backgroundColor: 'silver',
                  color: 'white',
                  borderRadius: '100%',
                  marginRight: 8,
                }}
              >
                1
              </span>
              Beginning Cash Balance{' '}
            </td>
            <td style={{ textAlign: 'end' }}>{formatAmount(totalAmount?.openingBalance)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'start', color: 'silver', padding: '15px 10px' }}>
              A. Cash Flow from Operating Activities
            </td>
          </tr>
          <tr>
            <td style={headingTitleStyle}>
              <Link
                to={`/pages/reports/profit-loss?duration=${duration}&filter_accounts=accounts_without_zero_balance`}
              >
                Net Income
              </Link>
            </td>
            <td style={headingAmountStyle}>
              {formatAmount(reportResponse?.data?.net_income?.total_balance || 0)}
            </td>
          </tr>
          <tr>
            <td style={headingTitleStyle}>
              <Link
                to={`/pages/reports/account-transactions?duration=${duration}&&chart_of_account_id=${reportResponse?.data?.payable?.COA_id}`}
              >
                Account Payable
              </Link>
            </td>
            <td style={headingAmountStyle}>
              {formatAmount(reportResponse?.data?.payable?.total_balance || 0)}
            </td>
          </tr>
          <tr>
            <td style={headingTitleStyle}>
              <Link
                to={`/pages/reports/account-transactions?duration=${duration}&&chart_of_account_id=${reportResponse?.data?.receivable?.COA_id}`}
              >
                Accounts Receivable
              </Link>
            </td>
            <td style={headingAmountStyle}>
              {formatAmount(reportResponse?.data?.receivable?.total_balance || 0)}
            </td>
          </tr>
          {sortedResponse?.operatingActivities?.map(item => (
            <RenderCashFlowStatementRow key={uuid()} data={item} padding={0} getTotalAmount={getTotalAmount} />
          ))}
          <tr>
            <td style={{ textAlign: 'start' }}>Net cash provided by Operating Activities</td>
            <td style={{ textAlign: 'end' }}>{formatAmount(totalAmount.totalOperatingCost)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'start', color: 'silver', padding: '15px 10px' }}>
              B. Cash Flow from Investing Activities
            </td>
          </tr>
          {sortedResponse?.investingActivities?.map(item => (
            <RenderCashFlowStatementRow key={uuid()} data={item} padding={0} getTotalAmount={getTotalAmount} />
          ))}
          <tr>
            <td style={{ textAlign: 'start' }}>Net cash provided by Investing Activities</td>
            <td style={{ textAlign: 'end' }}>{formatAmount(totalAmount?.totalInvestingCost)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={{ textAlign: 'start', color: 'silver', padding: '15px 10px' }}>
              C. Cash Flow from Financing Activities
            </td>
          </tr>
          {sortedResponse?.financingActivities?.map(item => (
            <RenderCashFlowStatementRow key={uuid()} data={item} padding={0} getTotalAmount={getTotalAmount} />
          ))}
          <tr>
            <td style={{ textAlign: 'start' }}>Net cash provided by Investing Activities</td>
            <td style={{ textAlign: 'end' }}>{formatAmount(totalAmount?.totalFinancingCost)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'start', padding: '25px 10px' }}>
              <span
                style={{
                  padding: '4px 7px',
                  height: 10,
                  width: 10,
                  backgroundColor: 'silver',
                  color: 'white',
                  borderRadius: '100%',
                  marginRight: 8,
                }}
              >
                2
              </span>
              Net change in cash <span style={{ color: 'silver' }}>(A)+(B)+(C)</span>
            </td>
            <td style={{ textAlign: 'end' }}>{formatAmount(totalAmount?.totalCost)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'start', padding: '25px 10px' }}>
              <span
                style={{
                  padding: '4px 7px',
                  height: 10,
                  width: 10,
                  backgroundColor: 'silver',
                  color: 'white',
                  borderRadius: '100%',
                  marginRight: 8,
                }}
              >
                2
              </span>
              Ending Cash Balance <span style={{ color: 'silver' }}>1+2</span>
            </td>
            <td style={{ textAlign: 'end' }}>
              {formatAmount((totalAmount?.totalCost || 0) + (totalAmount?.openingBalance || 0))}
            </td>
          </tr>
        </tbody>
      </CustomCollapseAbleReport>
    </SectionLoader>
  );
}

export default CashFlowStatement;

import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { v4 as uuid } from 'uuid';
// services
import { useGetCashFlowStatementQuery } from 'services/private/reports';
// containers
import SectionLoader from 'containers/common/loaders/SectionLoader';
import { profitAndLossStatementHeadCells } from 'containers/reports/utilities/head-cells';
import {
  cashFlowStatementAlphabeticCellsStyle,
  cashFlowStatementBegningCashBalanceSpanStyle,
  cashFlowStatementFooterStyles,
  cashFlowStatementheadingAmountStyle,
  cashFlowStatementheadingTitleStyle,
  tableBodyTextEnd,
  tableBodyTextSiver,
  tableBodyTextStart,
} from 'styles/mui/container/reports/financial-reports/cash-flow-statement';
import formatAmount from 'utilities/formatAmount';
import getSearchParamsList from 'utilities/getSearchParamsList';
import CustomCollapseAbleReport from '../../components/CustomCollapseAbleReport';
import useCashFlowStatementData from './custom-hooks/useCashFlowStatementData';
import RenderCashFlowStatementRow from './components/RenderCashFlowStatementRow';

function CashFlowStatement() {
  const location = useLocation();

  const reportResponse = useGetCashFlowStatementQuery(location.search);
  const { sortedResponse, getTotalAmount, tableBody, totalAmount } = useCashFlowStatementData(reportResponse);
  const { duration } = getSearchParamsList();
  return (
    <SectionLoader options={[reportResponse.isError, reportResponse.isLoading]}>
      <CustomCollapseAbleReport
        reportTitle="Cash Flow Statement"
        tableBody={tableBody}
        reportHeadCells={profitAndLossStatementHeadCells}
        useGetReportQuery={useGetCashFlowStatementQuery}
      >
        <tbody>
          <tr>
            <td style={tableBodyTextStart}>
              <span style={cashFlowStatementBegningCashBalanceSpanStyle}>1</span>
              Beginning Cash Balance{' '}
            </td>
            <td style={tableBodyTextEnd}>{formatAmount(totalAmount?.openingBalance)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={cashFlowStatementAlphabeticCellsStyle}>
              A. Cash Flow from Operating Activities
            </td>
          </tr>
          <tr>
            <td style={cashFlowStatementheadingTitleStyle}>
              <Link
                to={`/pages/reports/profit-loss?duration=${duration}&filter_accounts=accounts_without_zero_balance`}
              >
                Net Income
              </Link>
            </td>
            <td style={cashFlowStatementheadingAmountStyle}>
              {formatAmount(reportResponse?.data?.net_income?.total_balance || 0)}
            </td>
          </tr>
          <tr>
            <td style={cashFlowStatementheadingTitleStyle}>
              <Link
                to={`/pages/reports/account-transactions?duration=${duration}&&chart_of_account_id=${reportResponse?.data?.payable?.COA_id}`}
              >
                Account Payable
              </Link>
            </td>
            <td style={cashFlowStatementheadingAmountStyle}>
              {formatAmount(reportResponse?.data?.payable?.total_balance || 0)}
            </td>
          </tr>
          <tr>
            <td style={cashFlowStatementheadingTitleStyle}>
              <Link
                to={`/pages/reports/account-transactions?duration=${duration}&&chart_of_account_id=${reportResponse?.data?.receivable?.COA_id}`}
              >
                Accounts Receivable
              </Link>
            </td>
            <td style={cashFlowStatementheadingAmountStyle}>
              {formatAmount(reportResponse?.data?.receivable?.total_balance || 0)}
            </td>
          </tr>
          {sortedResponse?.operatingActivities?.map(item => (
            <RenderCashFlowStatementRow
              key={uuid()}
              data={item}
              padding={0}
              getTotalAmount={getTotalAmount}
            />
          ))}
          <tr>
            <td style={tableBodyTextStart}>Net cash provided by Operating Activities</td>
            <td style={tableBodyTextEnd}>{formatAmount(totalAmount.totalOperatingCost)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={cashFlowStatementAlphabeticCellsStyle}>
              B. Cash Flow from Investing Activities
            </td>
          </tr>
          {sortedResponse?.investingActivities?.map(item => (
            <RenderCashFlowStatementRow
              key={uuid()}
              data={item}
              padding={0}
              getTotalAmount={getTotalAmount}
            />
          ))}
          <tr>
            <td style={tableBodyTextStart}>Net cash provided by Investing Activities</td>
            <td style={tableBodyTextEnd}>{formatAmount(totalAmount?.totalInvestingCost)}</td>
          </tr>
          <tr>
            <td colSpan={2} style={cashFlowStatementAlphabeticCellsStyle}>
              C. Cash Flow from Financing Activities
            </td>
          </tr>
          {sortedResponse?.financingActivities?.map(item => (
            <RenderCashFlowStatementRow
              key={uuid()}
              data={item}
              padding={0}
              getTotalAmount={getTotalAmount}
            />
          ))}
          <tr>
            <td style={tableBodyTextStart}>Net cash provided by Investing Activities</td>
            <td style={tableBodyTextEnd}>{formatAmount(totalAmount?.totalFinancingCost)}</td>
          </tr>
          <tr>
            <td style={cashFlowStatementFooterStyles}>
              <span style={cashFlowStatementBegningCashBalanceSpanStyle}>2</span>
              Net change in cash <span style={tableBodyTextSiver}>(A)+(B)+(C)</span>
            </td>
            <td style={tableBodyTextEnd}>{formatAmount(totalAmount?.totalCost)}</td>
          </tr>
          <tr>
            <td style={cashFlowStatementFooterStyles}>
              <span style={cashFlowStatementBegningCashBalanceSpanStyle}>2</span>
              Ending Cash Balance <span style={tableBodyTextSiver}>1+2</span>
            </td>
            <td style={tableBodyTextEnd}>
              {formatAmount((totalAmount?.totalCost || 0) + (totalAmount?.openingBalance || 0))}
            </td>
          </tr>
        </tbody>
      </CustomCollapseAbleReport>
    </SectionLoader>
  );
}

export default CashFlowStatement;

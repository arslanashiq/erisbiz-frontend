import { useMemo } from 'react';
import transformDataInNestedStructure from 'containers/accounting/finance/chart-of-account/utilities/transformDataInNestedStructure';
import getSorting from 'utilities/getSorting';
import { getSpaces } from 'utilities/constants';
import {
  tableCellChartOfAccountType,
  tableCellChartOfAccountTypeGreen,
} from 'styles/components/custom-hooks/use-excel-sheet';
import formatAmount from 'utilities/formatAmount';

const operatingActivitiesFilters = ['Other Current Asset', 'Other Current Liability'];

const investingActivitiesFilters = ['Other Asset', 'Fixed Asset', 'Payment Clearing', 'Stock'];

const financingActivitiesFilters = ['Long Term Liability', 'Other Liability', 'Equity'];

function useCashFlowStatementData(reportResponse) {
  const getTotalAmount = (childAccountsList, initTotal = 0) => childAccountsList?.reduce((acc, val) => {
    let value = 0;
    if (val?.child_accounts?.length > 0) {
      value = getTotalAmount(val.child_accounts, initTotal);
    }
    value += acc + val.date_range_balance;
    return value;
  }, initTotal);
  const getDataByListType = (hirericalResponse, filterList) => (hirericalResponse
    ? hirericalResponse
      .filter(item => filterList.includes(item.type))
      .sort(getSorting('desc', 'name'))
      .map(item => item)
    : []);
  const getBodyByType = (data, padding) => {
    let tableBody = [];

    if (!data) return [];
    data?.forEach(item => {
      tableBody.push([
        {
          value: getSpaces(padding) + item.name,
          style: { paddingLeft: padding * 20, textAlign: 'start' },
        },

        {
          value: item.date_range_balance,
        },
      ]);
      if (item?.child_accounts?.length > 0) {
        tableBody = [...tableBody, ...getBodyByType(item.child_accounts, padding + 1)];
        const total = getTotalAmount(item.child_accounts, item.date_range_balance);
        tableBody.push([
          {
            value: `${getSpaces(padding + 1)}Total for ${item.name}`,
            style: { textAlign: 'start', color: 'red', paddingLeft: padding + 1 * 20, fontWeight: 'bold' },
          },

          {
            value: total,
            style: { color: 'red' },
          },
        ]);
      }
    });

    return tableBody;
  };
  const {
    sortedResponse,
    totalAmount,
    tableBody: body,
  } = useMemo(() => {
    if (!reportResponse?.data?.data) {
      return {
        finalSortedResponse: {},
        totalAmount: {},
      };
    }
    const hirericalResponse = transformDataInNestedStructure(reportResponse?.data?.data, 'id');
    const operatingActivities = getDataByListType(hirericalResponse, operatingActivitiesFilters);
    const investingActivities = getDataByListType(hirericalResponse, investingActivitiesFilters);
    const financingActivities = getDataByListType(hirericalResponse, financingActivitiesFilters);
    const openingBalance = reportResponse?.data?.beginning_cash_balance?.total_balance;
    const totalOperatingCost =
      getTotalAmount(operatingActivities, 0) +
      (reportResponse?.data?.receivable?.total_balance || 0) +
      (reportResponse?.data?.payable?.total_balance || 0) +
      (reportResponse?.data?.net_income?.total_balance || 0);

    const totalInvestingCost = getTotalAmount(investingActivities, 0);
    const totalFinancingCost = getTotalAmount(financingActivities, 0);
    const totalCost = totalOperatingCost + totalInvestingCost + totalFinancingCost;
    let tableBody = [];
    tableBody.push([
      {
        value: '1. Beginning Cash Balance',
        style: { textAlign: 'start', backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
      {
        value: formatAmount(openingBalance),
        style: { backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
    ]);
    tableBody.push([
      {
        value: 'A. Cash Flow from Operating Activities',
        style: { textAlign: 'start', color: 'green' },

        excelSheetStyle: tableCellChartOfAccountTypeGreen,
      },
    ]);
    tableBody.push([
      {
        value: 'Net Income',
        style: { textAlign: 'start' },
      },
      {
        value: reportResponse?.data?.net_income?.total_balance,
      },
    ]);
    tableBody.push([
      {
        value: 'Accounts Payable ',
        style: { textAlign: 'start' },
      },
      {
        value: reportResponse?.data?.payable?.date_range_balance,
      },
    ]);
    tableBody.push([
      {
        value: 'Accounts Receivable ',
        style: { textAlign: 'start' },
      },
      {
        value: reportResponse?.receivable?.date_range_balance,
      },
    ]);

    tableBody = [...tableBody, ...getBodyByType(operatingActivities, 0)];
    tableBody.push([
      {
        value: 'Net cash provided by Operating Activities',
        style: { textAlign: 'start', backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
      {
        value: formatAmount(totalOperatingCost),

        style: { backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
    ]);
    tableBody.push([
      {
        value: 'B. Cash Flow from Investing Activities',
        style: { textAlign: 'start', color: 'green' },

        excelSheetStyle: tableCellChartOfAccountTypeGreen,
      },
    ]);
    tableBody = [...tableBody, ...getBodyByType(investingActivities, 0)];
    tableBody.push([
      {
        value: 'Net cash provided by Investing Activities',
        style: { textAlign: 'start', backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
      {
        value: formatAmount(totalInvestingCost),
        style: { backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
    ]);
    tableBody.push([
      {
        value: 'C. Cash Flow from Financing Activities',
        style: { textAlign: 'start', color: 'green' },

        excelSheetStyle: tableCellChartOfAccountTypeGreen,
      },
    ]);
    tableBody = [...tableBody, ...getBodyByType(financingActivities, 0)];
    tableBody.push([
      {
        value: 'Net cash provided by Financing Activities ',
        style: { textAlign: 'start', backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
      {
        value: formatAmount(totalFinancingCost),
        style: { backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
    ]);
    tableBody.push([
      {
        value: ' ',
        style: { textAlign: 'start' },
      },
      {
        value: '',
      },
    ]);
    tableBody.push([
      {
        value: '2. Net change in cash (A) + (B) + (C) ',
        style: { textAlign: 'start', backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
      {
        value: formatAmount(totalCost),
        style: { backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
    ]);
    tableBody.push([
      {
        value: ' ',
        style: { textAlign: 'start' },
      },
      {
        value: '',
      },
    ]);
    tableBody.push([
      {
        value: 'Ending Cash Balance 1 + 2 ',
        style: { textAlign: 'start', backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
      {
        value: formatAmount(totalCost + openingBalance),
        style: { backgroundColor: 'silver' },

        excelSheetStyle: tableCellChartOfAccountType,
      },
    ]);
    return {
      tableBody,
      sortedResponse: {
        operatingActivities,
        investingActivities,
        financingActivities,
      },
      totalAmount: { openingBalance, totalOperatingCost, totalInvestingCost, totalFinancingCost, totalCost },
    };
  }, [reportResponse]);
  return {
    tableBody: body,
    sortedResponse,
    getTotalAmount,
    totalAmount,
  };
}

export default useCashFlowStatementData;

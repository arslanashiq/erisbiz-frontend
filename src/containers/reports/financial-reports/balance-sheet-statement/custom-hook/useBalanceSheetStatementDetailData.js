import { useMemo } from 'react';
import { sortDataByType } from 'containers/reports/utilities/sort-data-by-type';
import transformDataInNestedStructure from 'containers/accounting/finance/chart-of-account/utilities/transformDataInNestedStructure';
import { getSpaces } from 'utilities/constants';

function useBalanceSheetStatementDetailData(reportResponse) {
  const getTotalAmount = (childAccountsList, initTotal = 0) => childAccountsList.reduce((acc, val) => {
    let value = 0;
    if (val?.child_accounts?.length > 0) {
      value = getTotalAmount(val.child_accounts, initTotal);
    }
    value += acc + val.date_range_balance;
    return value;
  }, initTotal);
  const getBodyByType = (data, padding) => {
    let tableBody = [];

    if (!data || data.length === 0) return [];
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
    finalSortedResponse,
    totalAmount,
    tableBody: body,
  } = useMemo(() => {
    if (!reportResponse?.data?.data) {
      return {
        finalSortedResponse: {},
        totalAmount: null,
        tableBody: [],
      };
    }
    const hirericalResponse = transformDataInNestedStructure(reportResponse?.data?.data, 'id');
    const sortedResponseByGroup = sortDataByType(hirericalResponse, 'group');
    const sortedResponse = {};
    const totalAmountForEachType = {};
    Object.keys(sortedResponseByGroup)?.forEach(key => {
      if (!totalAmountForEachType[key]) {
        totalAmountForEachType[key] = {};
      }
      totalAmountForEachType[key].total = getTotalAmount(sortedResponseByGroup[key], 0);
      sortedResponse[key] = sortDataByType(sortedResponseByGroup[key], 'type');
      Object.keys(sortedResponse[key]).forEach(type => {
        totalAmountForEachType[key][type] = getTotalAmount(sortedResponse[key][type], 0);
      });
    });
    let tableBody = [];
    ['asset', 'liability', 'Equity']?.forEach(group => {
      tableBody.push([
        {
          value: group,
          style: { textAlign: 'start', backgroundColor: 'silver' },
          excelSheetStyle: { font: { bold: true } },
        },
        {
          value: '',
          style: { textAlign: 'start', backgroundColor: 'silver' },
        },
        {
          value: '',
          style: { textAlign: 'start', backgroundColor: 'silver' },
        },
      ]);

      if (sortedResponse[group]) {
        Object.keys(sortedResponse[group])?.forEach(type => {
          tableBody.push([
            {
              value: type,
              style: { textAlign: 'start', backgroundColor: 'silver' },
              excelSheetStyle: { font: { bold: true } },
            },
            {
              value: '',
              style: { textAlign: 'start', backgroundColor: 'silver' },
            },
            {
              value: '',
              style: { textAlign: 'start', backgroundColor: 'silver' },
            },
          ]);

          tableBody = [...tableBody, ...getBodyByType(sortedResponse[group][type], 0)];
        });
      }
    });

    return {
      finalSortedResponse: sortedResponse,
      totalAmount: totalAmountForEachType,
      tableBody,
    };
  }, [reportResponse]);
  return {
    sortedResponse: finalSortedResponse,
    getTotalAmount,
    totalAmount,
    tableBody: body,
  };
}

export default useBalanceSheetStatementDetailData;

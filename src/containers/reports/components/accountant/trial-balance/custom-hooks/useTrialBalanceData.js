import transformDataInNestedStructure from 'containers/accounting/finance/chart-of-account/utilities/transformDataInNestedStructure';
import { sortDataByType } from 'containers/reports/utilities/sort-data-by-type';
import { useMemo } from 'react';
import { getSpaces } from 'utilities/constants';

function useTrialBalanceData(reportResponse) {
  const initTotal = {
    debit: 0,
    credit: 0,
  };
  const getTotalAmount = data => (data
    ? data.reduce(
      (acc, val) => {
        if (val?.child_accounts?.length > 0) {
          const value = getTotalAmount(val.child_accounts);
          acc.debit += value.debit;
          acc.credit += value.credit;
        }
        acc.debit += val.is_debit ? Math.round(val.balance) : 0;
        acc.credit += val.is_debit ? 0 : Math.round(val.balance);
        return acc;
      },
      { ...initTotal }
    )
    : initTotal);

  const getBodyByType = (data, padding) => {
    let tableBody = [];
    data?.forEach(item => {
      tableBody.push([
        {
          value: getSpaces(padding) + item.chart_of_account,
          style: { paddingLeft: padding * 20, textAlign: 'start' },
        },
        {
          value: item.is_debit ? item.balance : '',
        },
        {
          value: item?.is_debit ? '' : item.balance,
        },
      ]);
      if (item?.child_accounts?.length > 0) {
        tableBody = [...tableBody, ...getBodyByType(item.child_accounts, padding + 1)];
        const total = getTotalAmount(item.child_accounts);
        tableBody.push([
          {
            value: `${getSpaces(padding + 1)}Total for ${item.chart_of_account}`,
            style: { textAlign: 'start', color: 'red', paddingLeft: padding + 1 * 20, fontWeight: 'bold' },
          },
          {
            value: item.is_debit ? item.balance + total.debit : total.debit,
            style: { color: 'red' },
          },
          {
            value: item.is_debit ? total.credit : item.balance + total.credit,
            style: { color: 'red' },
          },
        ]);
      }
    });

    return tableBody;
  };

  const {
    totalValue: total,
    tableBody: body,
    sortedResponse: response,
  } = useMemo(() => {
    const totalValue = getTotalAmount(reportResponse?.data?.data);
    const hirericalResponse = transformDataInNestedStructure(
      reportResponse?.data?.data,
      'chart_of_account_id'
    );
    const sortedResponse = sortDataByType(hirericalResponse);
    let tableBody = [];
    ['asset', 'liability', 'income', 'expense']?.forEach(key => {
      tableBody.push([
        {
          value: key,
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
      tableBody = [...tableBody, ...getBodyByType(sortedResponse[key], 0)];
    });
    return { totalValue, sortedResponse, tableBody };
  }, [reportResponse]);
  return {
    tableBody: body,
    totalValue: total,
    sortedResponse: response,
  };
}

export default useTrialBalanceData;

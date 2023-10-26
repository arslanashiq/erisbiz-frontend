/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable indent */

import { useMemo } from 'react';

import { generalLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import transformDataInNestedStructure from 'containers/accounting/finance/chart-of-account/utilities/transformDataInNestedStructure';
import { sortDataByType } from 'containers/reports/utilities/sort-data-by-type';

function useGetTrialBalanceData(trialBalanceResponse) {
  const { tableBody } = useMemo(() => {
    const body = [];
    if (!trialBalanceResponse?.data?.data) return { tableBody: body };
    const formatedResponse = transformDataInNestedStructure(
      trialBalanceResponse?.data?.data,
      'chart_of_account_id'
    );

    const sortedResponse = sortDataByType(formatedResponse);
    console.log(sortedResponse.asset, 'sortedResponse');

    sortedResponse.asset.forEach(item => {
      body.push([{ value: item.chart_of_account }]);
    });

    return { tableBody: body };
  }, [trialBalanceResponse]);

  return {
    modifiedTableHead: generalLedgerReportHeadCells,
    tableBody,
    modifiedTableBody: [],
    tableFooter: [],
  };
}

export default useGetTrialBalanceData;

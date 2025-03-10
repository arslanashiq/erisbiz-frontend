/* eslint-disable react/jsx-filename-extension */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { generalLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import transformDataInNestedStructure from 'containers/accounting/finance/chart-of-account/utilities/transformDataInNestedStructure';
import { sortDataByType } from 'containers/reports/utilities/sort-data-by-type';
import { Stack } from '@mui/material';
import formatAmount from 'utilities/formatAmount';

function RenderItemCell({ item }) {
  const { chitd_account: childAccounts, collapse, chart_of_account: chartOfAccount } = item;
  return (
    <Stack direction="row" alignItems="center">
      {childAccounts && collapse && <IndeterminateCheckBoxIcon sx={{ fontSize: 20, cursor: 'pointer' }} />}

      {childAccounts && !collapse && <AddBoxIcon sx={{ fontSize: 20, cursor: 'pointer' }} />}

      {chartOfAccount}
    </Stack>
  );
}
RenderItemCell.propTypes = {
  item: PropTypes.object.isRequired,
};
function useGetTrialBalanceData(trialBalanceResponse) {
  const [finalSortedData, setFinalSortedData] = useState({});
  const handleChanage = child => {
    setFinalSortedData({ ...finalSortedData, asset: child });
  };
  const { tableBody } = useMemo(() => {
    const body = [];
    if (!trialBalanceResponse?.data?.data) return { tableBody: body };
    const formatedResponse = transformDataInNestedStructure(
      trialBalanceResponse?.data?.data,
      'chart_of_account_id'
    );

    const sortedData = sortDataByType(formatedResponse);
    if (Object.keys(finalSortedData).length === 0) {
      setFinalSortedData(sortedData);
      return {
        tableBody: body,
      };
    }

    finalSortedData?.asset?.forEach(item => {
      body.push([
        {
          value: <RenderItemCell item={item} handleChanageData={handleChanage} />,
          style: {
            textAlign: 'start',
          },
        },
        {
          value: formatAmount(item.is_debit ? item.balance : 0),
        },
        {
          value: formatAmount(item.is_debit ? 0 : item.balance),
        },
      ]);
    });

    return { tableBody: body };
  }, [trialBalanceResponse, finalSortedData]);

  return {
    modifiedTableHead: generalLedgerReportHeadCells,
    tableBody,
    modifiedTableBody: [],
    tableFooter: [],
  };
}

export default useGetTrialBalanceData;

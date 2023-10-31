/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useMemo, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { generalLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import transformDataInNestedStructure from 'containers/accounting/finance/chart-of-account/utilities/transformDataInNestedStructure';
import { sortDataByType } from 'containers/reports/utilities/sort-data-by-type';
import { Stack } from '@mui/material';

function RenderItemCell({ item }) {
  return (
    <Stack direction="row" alignItems="center">
      {item.child_account && item.collapse && (
        <IndeterminateCheckBoxIcon sx={{ fontSize: 20, cursor: 'pointer' }} />
      )}

      {item.child_account && !item.collapse && <AddBoxIcon sx={{ fontSize: 20, cursor: 'pointer' }} />}

      {item?.chart_of_account}
    </Stack>
  );
}
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
      console.log(item, 'djkslaaksdlksa');
      body.push([
        {
          value: <RenderItemCell item={item} handleChanageData={handleChanage} />,
          style: {
            textAlign: 'start',
          },
        },
        {
          value: item.is_debit ? item.balance : '',
        },
        {
          value: item.is_debit ? '' : item.balance,
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

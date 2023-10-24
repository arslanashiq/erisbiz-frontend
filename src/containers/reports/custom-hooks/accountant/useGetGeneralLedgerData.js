/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable indent */
import React, { useEffect, useMemo, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import transformHierarchicalData from 'containers/reports/utilities/transform-hierarchical-data';
import { IconButton, Stack } from '@mui/material';
import { testData } from 'utilities/constants';
import { generalLedgerReportHeadCells } from 'containers/reports/utilities/head-cells';
import { tableCellFooter } from 'styles/components/custom-hooks/use-excel-sheet';

function useGetGeneralLedgerData(generalLedgerResponse) {
  const [formatedResponse, setFormatedResponse] = useState(null);
  const getParents = dataList => {
    let temp = [];
    dataList.forEach(item => {
      if (item.child_accounts) {
        temp.push(false);
        temp = [...temp, ...getParents(item.child_accounts)];
      }
    });
    return temp;
  };
  const getSpaces = value => {
    let spaces = '';
    for (let i = 0; i <= value; i += 1) {
      spaces += ' ';
    }
    return spaces;
  };

  const getBody = (dataList, nestedLevel) => {
    let body = [];
    let modifiedBody = [];
    let debits = 0;
    let credits = 0;
    let balance = 0;
    if (!dataList) return body;

    dataList.forEach(item => {
      debits += item?.debits || 0;
      credits += item?.credits || 0;
      balance += item?.balance || 0;
      if (item.child_accounts) {
        modifiedBody.push([
          {
            value: `${getSpaces((nestedLevel - 1) * 8)}${item?.name}`,
            style: { textAlign: 'start', paddingLeft: 20 * nestedLevel, border: 'none' },
          },
          { value: item?.debits, style: { border: 'none' } },
          { value: item?.credits, style: { border: 'none' } },
          { value: item?.balance, style: { border: 'none' } },
        ]);
        body.push([
          {
            value: (
              <Stack direction="row" alignItems="center">
                {item.collapse ? (
                  <IndeterminateCheckBoxIcon sx={{ fontSize: 20, cursor: 'pointer' }} />
                ) : (
                  <AddBoxIcon sx={{ fontSize: 20, cursor: 'pointer' }} />
                )}

                {item?.name}
              </Stack>
            ),
            style: { textAlign: 'start', paddingLeft: 20 * nestedLevel, border: 'none' },
          },
          { value: item?.debits, style: { border: 'none' } },
          { value: item?.credits, style: { border: 'none' } },
          { value: item?.balance, style: { border: 'none' } },
        ]);
        const {
          body: currentBody,
          modifiedBody: modifiedTableBody,
          totalDebits,
          totalCredits,
          totalBalance,
        } = getBody(item.child_accounts, nestedLevel + 1);
        body = [...body, ...currentBody];
        modifiedBody = [...modifiedBody, ...modifiedTableBody];
        modifiedBody.push([
          {
            value: `${getSpaces((nestedLevel - 1) * 8)}Total For ${item?.name}`,
            style: { textAlign: 'start', paddingLeft: 20 * nestedLevel + 1, fontWeight: 'bold' },
            excelSheetStyle: tableCellFooter,
          },
          { value: item.debits + totalDebits, excelSheetStyle: tableCellFooter },
          { value: item.credits + totalCredits, excelSheetStyle: tableCellFooter },
          { value: item.balance + totalBalance, excelSheetStyle: tableCellFooter },
        ]);
        body.push([
          {
            value: `Total For ${item?.name}`,
            style: { textAlign: 'start', paddingLeft: 20 * nestedLevel + 1, fontWeight: 'bold' },
          },
          { value: item.debits + totalDebits },
          { value: item.credits + totalCredits },
          { value: item.balance + totalBalance },
        ]);
      } else {
        body.push([
          { value: item?.name, style: { textAlign: 'start', paddingLeft: 20 * nestedLevel, border: 'none' } },
          { value: item?.debits, style: { border: 'none' } },
          { value: item?.credits, style: { border: 'none' } },
          { value: item?.balance, style: { border: 'none' } },
        ]);
        modifiedBody.push([
          {
            value: `${getSpaces((nestedLevel - 1) * 8)}${item?.name}`,
            style: { textAlign: 'start', paddingLeft: 20 * nestedLevel, border: 'none' },
          },
          { value: item?.debits, style: { border: 'none' } },
          { value: item?.credits, style: { border: 'none' } },
          { value: item?.balance, style: { border: 'none' } },
        ]);
      }
    });

    return {
      body,
      modifiedBody,
      totalDebits: debits,
      totalCredits: credits,
      totalBalance: balance,
    };
  };
  const { tableBody, modifiedTableBody, tableFooter } = useMemo(() => {
    let body = [];
    const footer = [];
    const response = transformHierarchicalData(generalLedgerResponse?.data?.data);
    if (generalLedgerResponse?.data?.data?.length > 0 && response.length > 0) {
      if (formatedResponse === null) {
        setFormatedResponse(response);
      }
    }

    const { body: currentBody, modifiedBody } = getBody(formatedResponse || [], 1);
    body = currentBody || [];
    return {
      tableBody: body,
      modifiedTableBody: modifiedBody,
      tableFooter: footer,
      totalAmount: 0,
    };
  }, [generalLedgerResponse, formatedResponse]);

  return {
    modifiedTableHead: generalLedgerReportHeadCells,
    tableBody,
    modifiedTableBody,
    tableFooter,
  };
}

export default useGetGeneralLedgerData;

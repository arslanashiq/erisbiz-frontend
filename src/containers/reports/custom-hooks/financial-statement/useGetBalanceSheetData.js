/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable indent */
import React, { useEffect, useMemo, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import transformHierarchicalData from 'containers/reports/utilities/transform-hierarchical-data';
import { IconButton, Stack } from '@mui/material';
import { testData } from 'utilities/constants';
import { profitAndLossStatementHeadCells } from 'containers/reports/utilities/head-cells';
import { tableCellFooter } from 'styles/components/custom-hooks/use-excel-sheet';

// helpers
const reduceDataByType = formatedData =>
  formatedData.reduce((acc, val) => {
    const value = {
      ...val,
    };

    if (acc[val.type]) {
      acc[val.type].push(value);
    } else {
      acc[val.type] = [value];
    }

    return acc;
  }, {});

function useGetBalanceSheetData(balanceSheetStatementResponse) {
  const { tableBody, modifiedTableBody } = useMemo(() => {
    const body = [];
    const modifiedBody = [];
    const balanceSheetData = balanceSheetStatementResponse?.data?.data;
    const balanceSheetTastData = testData?.data;
    if (!balanceSheetData?.length > 0) {
      return {
        tableBody: body,
        modifiedTableBody: modifiedBody,
      };
    }
    const formatedData = transformHierarchicalData(balanceSheetTastData);
    const formatedObject = reduceDataByType(formatedData);

    return {
      tableBody: body,
      modifiedTableBody: modifiedBody,
    };
  }, [balanceSheetStatementResponse]);
  return {
    modifiedTableHead: profitAndLossStatementHeadCells,
    tableBody,
    modifiedTableBody,
    tableFooter: [],
  };
}

export default useGetBalanceSheetData;

/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetTaxReturnReportData(taxReturnResponse) {
  const { tableBody } = useMemo(() => {
    const currency = 'AED';
    const body = [];
    taxReturnResponse?.data?.results.forEach(item => {
      //   currency = item.currency__symbol;
      body.push([
        {
          value: item.status,
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.tax_returns).format('MMMM YYYY'),
        },
        {
          value: moment(item.tax_returns).format(DATE_FILTER_REPORT),
        },
        {
          value: `${currency} ${item.total_tax_payable}`,
        },
        {
          value: `${currency} ${item.amount_due}`,
        },
        {
          value:
            item.status === 'filed' ? (
              ''
            ) : (
              <Tooltip title="Remove" arrow placement="top">
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ),
        },
      ]);
    });
    return {
      tableBody: body,
    };
  }, [taxReturnResponse]);

  return { tableBody, tableFooter: [] };
}

export default useGetTaxReturnReportData;

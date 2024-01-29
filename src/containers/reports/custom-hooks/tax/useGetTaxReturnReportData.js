/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DATE_FILTER_REPORT } from 'utilities/constants';
import { taxReturnReportHeadCells } from 'containers/reports/utilities/head-cells';
import { useRemoveTaxReturnMutation } from 'services/private/reports';
import formatAmount from 'utilities/formatAmount';

function useGetTaxReturnReportData(taxReturnResponse) {
  const [deleteTaxReturn] = useRemoveTaxReturnMutation();
  const { modifiedTableHead, tableBody, modifiedTableBody } = useMemo(() => {
    const header = [...taxReturnReportHeadCells];
    header.splice(header.length - 1, 1);
    const body = [];
    const modifiedBody = [];
    taxReturnResponse?.data?.results.forEach(item => {
      //   currency = item.currency__symbol;
      const temp = [
        {
          value: item.status,
          link: `${item.id}`,
        },
        {
          value: moment(item.tax_returns).format('MMMM YYYY'),
        },
        {
          value: item.filed_on ? moment(item.filed_on).format(DATE_FILTER_REPORT) : '',
        },
        {
          value: formatAmount(item.total_tax_payable),
        },
        {
          value: formatAmount(item.due_amount),
        },
      ];
      modifiedBody.push([...temp]);
      temp.push({
        value:
          item.status === 'filed' ? (
            ''
          ) : (
            <Tooltip title="Remove" arrow placement="top">
              <IconButton
                onClick={async () => {
                  await deleteTaxReturn(item.id);
                }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ),
      });
      body.push(temp);
    });
    return {
      tableBody: body,
      modifiedTableHead: header,
      modifiedTableBody: modifiedBody,
    };
  }, [taxReturnResponse]);

  return { modifiedTableHead, tableBody, modifiedTableBody, tableFooter: [] };
}

export default useGetTaxReturnReportData;

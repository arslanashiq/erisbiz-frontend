/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { DATE_FILTER_REPORT } from 'utilities/constants';

function useGetVATAuditData(reportVATAuditResponse) {
  const { tableBody } = useMemo(() => {
    const body = [];
    reportVATAuditResponse?.data?.result.forEach(item => {
      body.push([
        {
          value: moment(item.start_date).format(DATE_FILTER_REPORT),
          style: { textAlign: 'start' },
        },
        {
          value: moment(item.end_date).format(DATE_FILTER_REPORT),
        },
        {
          value: item.username,
        },
        {
          value: moment(item.created_at).format(DATE_FILTER_REPORT),
        },

        {
          value: (
            <Button size="small" variant="text">
              <DownloadIcon />
              Download
            </Button>
          ),
        },
      ]);
    });
    return {
      tableBody: body,
    };
  }, [reportVATAuditResponse]);

  return { tableBody, tableFooter: [] };
}

export default useGetVATAuditData;

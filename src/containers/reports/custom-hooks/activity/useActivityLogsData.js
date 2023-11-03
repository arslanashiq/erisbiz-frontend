/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { activityLogsExcelHeadCells } from 'containers/reports/utilities/head-cells';
import { Box } from '@mui/material';

function useActivityLogsData(activityLogsResponse) {
  const getLink = item => {
    if (item.activity_type === 'Supplier') {
      return `/pages/accounting/purchase/suppliers/${item.module_id}/detail`;
    }
    if (item.activity_type === 'Purchase Order') {
      return `/pages/accounting/purchase/purchase-orders/${item.module_id}/detail`;
    }
    if (item.activity_type === 'Bill') {
      return `/pages/accounting/purchase/purchase-invoice/${item.module_id}/detail`;
    }
    if (item.activity_type === 'Payment Made') {
      return `/pages/accounting/purchase/payment-voucher/${item.module_id}/detail`;
    }
    if (item.activity_type === 'Debit Note') {
      return `/pages/accounting/purchase/debit-notes/${item.module_id}/detail`;
    }

    if (item.activity_type === 'Customer') {
      return `/pages/accounting/sales/customers/${item.customer__id}/detail`;
    }

    if (item.activity_type === 'Invoice') {
      return `/pages/accounting/sales/sale-invoice/${item.module_id}/detail`;
    }
    return false;
  };
  const { tableBody, modifiedTableBody } = useMemo(() => {
    const body = [];
    const modifiedBody = [];
    activityLogsResponse?.data?.data.forEach(item => {
      body.push([
        {
          value: moment(item.date).format('DD MMM YYYY HH:MM'),
          style: { textAlign: 'start' },
        },
        {
          value: item.activity_type,
        },
        {
          value: getLink(item) ? (
            <>
              <Link to={getLink(item)}>{item.module_num}</Link>
              <Box>{item.description}</Box>
              <Box className="font-weight-bold">by {item.created_by}</Box>
            </>
          ) : (
            <>
              <Box>{item.module_num}</Box>
              <Box>{item.description}</Box>
              <Box className="font-weight-bold">by {item.created_by}</Box>
            </>
          ),

          style: { textAlign: 'start' },
        },
      ]);
      modifiedBody.push([
        {
          value: moment(item.date).format('DD MMM YYYY HH:MM'),
          style: { textAlign: 'start' },
        },
        {
          value: item.activity_type,
        },
        {
          value: item?.customer__sales_account_name || 'N/A',
        },
        {
          value: item.description,
          style: { textAlign: 'start' },
        },
        {
          value: item.created_by,
          style: { textAlign: 'start' },
        },
      ]);
    });
    return {
      tableBody: body,
      modifiedTableBody: modifiedBody,
    };
  }, [activityLogsResponse]);

  return {
    tableBody,
    tableFooter: [],
    modifiedTableHead: activityLogsExcelHeadCells,
    modifiedTableBody,
  };
}

export default useActivityLogsData;

/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';

function useActivityLogsData(activityLogsResponse) {
  // const getLink = item => {
  //   if (item.activity_type === 'Supplier') {
  //     return `/pages/accounting/purchase/suppliers/${item.module_id}/detail`;
  //   }
  //   if (item.activity_type === 'Purchase Order') {
  //     return `/pages/accounting/purchase/purchase-orders/${item.module_id}/detail`;
  //   }
  //   if (item.activity_type === 'Bill') {
  //     return `/pages/accounting/purchase/purchase-invoice/${item.module_id}/detail`;
  //   }
  //   if (item.activity_type === 'Payment Made') {
  //     return `/pages/accounting/purchase/payment-voucher/${item.module_id}/detail`;
  //   }
  //   if (item.activity_type === 'Debit Note') {
  //     return `/pages/accounting/purchase/debit-notes/${item.module_id}/detail`;
  //   }

  //   if (item.activity_type === 'Customer') {
  //     return `/pages/accounting/sales/customers/${item.customer__id}/detail`;
  //   }

  //   if (item.activity_type === 'Invoice') {
  //     return `/pages/accounting/sales/sale-invoice/${item.module_id}/detail`;
  //   }
  //   return false;
  // };
  // const getEndpoint = endpointValue => {
  //   let endpoint = endpointValue;
  //   try {
  //     if (endpoint?.includes('/api/')) {
  //       [, endpoint] = endpoint.split('/api/');
  //     }
  //     if (endpoint?.includes('?')) {
  //       [endpoint] = endpoint.split('?');
  //     }
  //     return endpoint;
  //   } catch (error) {
  //     return endpoint;
  //   }
  // };
  // const getMethod = item => {
  //   if (item.request_method === 'POST') {
  //     return 'Created';
  //   }

  //   if (item.request_method === 'PUT' || item.request_method === 'PATCH') {
  //     return 'Updated';
  //   }
  //   if (item.request_method === 'DELETE') {
  //     return 'Deleted';
  //   }
  //   if (item.request_method === 'GET') {
  //     return 'View';
  //   }
  //   return 'Action Performed';
  // };

  const { tableBody } = useMemo(() => {
    const body = [];
    const modifiedBody = [];
    activityLogsResponse?.data?.results.forEach(item => {
      body.push([
        {
          value: (
            <span>
              {moment(item.datetime).format('DD-MMM-YY')}
              <br />
              {moment(item.datetime).format('hh:mm A')}
            </span>
          ),
          style: {
            textAlign: 'start',
          },
        },
        {
          value: item.module_name || 'Module',
          link: `${window.location.pathname}/${item.id}`,

          style: {
            textAlign: 'start',
          },
        },

        {
          value: item?.description,
          style: {
            textAlign: 'start',
          },
        },
        {
          value: item?.user_details?.profile?.employee_name,
          style: {
            textAlign: 'start',
          },
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
  };
}

export default useActivityLogsData;

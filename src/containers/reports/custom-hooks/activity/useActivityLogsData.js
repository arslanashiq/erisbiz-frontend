/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import moment from 'moment';
import { activityLogsHeadCells } from 'containers/reports/utilities/head-cells';

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
  const getActionType = (method, module) => {
    if (module === 'Login') {
      return '';
    }
    if (method === 'POST') {
      return 'Added';
    }

    if (method === 'PUT' || method === 'PATCH') {
      return 'Updated';
    }

    if (method === 'DELETE') {
      return 'Deleted';
    }

    return 'Try';
  };
  const { tableBody, modifiedTableBody } = useMemo(() => {
    const body = [];
    const modifiedBodyForPrint = [];
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
          // value: (
          //   <span>
          //     {item.module_name} {getActionType(item.request_method, item.module_name)} By
          //     <strong> {item.user_details.profile.employee_name}</strong>
          //   </span>
          // ),
          value: item.description,
          style: {
            textAlign: 'start',
          },
        },
        // {
        //   value: item?.user_details?.profile?.employee_name,
        //   style: {
        //     textAlign: 'start',
        //   },
        // },
      ]);
      modifiedBodyForPrint.push([
        {
          value: `${moment(item.datetime).format('DD-MMM-YY')} \n${moment(item.datetime).format('hh:mm A')}`,
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
          value: `${item.module_name} ${getActionType(item.request_method, item.module_name)} By User ${
            item.user_details.profile.employee_name
          }`,

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
      modifiedTableBody: modifiedBodyForPrint,
    };
  }, [activityLogsResponse]);

  return {
    tableBody,
    tableFooter: [],
    modifiedTableBody,
    modifiedTableHead: activityLogsHeadCells,
  };
}

export default useActivityLogsData;

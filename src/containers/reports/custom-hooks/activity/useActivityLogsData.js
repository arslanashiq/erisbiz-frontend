import { useMemo } from 'react';
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
  const getEndpoint = endpointValue => {
    let endpoint = endpointValue;
    try {
      if (endpoint?.includes('/api/')) {
        [, endpoint] = endpoint.split('/api/');
      }
      if (endpoint?.includes('?')) {
        [endpoint] = endpoint.split('?');
      }
      return endpoint;
    } catch (error) {
      return endpoint;
    }
  };
  const { tableBody } = useMemo(() => {
    const body = [];
    const modifiedBody = [];
    activityLogsResponse?.data?.results.forEach(item => {
      body.push([
        {
          value: moment(item.datetime).format('DD-MMM-YY hh:mm A'),
          style: { textAlign: 'start' },
        },
        {
          value: getEndpoint(item.request_url),
          link: `${window.location.pathname}/${item.id}`,

          style: { textAlign: 'start', textTransform: 'lowercase' },
        },
        {
          value: item.request_method,
          style: { textAlign: 'start' },
        },
        {
          value: item.response_code,
          style: { textAlign: 'start' },
        },

        // {
        //   value: item.user,
        //   style: { textAlign: 'start' },
        // },
        // {
        //   value: 'Detail',
        //   link: `${window.location.pathname}/${item.id}`,
        //   style: { textAlign: 'start' },
        // },
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

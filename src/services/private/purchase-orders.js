import { privateApi } from './index';

const purchaseOrdersApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPurchaseOrdersList: builder.query({
      query: (params = {}) => ({
        url: '/api/accounting/purchases/list/purOrder',
        method: 'GET',
        params: {
          offset: params.offset,
          limit: params.limit,
        },
      }),
    }),
    getLatestPurchaseOrderNumber: builder.query({
      query: () => ({
        url: 'api/accounting/purchases/purOrders/latest',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetPurchaseOrdersListQuery, useGetLatestPurchaseOrderNumberQuery } = purchaseOrdersApi;

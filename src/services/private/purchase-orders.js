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
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetPurchaseOrdersListQuery } = purchaseOrdersApi;

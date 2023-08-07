import { privateApi } from './index';

const suppliersApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getSuppliersList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/purchases/list/suppliers',
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
export const { useGetSuppliersListQuery } = suppliersApi;

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
    editSupplier: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/suppliers/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    getSingleSupplier: builder.query({
      query: id => ({
        url: `api/accounting/purchases/suppliers/${id}/`,
        method: 'GET',
      }),
    }),
    getSupplierTransactions: builder.query({
      query: ({ id }) => ({
        url: `api/accounting/purchase/supplier/${id}/transaction`,
        method: 'GET',
        // params: {
        //   offset: params.offset,
        //   limit: params.limit,
        // },
      }),
    }),
    addSupplier: builder.mutation({
      query: payload => ({
        url: 'api/accounting/purchases/suppliers/',
        method: 'POST',
        body: payload,
      }),
    }),
    getLatestTransactionNumber: builder.query({
      query: () => ({
        url: 'api/accounting/purchases/suppliers/latest',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSuppliersListQuery,
  useEditSupplierMutation,
  useGetSupplierTransactionsQuery,
  useGetSingleSupplierQuery,
  useAddSupplierMutation,
  useGetLatestTransactionNumberQuery,
} = suppliersApi;

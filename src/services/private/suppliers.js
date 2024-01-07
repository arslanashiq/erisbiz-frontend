import { privateApi } from './index';

const suppliersApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getSuppliersList: builder.query({
      query: params => ({
        url: 'api/accounting/purchases/suppliers/',
        method: 'GET',
        params,
      }),
      providesTags: ['getSuppliersList'],
    }),
    getSingleSupplier: builder.query({
      query: id => ({
        url: `api/accounting/purchases/suppliers/${id}/`,
        method: 'GET',
      }),
      invalidatesTags: ['getSuppliersList'],
      providesTags: ['getSingleSupplier'],
    }),
    addSupplier: builder.mutation({
      query: payload => ({
        url: 'api/accounting/purchases/suppliers/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSuppliersList', 'getSupplierPayableBalance', 'getSupplierTransactions'],
    }),
    editSupplier: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/suppliers/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleSupplier', 'getSuppliersList', 'getSupplierTransactions'],
    }),
    deleteSupplier: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/suppliers/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'getSingleSupplier',
        'getSuppliersList',
        'getSupplierPayableBalance',
        'getSupplierTransactions',
      ],
    }),
    getSupplierTransactions: builder.query({
      query: ({ id }) => ({
        url: `api/accounting/purchase/supplier/${id}/transaction`,
        method: 'GET',
      }),
      providesTags: ['getSupplierTransactions'],
    }),
    getLatestTransactionNumber: builder.query({
      query: () => ({
        url: 'api/accounting/purchases/suppliers/latest',
        method: 'GET',
      }),
    }),
    getSupplierStatement: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/purchase/supplier/${id}/statement`,
        method: 'GET',
        params,
      }),
    }),
    getSupplierComments: builder.query({
      query: id => ({
        url: `api/accounting/purchase/supplier/${id}/comments`,
        method: 'GET',
      }),
      providesTags: ['getSupplierComments'],
    }),
    addSupplierComment: builder.mutation({
      query: payload => ({
        url: 'api/accounting/purchase/SupplierComments/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSupplierComments'],
    }),
    deleteSupplierComment: builder.mutation({
      query: id => ({
        url: `api/accounting/purchase/SupplierComments/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSupplierComments'],
    }),
    addSupplierContact: builder.mutation({
      query: payload => ({
        url: 'api/accounting/purchases/suppliers/contacts/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSingleSupplier'],
    }),
    getSupplierSingleContact: builder.query({
      query: id => ({
        url: `api/accounting/purchases/suppliers/contacts/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSupplierSingleContact'],
    }),
    editSupplierContact: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/suppliers/contacts/${id}/`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['getSupplierSingleContact', 'getSingleSupplier'],
    }),
    getSupplierActivityLogs: builder.query({
      query: id => ({
        url: `api/accounting/purchase/supplier/${id}/activityLog`,
        method: 'GET',
      }),
    }),
    getSupplierIncome: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/purchase/supplier/${id}/income`,
        method: 'GET',
        params: {
          duration: params.duration,
          type: 'accrual',
        },
      }),
    }),
    getSuppliersUpaidBillsList: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/suppliers/${id}/unpaidBills`,
        method: 'GET',
      }),
    }),

    getSupplierUnusedCreditDetails: builder.query({
      query: id => ({
        url: `api/accounting/purchases/suppliers/${id}/paymentsVoucher`,
        method: 'GET',
      }),
      providesTags: ['getSupplierUnusedCreditDetails'],
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
  useGetSupplierStatementQuery,
  useGetSupplierCommentsQuery,
  useAddSupplierCommentMutation,
  useDeleteSupplierCommentMutation,
  useAddSupplierContactMutation,
  useEditSupplierContactMutation,
  useGetSupplierSingleContactQuery,
  useGetSupplierActivityLogsQuery,
  useGetSupplierIncomeQuery,
  useDeleteSupplierMutation,
  useGetSuppliersUpaidBillsListMutation,
  useGetSupplierUnusedCreditDetailsQuery,
} = suppliersApi;

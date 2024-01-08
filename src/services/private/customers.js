import { privateApi } from './index';

const customersApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getCustomersList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/company/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getCustomersList'],
    }),
    getSingleCustomer: builder.query({
      query: id => ({
        url: `api/accounting/sales/company/${id}/`,
      }),
      providesTags: ['getSingleCustomer'],
    }),
    addCustomer: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/company/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSingleCustomer', 'getCustomersList', 'getCustomerTransactions'],
    }),
    editCustomer: builder.mutation({
      query: ({ payload, id }) => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getSingleCustomer',
        'getCustomersList',
        'getCustomerTransactions',
        'getCustomerUnusedAmount',
      ],
    }),
    deleteCutomer: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCustomersList', 'getCustomerTransactions'],
    }),
    addCustomerContact: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/accounts/contacts/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addCustomerContact'],
      invalidatesTags: ['getSingleCustomer', 'getCustomersList'],
    }),
    editCustomerContact: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/accounts/contacts/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      providesTags: ['editCustomerContact'],
      invalidatesTags: ['getSingleCustomer', 'getCustomersList'],
    }),
    deleteCustomerContact: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/accounts/contacts/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteCustomerContact'],
      invalidatesTags: ['getSingleCustomer', 'getCustomersList'],
    }),

    getCustomerTransactions: builder.query({
      query: ({ id }) => ({
        url: `api/accounting/sales/customer/${id}/transaction`,
        method: 'GET',
      }),
      providesTags: ['getCustomerTransactions'],
    }),

    getCustomerStatement: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/sales/salesAccount/${id}/statement?duration=today&filter_type=all`,
        method: 'GET',
        params,
      }),
      providesTags: ['getCustomerStatement'],
    }),
    getCustomerComments: builder.query({
      query: id => ({
        url: `api/accounting/sales/customer/${id}/comments`,
        method: 'GET',
      }),
      providesTags: ['getCustomerComments'],
    }),
    addCustomerComment: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/CustomerComments/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getCustomerComments'],
    }),
    deleteCustomerComment: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/CustomerComments/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCustomerComments'],
    }),

    getCustomerUnusedAmount: builder.query({
      query: id => ({
        url: `api/accounting/sales/customer/${id}/paymentsVoucher`,
        method: 'GET',
      }),
      providesTags: ['getCustomerUnusedAmount'],
    }),

    getCustomerIncomeDetail: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/sales/salesAccount/${id}/income`,
        method: 'GET',
        params: {
          ...params,
          type: 'accrual',
        },
      }),
      providesTags: ['applyPaymentToInvoice'],
    }),
    getCustomerActivityDetail: builder.query({
      query: id => ({
        url: ` api/accounting/sales/customer/${id}/activityLog`,
        method: 'GET',
      }),
      providesTags: ['getCustomerActivityDetail'],
    }),
  }),
});

export const {
  useGetCustomersListQuery,
  useGetSingleCustomerQuery,
  useAddCustomerMutation,
  useEditCustomerMutation,
  useDeleteCutomerMutation,
  useGetCustomerTransactionsQuery,
  useGetCustomerStatementQuery,
  useGetCustomerCommentsQuery,
  useAddCustomerCommentMutation,
  useDeleteCustomerCommentMutation,
  useAddCustomerContactMutation,
  useEditCustomerContactMutation,
  useDeleteCustomerContactMutation,
  useGetCustomerUnusedAmountQuery,
  useGetCustomerIncomeDetailQuery,
  useGetCustomerActivityDetailQuery,
} = customersApi;

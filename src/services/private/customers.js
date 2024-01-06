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
      invalidatesTags: ['getSingleCustomer', 'getCustomersList'],
    }),
    editCustomer: builder.mutation({
      query: ({ payload, id }) => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleCustomer', 'getCustomersList'],
    }),
    deleteCutomer: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCustomersList'],
    }),
    getCustomerTransactions: builder.query({
      query: ({ id }) => ({
        url: `api/accounting/sales/customer/${id}/transaction`,
        method: 'GET',
      }),
    }),

    getCustomerStatement: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/sales/salesAccount/${id}/statement?duration=today&filter_type=all`,
        method: 'GET',
        params,
      }),
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
} = customersApi;

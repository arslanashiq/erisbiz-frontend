import { privateApi } from './index';

const expensesApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getExpensesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/purchases/list/expenses',
        method: 'GET',
        params: {
          offset: params.offset,
          limit: params.limit,
        },
      }),
      providesTags: ['getExpensesList'],
    }),
    getSingleExpense: builder.query({
      query: id => ({
        url: `api/accounting/purchases/expenses/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleExpense'],
    }),
    addExpense: builder.mutation({
      query: payload => ({
        url: 'api/accounting/purchases/expenses/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getExpensesList', 'getSupplierTransactions', 'getLatestExpensesNumber'],
    }),
    editExpense: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/expenses/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleExpense', 'getExpensesList', 'getSupplierTransactions', 'getLatestExpensesNumber'],
    }),
    deleteExpense: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/expenses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getExpensesList', 'getSupplierTransactions', 'getLatestExpensesNumber'],
    }),
    getExpenseJournals: builder.query({
      query: id => ({
        url: `api/accounting/purchase/expense/${id}/journals`,
        method: 'GET',
      }),
    }),
    uploadExpensesDocument: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/expenses/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSingleExpense'],
    }),
    deleteExpensesDocument: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/purchases/expenses/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSingleExpense'],
    }),

    getLatestExpensesNumber: builder.query({
      query: () => ({
        url: 'api/accounting/purchases/expenses/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestExpensesNumber'],
    }),
  }),
});

export const {
  useGetExpensesListQuery,
  useGetSingleExpenseQuery,
  useAddExpenseMutation,
  useEditExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseJournalsQuery,
  useUploadExpensesDocumentMutation,
  useDeleteExpensesDocumentMutation,
  useGetLatestExpensesNumberQuery,
} = expensesApi;

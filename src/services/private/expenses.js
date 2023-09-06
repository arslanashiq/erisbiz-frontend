import { privateApi } from './index';

const expensesApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getExpensesList: builder.query({
      query: params => ({
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
      invalidatesTags: ['getExpensesList'],
    }),
    editExpense: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/expenses/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleExpense', 'getExpensesList'],
    }),
    deleteExpense: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/expenses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getExpensesList'],
    }),
    getExpenseJournals: builder.query({
      query: id => ({
        url: `api/accounting/purchase/expense/${id}/journals`,
        method: 'GET',
      }),
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
} = expensesApi;

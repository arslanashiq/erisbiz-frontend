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
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetExpensesListQuery } = expensesApi;

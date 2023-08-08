import { privateApi } from './index';

const bankingApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBankAccountsList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/accountant/bankAccounts/',
        params: {
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getBankAccountsList'],
    }),

    getSingleBankAccount: builder.query({
      query: id => ({
        url: `api/accounting/accountant/bankAccounts/${id}/`,
        method: 'GET',
      }),
    }),

    changeBankAccountStatus: builder.mutation({
      query: id => ({
        url: `api/accounting/bank/account/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['getBankAccountsList'],
    }),
    addBankAccount: builder.mutation({
      query: () => ({
        url: 'api/accounting/accountant/bankAccounts/',
        method: 'POST',
      }),
    }),
    getBankTransactions: builder.query({
      query: ({ id, params }) => ({
        url: `api/accountant/chart/of/account/report/${id}/detail`,
        method: 'GET',
        params: {
          duration: params.duration,
        },
      }),
    }),
    deleteBank: builder.mutation({
      query: id => ({
        url: `api/accounting/accountant/bankAccounts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBankAccountsListQuery,
  useGetSingleBankAccountQuery,
  useChangeBankAccountStatusMutation,
  useAddBankAccountMutation,
  useGetBankTransactionsQuery,
  useDeleteBankMutation,
} = bankingApi;

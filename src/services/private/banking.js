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
    addBankAccount: builder.mutation({
      query: payload => ({
        url: 'api/accounting/accountant/bankAccounts/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getBankAccountsList'],
    }),
    editBankAccount: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/accountant/bankAccounts/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getBankAccountsList', 'getSingleBankAccount'],
    }),

    getSingleBankAccount: builder.query({
      query: id => ({
        url: `api/accounting/accountant/bankAccounts/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleBankAccount'],
    }),

    changeBankAccountStatus: builder.mutation({
      query: id => ({
        url: `api/accounting/bank/account/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['getBankAccountsList', 'getSingleBankAccount'],
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
        url: `api/accounting/accountant/bankAccounts/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBankAccountsListQuery,
  useAddBankAccountMutation,
  useEditBankAccountMutation,
  useGetSingleBankAccountQuery,
  useChangeBankAccountStatusMutation,
  useGetBankTransactionsQuery,
  useDeleteBankMutation,
} = bankingApi;

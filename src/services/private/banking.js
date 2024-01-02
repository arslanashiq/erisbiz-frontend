import { privateApi } from './index';

const bankingApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBankAccountsList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/accountant/bankAccounts/',
        params: {
          offset: params.offset,
          limit: params.limit,
        },
      }),
      providesTags: ['getBankAccountsList'],
    }),
    getSingleBankAccount: builder.query({
      query: id => ({
        url: `api/accounting/accountant/bankAccounts/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleBankAccount'],
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
      invalidatesTags: ['getSingleBankAccount', 'getBankAccountsList'],
    }),

    changeBankAccountStatus: builder.mutation({
      query: id => ({
        url: `api/accounting/bank/account/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['getSingleBankAccount', 'getBankAccountsList'],
    }),

    getBankTransactions: builder.query({
      query: ({ id, params }) => ({
        url: `api/accountant/chart/of/account/${id}/detail`,
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
      invalidatesTags: ['getBankAccountsList'],
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

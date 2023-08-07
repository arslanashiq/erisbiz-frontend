import { privateApi } from './index';

const bankingApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBankAccountsList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/accountant/bankAccounts',
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
        url: 'api/accounting/accountant/bankAccounts',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetBankAccountsListQuery,
  useGetSingleBankAccountQuery,
  useChangeBankAccountStatusMutation,
  useAddBankAccountMutation,
} = bankingApi;

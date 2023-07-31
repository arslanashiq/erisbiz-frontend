import { privateApi } from './index';

const authApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBankAccounts: builder.query({
      query: () => 'api/accounting/accountant/bankAccounts/',
      providesTags: ['GetBankAccount'],
    }),
    changeBankAccountStatus: builder.mutation({
      query: id => ({
        url: `api/accounting/bank/account/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['GetBankAccount'],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetBankAccountsQuery, useChangeBankAccountStatusMutation } = authApi;

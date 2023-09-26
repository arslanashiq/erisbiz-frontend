import { privateApi } from './index';

const chartOfAccountApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getChartOfAccountList: builder.query({
      query: params => ({ url: '/api/accounting/accountant/list/chartOfAccounts', method: 'GET', params }),
      providesTags: ['getChartOfAccountList'],
    }),
    getSingleChartOfAccount: builder.query({
      query: id => ({ url: `api/accountant/chart/of/account/${id}/detail`, method: 'GET' }),
      providesTags: ['getSingleChartOfAccount'],
    }),
    // addJournalVoucher: builder.mutation({
    //   query: payload => ({ url: 'api/accounting/accountant/journals/', method: 'POST', body: payload }),
    //   invalidatesTags: ['getJournalVouchersList'],
    // }),
    // editJournalVoucher: builder.mutation({
    //   query: ({ id, payload }) => ({
    //     url: `api/accounting/accountant/journals/${id}/`,
    //     method: 'PATCH',
    //     body: payload,
    //   }),
    //   invalidatesTags: ['getSingleJournalVoucher', 'getJournalVouchersList'],
    // }),
    // deleteJournalVoucher: builder.mutation({
    //   query: id => ({
    //     url: `api/accounting/accountant/journals/${id}/`,
    //     method: 'DELETE',
    //   }),
    //   providesTags: ['deleteJournalVoucher'],
    //   invalidatesTags: ['getJournalVouchersList'],
    // }),
    // getLatestJournalVoucher: builder.query({
    //   query: () => ({ url: 'api/accounting/accountant/journals/latest', method: 'GET' }),
    //   invalidatesTags: ['addJournalVoucher', 'deleteJournalVoucher'],
    // }),
    // getJournalVoucherDocuments: builder.query({
    //   query: id => ({ url: `api/accounting/accountant/journals/${id}/docs`, method: 'GET' }),
    //   providesTags: ['getJournalVoucherDocuments'],
    // }),
    // uploadJournalVoucherDocuments: builder.mutation({
    //   query: ({ id, payload }) => ({
    //     url: `api/accounting/accountant/journals/${id}/uploadDoc`,
    //     method: 'POST',
    //     body: payload,
    //   }),
    //   invalidatesTags: ['getJournalVoucherDocuments'],
    // }),
    // deleteJournalVoucherDocuments: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `api/accounting/accountant/journals/docs/${id}/`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['getJournalVoucherDocuments'],
    // }),
  }),
});

export const { useGetChartOfAccountListQuery, useGetSingleChartOfAccountQuery } = chartOfAccountApi;
export const test = '';

import { privateApi } from './index';

const chartOfAccountApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getChartOfAccountList: builder.query({
      query: params => ({ url: '/api/accounting/accountant/list/chartOfAccounts', method: 'GET', params }),
      providesTags: ['getChartOfAccountList'],
    }),
    getChartOfAccountListOfAssetsAndExpense: builder.query({
      query: params => ({
        url: 'api/accounting/accountant/chartOfAccounts/asset-expense/',
        method: 'GET',
        params,
      }),
      providesTags: ['getChartOfAccountListOfAssetsAndExpense'],
    }),
    getSingleChartOfAccount: builder.query({
      query: id => ({
        url: `api/accounting/accountant/chartOfAccounts/${id}/`,
        method: 'GET',
      }),
      invalidatesTags: ['getChartOfAccountList'],

      providesTags: ['getSingleChartOfAccount'],
    }),
    getSingleChartOfAccountDetailReport: builder.query({
      query: ({ id, params }) => ({
        url: `api/accountant/chart/of/account/report/${id}/detail?duration=this+month`,
        method: 'GET',
        params,
      }),

      providesTags: ['getSingleChartOfAccountDetailReport'],
    }),

    addChartOfAccount: builder.mutation({
      query: payload => ({
        url: '/api/accounting/accountant/chartOfAccounts/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getChartOfAccountList', 'getChartOfAccountListOfAssetsAndExpense'],
    }),
    editaddChartOfAccount: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/accounting/accountant/chartOfAccounts/${id}/`,
        method: 'PATCH',
        body: payload,
      }),

      invalidatesTags: ['getChartOfAccountList', 'getSingleJournalVoucher', 'getJournalVouchersList'],
    }),
    deleteChartOfAccount: builder.mutation({
      query: id => ({
        url: `api/accounting/accountant/chartOfAccounts/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteChartOfAccount'],
      invalidatesTags: ['getChartOfAccountList', 'getChartOfAccountListOfAssetsAndExpense'],
    }),

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
    getChartOfAccountTypes: builder.query({
      query: () => ({ url: '/api/accounting/accountant/accountTypes/', method: 'GET' }),
      providesTags: ['getChartOfAccountTypes'],
    }),
    getSaleChartOfAccount: builder.query({
      query: () => ({ url: '/api/accounting/accountant/chartOfAccounts/itemSale', method: 'GET' }),
      providesTags: ['getSaleChartOfAccount'],
    }),
  }),
});

export const {
  useGetChartOfAccountListQuery,
  useGetChartOfAccountListOfAssetsAndExpenseQuery,
  useGetSingleChartOfAccountQuery,
  useAddChartOfAccountMutation,
  useEditaddChartOfAccountMutation,
  useDeleteChartOfAccountMutation,
  useGetChartOfAccountTypesQuery,
  useGetSingleChartOfAccountDetailReportQuery,
  useGetSaleChartOfAccountQuery,
} = chartOfAccountApi;
export const test = '';

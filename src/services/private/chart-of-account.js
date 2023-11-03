import { privateApi } from './index';

const chartOfAccountApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getChartOfAccountList: builder.query({
      query: params => ({ url: '/api/accounting/accountant/list/chartOfAccounts', method: 'GET', params }),
      providesTags: ['getChartOfAccountList'],
    }),
    getSingleChartOfAccount: builder.query({
      query: id => ({
        url: `api/accountant/chart/of/account/${id}/detail`,
        method: 'GET',
      }),

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
      invalidatesTags: ['getChartOfAccountList'],
    }),
    editaddChartOfAccount: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/accounting/accountant/chartOfAccounts/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleJournalVoucher', 'getJournalVouchersList'],
    }),
    deleteChartOfAccount: builder.mutation({
      query: id => ({
        url: `api/accounting/accountant/chartOfAccounts/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteChartOfAccount'],
      invalidatesTags: ['getChartOfAccountList'],
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
  }),
});

export const {
  useGetChartOfAccountListQuery,
  useGetSingleChartOfAccountQuery,
  useAddChartOfAccountMutation,
  useEditaddChartOfAccountMutation,
  useDeleteChartOfAccountMutation,
  useGetChartOfAccountTypesQuery,
  useGetSingleChartOfAccountDetailReportQuery,
} = chartOfAccountApi;
export const test = '';

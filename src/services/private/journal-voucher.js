import { privateApi } from './index';

const journalVoucher = privateApi.injectEndpoints({
  endpoints: builder => ({
    getJournalVouchersList: builder.query({
      query: params => ({ url: 'api/accounting/accountant/journals/', method: 'GET', params }),
      providesTags: ['getJournalVouchersList'],
    }),
    getSingleJournalVoucher: builder.query({
      query: id => ({ url: `api/accounting/accountant/journals/${id}/`, method: 'GET' }),
      providesTags: ['getSingleJournalVoucher'],
    }),
    addJournalVoucher: builder.mutation({
      query: payload => ({ url: 'api/accounting/accountant/journals/', method: 'POST', body: payload }),
      invalidatesTags: ['getJournalVouchersList'],
    }),
    editJournalVoucher: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/accountant/journals/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleJournalVoucher', 'getJournalVouchersList'],
    }),
    deleteJournalVoucher: builder.mutation({
      query: id => ({
        url: `api/accounting/accountant/journals/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteJournalVoucher'],
      invalidatesTags: ['getJournalVouchersList'],
    }),
    getLatestJournalVoucher: builder.query({
      query: () => ({ url: 'api/accounting/accountant/journals/latest', method: 'GET' }),
      invalidatesTags: ['addJournalVoucher', 'deleteJournalVoucher'],
    }),
    getJournalVoucherDocuments: builder.query({
      query: id => ({ url: `api/accounting/accountant/journals/${id}/docs`, method: 'GET' }),
      providesTags: ['getJournalVoucherDocuments'],
    }),
    uploadJournalVoucherDocuments: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/accountant/journals/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getJournalVoucherDocuments'],
    }),
    deleteJournalVoucherDocuments: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/accountant/journals/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getJournalVoucherDocuments'],
    }),
  }),
});

export const {
  useGetJournalVouchersListQuery,
  useGetSingleJournalVoucherQuery,
  useAddJournalVoucherMutation,
  useEditJournalVoucherMutation,
  useDeleteJournalVoucherMutation,
  useGetLatestJournalVoucherQuery,
  useGetJournalVoucherDocumentsQuery,
  useUploadJournalVoucherDocumentsMutation,
  useDeleteJournalVoucherDocumentsMutation,
} = journalVoucher;
export const test = '';

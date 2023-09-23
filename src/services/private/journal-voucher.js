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
      invalidatesTags: ['getJournalVouchersList'],
    }),
  }),
});

export const {
  useGetJournalVouchersListQuery,
  useGetSingleJournalVoucherQuery,
  useAddJournalVoucherMutation,
  useEditJournalVoucherMutation,
  useDeleteJournalVoucherMutation,
} = journalVoucher;
export const test = '';

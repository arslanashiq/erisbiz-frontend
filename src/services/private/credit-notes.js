import { privateApi } from './index';

const creditNotesApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getCreditNotesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/creditNotes/',
        method: 'GET',
        params,
      }),
      providesTags: ['getCreditNotesList'],
    }),
    getSingleCreditNote: builder.query({
      query: id => ({
        url: `api/accounting/sales/creditNotes/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleCreditNote'],
    }),
    addCreditNote: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/creditNotes/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'getCreditNotesList',
        'getSingleCreditNote',
        'getItemCreditNote',
        'getCustomerTransactions',
      ],
    }),
    editCreditNote: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/creditNotes/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getCreditNotesList',
        'getSingleCreditNote',
        'getItemCreditNote',
        'getCustomerTransactions',
      ],
    }),
    deleteCreditNote: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/creditNotes/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'getCreditNotesList',
        'getSingleCreditNote',
        'getItemCreditNote',
        'getCustomerTransactions',
      ],
    }),
    refundCreditNote: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/creditnote/amountapply',
        method: 'Post',
        body: payload,
      }),
      invalidatesTags: ['getCreditNotesList', 'getSingleCreditNote', 'getItemCreditNote'],
    }),

    getCreditNoteJournals: builder.query({
      query: id => ({
        url: `api/accounting/sales/credit/note/${id}/journals`,
        method: 'GET',
      }),
      providesTags: ['getCreditNoteJournals'],
    }),
  }),
});

export const {
  useGetCreditNotesListQuery,
  useGetSingleCreditNoteQuery,
  useAddCreditNoteMutation,
  useEditCreditNoteMutation,
  useDeleteCreditNoteMutation,
  useRefundCreditNoteMutation,
  useGetCreditNoteJournalsQuery,
} = creditNotesApi;
export const test = '';

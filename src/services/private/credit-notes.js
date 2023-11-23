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
      invalidatesTags: ['getCreditNotesList', 'getSingleCreditNote', 'getItemCreditNote'],
    }),
    editCreditNote: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/creditNotes/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getCreditNotesList', 'getSingleCreditNote', 'getItemCreditNote'],
    }),
    deleteCreditNote: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/creditNotes/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCreditNotesList', 'getSingleCreditNote', 'getItemCreditNote'],
    }),
  }),
});

export const {
  useGetCreditNotesListQuery,
  useGetSingleCreditNoteQuery,
  useAddCreditNoteMutation,
  useEditCreditNoteMutation,
  useDeleteCreditNoteMutation,
} = creditNotesApi;
export const test = '';

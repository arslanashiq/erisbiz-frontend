import { privateApi } from './index';

const creditNotesApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getCreditNotesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/list/creditNotes',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetCreditNotesListQuery } = creditNotesApi;
export const test = '';

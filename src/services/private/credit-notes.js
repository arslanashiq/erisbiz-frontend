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

// eslint-disable-next-line import/prefer-default-export
export const { useGetCreditNotesListQuery } = creditNotesApi;

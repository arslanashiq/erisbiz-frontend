import { privateApi } from './index';

const creditNotesApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getCreditNotesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/list/creditNotes',
        method: 'GET',
        params: {
          offset: params.offset,
          limit: params.limit,
        },
      }),
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetCreditNotesListQuery } = creditNotesApi;

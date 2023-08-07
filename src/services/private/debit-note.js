import { privateApi } from './index';

const debitNotesApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getSupplierCreditsList: builder.query({
      query: params => ({
        url: 'api/accounting/purchases/list/supplierCredits',
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
export const { useGetSupplierCreditsListQuery } = debitNotesApi;

import { privateApi } from './index';

const brandsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getActiveSalePersonList: builder.query({
      query: () => 'api/accounting/accountant/salesPersons/active',
      providesTags: ['getActiveSalePersonList'],
    }),
  }),
});

export const { useGetActiveSalePersonListQuery } = brandsApi;
export const test = '';

import { publicApi } from './index';

const currenctApi = publicApi.injectEndpoints({
  endpoints: builder => ({
    getCurrenciesList: builder.query({
      query: () => '/api/accounting/accountant/currencies/',
      providesTags: ['getCurrenciesListQuery'],
    }),
  }),
});

export const { useGetCurrenciesListQuery } = currenctApi;
export const test = '';

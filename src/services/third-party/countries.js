import { thirdPartyApi } from './index';

const countriesApi = thirdPartyApi.injectEndpoints({
  endpoints: builder => ({
    getAllCountriesList: builder.query({
      query: () => ({
        url: 'https://countriesnow.space/api/v0.1/countries/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllCountriesListQuery } = countriesApi;
export const test = '';

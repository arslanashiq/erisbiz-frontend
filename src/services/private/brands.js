/* eslint-disable import/prefer-default-export */
import { privateApi } from './index';

const brandsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBrandsList: builder.query({
      query: () => '/api/brands/',
      providesTags: ['getBrandsList'],
    }),
  }),
});

export const { useGetBrandsListQuery } = brandsApi;

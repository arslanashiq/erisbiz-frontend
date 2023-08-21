/* eslint-disable import/prefer-default-export */
import { privateApi } from './index';

const brandsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBrandsList: builder.query({
      query: () => '/api/brands/',
      providesTags: ['getBrandsList'],
    }),
    getSingleBrand: builder.query({
      query: id => ({ url: `/api/brands/${id}/`, method: 'GET' }),
    }),
    addBrand: builder.mutation({
      query: payload => ({ url: '/api/brands/', method: 'POST', body: payload }),
      providesTags: ['getSingleBrand'],
      invalidatesTags: ['getBrandsList'],
    }),
    editBrand: builder.mutation({
      query: ({ id, payload }) => ({ url: `/api/brands/${id}/`, method: 'PATCH', body: payload }),
      invalidatesTags: ['getBrandsList', 'getSingleBrand'],
    }),

    deleteBrand: builder.mutation({
      query: id => ({ url: `/api/brands/${id}/`, method: 'DELETE' }),
      invalidatesTags: ['getBrandsList'],
    }),
  }),
});

export const {
  useGetBrandsListQuery,
  useAddBrandMutation,
  useEditBrandMutation,
  useDeleteBrandMutation,
  useGetSingleBrandQuery,
} = brandsApi;

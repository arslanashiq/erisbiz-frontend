/* eslint-disable import/prefer-default-export */
import { privateApi } from './index';

const brandsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBrandsList: builder.query({
      query: () => '/api/brands/',
      providesTags: ['getBrandsList'],
    }),
    addBrand: builder.mutation({
      query: payload => ({ url: '/api/brands/', method: 'POST', body: payload }),
      invalidatesTags: ['getBrandsList'],
    }),
    editBrand: builder.mutation({
      query: id => ({ url: `/api/brands/${id}`, method: 'PATCH' }),
      invalidatesTags: ['getBrandsList'],
    }),

    deleteBrand: builder.mutation({
      query: id => ({ url: `/api/brands/${id}`, method: 'DELETE' }),
      invalidatesTags: ['getBrandsList'],
    }),
  }),
});

export const { useGetBrandsListQuery, useAddBrandMutation, useEditBrandMutation, useDeleteBrandMutation } =
  brandsApi;

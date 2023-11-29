import { privateApi } from './index';

const brandsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getBrandsList: builder.query({
      query: (params = {}) => ({
        url: '/api/brands/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getBrandsList'],
    }),
    getSingleBrand: builder.query({
      query: id => ({ url: `/api/brands/${id}/`, method: 'GET' }),
      providesTags: ['getSingleBrand'],
    }),
    addBrand: builder.mutation({
      query: payload => ({ url: '/api/brands/', method: 'POST', body: payload }),
      invalidatesTags: ['getBrandsList'],
    }),
    editBrand: builder.mutation({
      query: ({ id, payload }) => ({ url: `/api/brands/${id}/`, method: 'PATCH', body: payload }),
      invalidatesTags: ['getSingleBrand', 'getBrandsList'],
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

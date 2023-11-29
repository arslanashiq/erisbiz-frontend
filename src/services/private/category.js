import { privateApi } from './index';

const categoeyApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getCategoryList: builder.query({
      query: (params = {}) => ({
        url: '/api/category/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
          is_active: params.is_active,
          item_type: params.item_type,
        },
      }),
      providesTags: ['getCategoryList'],
    }),
    getSingleCategory: builder.query({
      query: id => `/api/category/${id}/`,
      providesTags: ['getSingleCategory'],
    }),
    addCategory: builder.mutation({
      query: payload => ({
        url: '/api/category/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addCategory'],
      invalidatesTags: ['getCategoryList', 'getSingleCategory'],
    }),
    editCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/category/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      providesTags: ['editCategory'],
      invalidatesTags: ['getCategoryList', 'getSingleCategory'],
    }),
    deleteCategory: builder.mutation({
      query: id => ({
        url: `/api/category/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteCategory'],
      invalidatesTags: ['getCategoryList', 'getSingleCategory'],
    }),
  }),
});

export const {
  useGetCategoryListQuery,
  useGetSingleCategoryQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoeyApi;

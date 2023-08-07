import { privateApi } from './index';

const itemApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getItemsList: builder.query({
      query: params => ({
        url: 'api/accounting/list/items',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
          is_active: params.is_active,
          item_type: params.item_type,
        },
      }),
      providesTags: ['getItemsList'],
    }),
    changeItemStatus: builder.mutation({
      query: id => ({
        url: `/api/accounting/items/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['getItemsList'],
    }),
    getSingleItem: builder.query({
      query: id => ({ url: `api/accounting/items/${id}/`, method: 'GET' }),
    }),
    deleteItem: builder.mutation({
      query: id => ({ url: `/api/accounting/items/${id}/`, method: 'DELETE' }),
      invalidatesTags: ['getItemsList'],
    }),
  }),
});

export const {
  useGetItemsListQuery,
  useChangeItemStatusMutation,
  useGetSingleItemQuery,
  useDeleteItemMutation,
} = itemApi;

import { privateApi } from './index';

const itemApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getItemsList: builder.query({
      query: () => 'api/accounting/list/items?limit=20&offset=0',
      providesTags: ['getItemsList'],
    }),
    changeItemStatus: builder.mutation({
      query: id => ({
        url: `/api/accounting/items/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['getItemsList'],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetItemsListQuery, useChangeItemStatusMutation } = itemApi;

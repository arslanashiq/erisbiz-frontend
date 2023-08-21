import { privateApi } from './index';

const customersApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getCustomersList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/list/company',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getCustomersList'],
    }),
    deleteCutomer: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['getCustomersList'],
    }),
  }),
});

export const { useGetCustomersListQuery, useDeleteCutomerMutation } = customersApi;

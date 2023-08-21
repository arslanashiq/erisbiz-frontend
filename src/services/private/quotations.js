import { privateApi } from './index';

const quotationsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getQuotationsList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/list/quotations',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getCustomersList'],
    }),
    deleteQuotation: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/quotations/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['getCustomersList'],
    }),
  }),
});

export const { useGetQuotationsListQuery, useDeleteQuotationMutation } = quotationsApi;

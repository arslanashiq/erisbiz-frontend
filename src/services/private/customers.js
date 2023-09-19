import { privateApi } from './index';

const customersApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getCustomersList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/company/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getCustomersList'],
    }),
    getSingleCustomer: builder.query({
      query: id => ({
        url: `api/accounting/sales/company/${id}/`,
      }),
      providesTags: ['getSingleCustomer'],
    }),
    addCustomer: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/company/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSingleCustomer', 'getCustomersList'],
    }),
    editCustomer: builder.mutation({
      query: ({ payload, id }) => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleCustomer', 'getCustomersList'],
    }),
    deleteCutomer: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getCustomersList'],
    }),
  }),
});

export const {
  useGetCustomersListQuery,
  useGetSingleCustomerQuery,
  useAddCustomerMutation,
  useEditCustomerMutation,
  useDeleteCutomerMutation,
} = customersApi;

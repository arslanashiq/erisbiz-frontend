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
      providesTags: ['getSingleCustomers'],
    }),
    addCustomer: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/company/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getCustomersList'],
    }),
    editCustomer: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/company/${id}/`,
        method: 'PATCH',
      }),
      invalidatesTags: ['getSingleCustomer'],
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

export const {
  useGetCustomersListQuery,
  useGetSingleCustomerQuery,
  useAddCustomerMutation,
  useEditCustomerMutation,
  useDeleteCutomerMutation,
} = customersApi;

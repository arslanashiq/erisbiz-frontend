import { privateApi } from './index';

const taxReturnApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getTaxReturnList: builder.query({
      query: (params = {}) => ({
        url: 'api/tax/return/',
        method: 'GET',
        params,
      }),
      providesTags: ['getTaxReturnList'],
    }),
    getTaxReturnPaymentsList: builder.query({
      query: (params = {}) => ({
        url: '/api/vat/return/payment/',
        method: 'GET',
        params,
      }),
      providesTags: ['getTaxReturnPaymentsList'],
    }),
    addTaxReturnPayment: builder.mutation({
      query: payload => ({
        url: 'api/vat/return/payment/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addTaxReturnPayment'],
      invalidatesTags: ['getTaxReturnPaymentsList', 'getTaxReturnList'],
    }),
    deleteTaxReturnPayment: builder.mutation({
      query: id => ({
        url: `/api/vat/return/payment/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteTaxReturnPayment'],
      invalidatesTags: ['getTaxReturnPaymentsList', 'getTaxReturnList'],
    }),
  }),
});

export const {
  useGetTaxReturnListQuery,
  useGetTaxReturnPaymentsListQuery,
  useAddTaxReturnPaymentMutation,
  useDeleteTaxReturnPaymentMutation,
} = taxReturnApi;

import { privateApi } from './index';

const PaymentVoucherApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPaymentVouchersList: builder.query({
      query: (params = {}) => ({
        url: '/api/accounting/purchases/list/paymentsMade',
        method: 'GET',
        params: {
          offset: params.offset,
          limit: params.limit,
        },
      }),
      providesTags: ['getPaymentVouchersList'],
    }),
    getSinglePaymentVoucher: builder.query({
      query: id => ({
        url: `api/accounting/purchases/paymentsMade/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSinglePaymentVoucher'],
      invalidatesTags: ['getPaymentVouchersList'],
    }),
    addPaymentVouchser: builder.mutation({
      query: payload => ({
        url: 'api/accounting/purchases/paymentsMade/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getPaymentVouchersList'],
    }),

    editPaymentVouchser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/paymentsMade/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSinglePaymentVoucher', 'getPaymentVouchersList'],
    }),
    deletePaymentVoucher: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/paymentsMade/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getPaymentVouchersList'],
    }),
    getPaymentVoucherJournals: builder.query({
      query: id => ({
        url: `api/accounting/sales/paymentsMade/${id}/journals`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetPaymentVouchersListQuery,
  useGetSinglePaymentVoucherQuery,
  useEditPaymentVouchserMutation,
  useAddPaymentVouchserMutation,
  useDeletePaymentVoucherMutation,
  useGetPaymentVoucherJournalsQuery,
} = PaymentVoucherApi;

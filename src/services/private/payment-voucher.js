import { privateApi } from './index';

const PaymentVoucherApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPaymentVouchersList: builder.query({
      query: (params = {}) => ({
        url: '/api/accounting/purchases/paymentsMade/',
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
      invalidatesTags: ['getPurchaseInvoiceList', 'getPaymentVouchersList', 'getSinglePurchaseInvoice'],
    }),

    editPaymentVouchser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/paymentsMade/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSinglePaymentVoucher', 'getPaymentVouchersList', 'getSinglePurchaseInvoice'],
    }),
    deletePaymentVoucher: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/paymentsMade/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getPurchaseInvoiceList', 'getPaymentVouchersList', 'getSinglePurchaseInvoice'],
    }),
    getPaymentVoucherJournals: builder.query({
      query: id => ({
        url: `api/accounting/sales/paymentsMade/${id}/journals`,
        method: 'GET',
      }),
    }),
    getPaymentVouchersDocuments: builder.query({
      query: id => ({
        url: `api/accounting/purchases/paymentMade/${id}/docs`,
        method: 'GET',
      }),
      providesTags: ['getPaymentVouchersDocuments'],
    }),

    uploadPaymentVoucherDocument: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/paymentMade/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getPaymentVouchersDocuments'],
    }),
    deletePaymentVoucherDocument: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/paymentMade/docs/${id}/`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['getPaymentVouchersDocuments'],
    }),
    refundPaymentVoucher: builder.mutation({
      query: payload => ({
        url: 'api/purchas/payment/refund',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['refundPaymentVoucher'],
      invalidatesTags: ['getSinglePaymentVoucher'],
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
  useGetPaymentVouchersDocumentsQuery,
  useUploadPaymentVoucherDocumentMutation,
  useDeletePaymentVoucherDocumentMutation,
  useRefundPaymentVoucherMutation,
} = PaymentVoucherApi;

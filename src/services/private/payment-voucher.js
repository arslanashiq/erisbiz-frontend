import { privateApi } from './index';

const PaymentVoucherApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPaymentVouchersList: builder.query({
      query: params => ({
        url: '/api/accounting/purchases/paymentsMade/',
        method: 'GET',
        params,
      }),
      providesTags: ['getPaymentVouchersList'],
    }),
    getLatestPaymentVouchersNumt: builder.query({
      query: params => ({
        url: '/api/accounting/purchases/paymentsMade/latest',
        method: 'GET',
        params,
      }),
      providesTags: ['getLatestPaymentVouchersNumt'],
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
      invalidatesTags: [
        'getPurchaseInvoiceList',
        'getPaymentVouchersList',
        'getSinglePurchaseInvoice',
        'getPaymentsAgainstPaymentInvoice',
        'getSuppliersList',
        'getSingleSupplier',
        'getSupplierTransactions',
      ],
    }),

    editPaymentVouchser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/paymentsMade/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getSinglePaymentVoucher',
        'getPaymentVouchersList',
        'getSinglePurchaseInvoice',
        'getPaymentsAgainstPaymentInvoice',
        'getSuppliersList',
        'getSingleSupplier',
        'getSupplierTransactions',
      ],
    }),
    deletePaymentVoucher: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/paymentsMade/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'getPurchaseInvoiceList',
        'getPaymentVouchersList',
        'getSinglePurchaseInvoice',
        'getPaymentsAgainstPaymentInvoice',
        'getSuppliersList',
        'getSingleSupplier',
        'getSupplierTransactions',
      ],
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
      invalidatesTags: ['getSinglePaymentVoucher', 'getPaymentVouchersList'],
    }),
  }),
});

export const {
  useGetPaymentVouchersListQuery,
  useGetLatestPaymentVouchersNumtQuery,
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

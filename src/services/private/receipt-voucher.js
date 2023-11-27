import { privateApi } from './index';

const receiptVoucherApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getReceiptVoucherList: builder.query({
      query: params => ({
        url: 'api/accounting/sales/paymentsReceived/',
        params,
      }),
      providesTags: ['getReceiptVoucherList'],
    }),
    getSingleReceiptVoucher: builder.query({
      query: id => ({
        url: `api/accounting/sales/paymentsReceived/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleReceiptVoucher'],
    }),
    addReceiptVoucher: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/paymentsReceived/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addReceiptVoucher'],

      invalidatesTags: [
        'getReceiptVoucherList',
        'getSingleSaleInvoice',
        'getSaleInvoicesList',
        'getLatestReceiptVoucher',
      ],
    }),
    editReceiptVoucher: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/paymentsReceived/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      providesTags: ['editReceiptVoucher'],
      invalidatesTags: ['getReceiptVoucherList', 'getSingleReceiptVoucher', 'getLatestReceiptVoucher'],
    }),
    deleteReceiptVoucher: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/paymentsReceived/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteReceiptVoucher'],
      invalidatesTags: [
        'getReceiptVoucherList',
        'getSingleSaleInvoice',
        'getSaleInvoicesList',
        'getLatestReceiptVoucher',
      ],
    }),
    getLatestReceiptVoucher: builder.query({
      query: () => ({
        url: 'api/accounting/sales/paymentsReceived/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestReceiptVoucher'],
    }),
    getUnpaidInvoicesAgainstCustomer: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/accounts/${id}/unpaidInvoices`,
        method: 'GET',
      }),
    }),
    getReceiptVoucherDocuments: builder.query({
      query: id => ({
        url: `api/accounting/sales/paymentReceived/${id}/docs`,
        method: 'GET',
      }),
      providesTags: ['getReceiptVoucherDocuments'],
    }),
    addReceiptVoucherDocuments: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/paymentReceived/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getReceiptVoucherDocuments'],
    }),
    deleteReceiptVoucherDocuments: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/sales/paymentReceived/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getReceiptVoucherDocuments'],
    }),
    refundReceiptVoucher: builder.mutation({
      query: payload => ({
        url: 'api/sale/payment/refund',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['refundUnUsedAmount'],
    }),
  }),
});

export const {
  useGetReceiptVoucherListQuery,
  useGetSingleReceiptVoucherQuery,
  useAddReceiptVoucherMutation,
  useEditReceiptVoucherMutation,
  useDeleteReceiptVoucherMutation,
  useGetUnpaidInvoicesAgainstCustomerMutation,
  useGetLatestReceiptVoucherQuery,
  useGetReceiptVoucherDocumentsQuery,
  useAddReceiptVoucherDocumentsMutation,
  useDeleteReceiptVoucherDocumentsMutation,
  useRefundReceiptVoucherMutation,
} = receiptVoucherApi;

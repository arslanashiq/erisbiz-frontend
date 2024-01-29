import { privateApi } from './index';

const saleInvoiceApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getSaleInvoicesList: builder.query({
      query: params => ({
        url: 'api/accounting/sales/invoices/',
        params,
      }),
      providesTags: ['getSaleInvoicesList'],
    }),
    getSingleSaleInvoice: builder.query({
      query: id => ({
        url: `api/accounting/sales/invoices/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleSaleInvoice'],
    }),
    addSaleInvoices: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/invoices/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'getSaleInvoicesList',
        'getProformaInvoicesList',
        'getSingleProformaInvoice',
        'getLatestSaleInvoice',
        'getItemInvoice',
        'getItemsList',
        'getCustomerTransactions',
      ],
    }),
    editSaleInvoices: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/invoices/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getSaleInvoiceJournals',
        'getSingleSaleInvoice',
        'getSaleInvoicePayments',
        'getSaleInvoicesList',
        'getProformaInvoicesList',
        'getSingleProformaInvoice',
        'getLatestSaleInvoice',
        'getItemInvoice',
        'getItemsList',
        'getCustomerTransactions',
      ],
    }),
    deleteSaleInvoice: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/invoices/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['deleteSaleInvoice'],
      invalidatesTags: [
        'getSaleInvoicesList',
        'getSingleSaleInvoice',
        'getSaleInvoicePayments',

        'getProformaInvoicesList',
        'getSingleProformaInvoice',
        'getLatestSaleInvoice',
        'getItemInvoice',
        'getItemsList',
        'getCustomerTransactions',
      ],
    }),
    getLatestSaleInvoice: builder.query({
      query: () => ({
        url: 'api/accounting/sales/invoices/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestSaleInvoice'],
    }),

    uploadSaleInvoiceDocuments: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/invoices/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSingleSaleInvoice', 'getSaleInvoicePayments'],
    }),
    deleteSaleInvoiceDocuments: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/sales/invoices/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSingleSaleInvoice', 'getSaleInvoicePayments'],
    }),

    getSaleInvoiceJournals: builder.query({
      query: id => ({
        url: `/api/accounting/sales/invoices/${id}/journals`,
        method: 'GET',
      }),
      providesTags: ['getSaleInvoiceJournals'],
    }),

    changeSaleInvoiceStatusToSent: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/invoices/${id}/save`,
        method: 'PATCH',
      }),
      providesTags: ['changeSaleInvoiceStatusToSent'],
      invalidatesTags: [
        'getSingleSaleInvoice',
        'getSaleInvoicePayments',
        'getSaleInvoicesList',
        'getSaleInvoiceJournals',
        'getItemsList',
      ],
    }),
    changeSaleInvoiceStatusToVoid: builder.mutation({
      query: ({ id, reason }) => ({
        url: `api/accounting/sales/invoices/${id}/status?reason=${reason}`,
        method: 'GET',
      }),
      providesTags: ['changeSaleInvoiceStatusToVoid'],
      invalidatesTags: ['getSingleSaleInvoice', 'getSaleInvoicePayments', 'getSaleInvoicesList'],
    }),
    getSaleInvoicePayments: builder.query({
      query: id => ({
        url: `api/accounting/sales/invoices/${id}/payment`,
        method: 'GET',
      }),
      providesTags: ['getSaleInvoicePayments'],
    }),
  }),
});

export const {
  useGetSaleInvoicesListQuery,
  useGetSingleSaleInvoiceQuery,
  useAddSaleInvoicesMutation,
  useEditSaleInvoicesMutation,
  useDeleteSaleInvoiceMutation,
  useUploadSaleInvoiceDocumentsMutation,
  useDeleteSaleInvoiceDocumentsMutation,
  useChangeSaleInvoiceStatusToSentMutation,
  useChangeSaleInvoiceStatusToVoidMutation,
  useGetSaleInvoiceJournalsQuery,
  useGetLatestSaleInvoiceQuery,
  useGetSaleInvoicePaymentsQuery
} = saleInvoiceApi;

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
      invalidatesTags: ['getSingleSaleInvoice'],
    }),
    deleteSaleInvoiceDocuments: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/sales/invoices/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSingleSaleInvoice'],
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
      invalidatesTags: ['getSingleSaleInvoice', 'getSaleInvoicesList'],
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
} = saleInvoiceApi;

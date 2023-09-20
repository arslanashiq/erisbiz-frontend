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
      invalidatesTags: ['getSaleInvoicesList'],
    }),
    editSaleInvoices: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/invoices/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleSaleInvoice', 'getSaleInvoicesList'],
    }),
    deleteSaleInvoice: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/invoices/${id}/`,
        method: 'DELETE',
      }),
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
} = saleInvoiceApi;

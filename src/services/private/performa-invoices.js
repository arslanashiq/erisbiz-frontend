import { privateApi } from './index';

const performaInvoiceApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPerformaInvoicesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/proInvoices/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getPerformaInvoicesList'],
    }),
    getSinglePerformaInvoice: builder.query({
      query: id => ({
        url: `api/accounting/sales/proInvoices/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSinglePerformaInvoice'],
    }),
    addPerformaInvoice: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/proInvoices/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addPerformaInvoice'],
      invalidatesTags: ['getPerformaInvoicesList', 'getQuotationsList'],
    }),
    editPerformaInvoice: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/proInvoices/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSinglePerformaInvoice', 'getPerformaInvoicesList', 'getQuotationsList'],
    }),
    getLatestPerformaInvoice: builder.query({
      query: () => ({
        url: '/api/accounting/sales/proInvoices/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestPerformaInvoicesList'],
    }),

    deletePerformaInvoice: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/proInvoices/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getPerformaInvoicesList', 'getQuotationsList'],
    }),
    uploadPerformaInvoiceDocumentFile: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/proInvoices/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSinglePerformaInvoice'],
    }),
    deletePerformaInvoiceDocumentFile: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/sales/proInvoices/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSinglePerformaInvoice'],
    }),
  }),
});

export const {
  useGetPerformaInvoicesListQuery,
  useDeletePerformaInvoiceMutation,
  useGetLatestPerformaInvoiceQuery,
  useGetSinglePerformaInvoiceQuery,
  useAddPerformaInvoiceMutation,
  useEditPerformaInvoiceMutation,
  useUploadPerformaInvoiceDocumentFileMutation,
  useDeletePerformaInvoiceDocumentFileMutation,
} = performaInvoiceApi;

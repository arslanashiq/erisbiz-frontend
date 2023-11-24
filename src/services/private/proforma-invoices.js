import { privateApi } from './index';

const proformaInvoiceApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getProformaInvoicesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/proInvoices/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
          customer: params.customer,
          status: params.status || '',
        },
      }),
      providesTags: ['getProformaInvoicesList'],
    }),
    getSingleProformaInvoice: builder.query({
      query: id => ({
        url: `api/accounting/sales/proInvoices/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleProformaInvoice'],
    }),
    addProformaInvoice: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/proInvoices/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addProformaInvoice'],
      invalidatesTags: [
        'getProformaInvoicesList',
        'getQuotationsList',
        'getSingleQuotation',
        'getLatestProformaInvoice',
        'getItemsList',
        'getItemProformaInvoice',
      ],
    }),
    editProformaInvoice: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/proInvoices/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getSingleProformaInvoice',
        'getProformaInvoicesList',
        'getQuotationsList',
        'getLatestProformaInvoice',
        'getItemsList',
        'getItemProformaInvoice',
      ],
    }),
    getLatestProformaInvoice: builder.query({
      query: () => ({
        url: '/api/accounting/sales/proInvoices/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestProformaInvoice'],
    }),

    deleteProformaInvoice: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/proInvoices/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'getProformaInvoicesList',
        'getQuotationsList',
        'getSingleQuotation',
        'getLatestProformaInvoice',
        'getItemsList',
        'getItemProformaInvoice',
      ],
    }),
    uploadProformaInvoiceDocumentFile: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/proInvoices/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSingleProformaInvoice'],
    }),
    deleteProformaInvoiceDocumentFile: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/sales/proInvoices/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSingleProformaInvoice'],
    }),
    changeProformaInvoiceStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `api/accounting/sales/proinvoices/${id}/statusUpdate?status=${status}`,
        method: 'GET',
      }),
      invalidatesTags: ['getProformaInvoicesList', 'getSingleProformaInvoice'],
    }),
  }),
});

export const {
  useGetProformaInvoicesListQuery,
  useDeleteProformaInvoiceMutation,
  useGetLatestProformaInvoiceQuery,
  useGetSingleProformaInvoiceQuery,
  useAddProformaInvoiceMutation,
  useEditProformaInvoiceMutation,
  useUploadProformaInvoiceDocumentFileMutation,
  useDeleteProformaInvoiceDocumentFileMutation,
  useChangeProformaInvoiceStatusMutation,
} = proformaInvoiceApi;

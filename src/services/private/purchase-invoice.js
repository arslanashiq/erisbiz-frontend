import { privateApi } from './index';

const purchaseInvoiceApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPurchaseInvoiceList: builder.query({
      query: () => ({
        url: '/api/accounting/purchases/list/bills',
        method: 'GET',
      }),
      providesTags: ['getPurchaseInvoiceList'],
    }),
    getSinglePurchaseInvoice: builder.query({
      query: id => ({
        url: `/api/accounting/purchases/bills/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSinglePurchaseInvoice'],
    }),
    addPurchaseInvoce: builder.mutation({
      query: payload => ({
        url: '/api/accounting/purchases/bills/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addPurchaseInvoce'],
      invalidatesTags: ['getPurchaseInvoiceList'],
    }),
    deletePurchaseInvoce: builder.mutation({
      query: id => ({
        url: `/api/accounting/purchases/bills/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getPurchaseInvoiceList'],
    }),
    editPurchaseInvoce: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/accounting/purchases/bills/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['addPurchaseInvoce', 'getPurchaseInvoiceList'],
    }),
    uploadPurchaseInvoiceDocumentFile: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/bills/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSinglePurchaseInvoice'],
    }),
    deletePurchaseInvoiceDocumentFile: builder.mutation({
      query: ({ id, payload }) => ({
        url: ` api/accounting/purchases/bills/docs/${id}/`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['getSinglePurchaseInvoice'],
    }),
  }),
});

export const {
  useGetPurchaseInvoiceListQuery,
  useAddPurchaseInvoceMutation,
  useGetSinglePurchaseInvoiceQuery,
  useDeletePurchaseInvoceMutation,
  useEditPurchaseInvoceMutation,
  useUploadPurchaseInvoiceDocumentFileMutation,
  useDeletePurchaseInvoiceDocumentFileMutation,
} = purchaseInvoiceApi;

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
    getPurchaseInvoce: builder.mutation({
      query: id => ({
        url: `/api/accounting/purchases/bills/${id}/`,
        method: 'GET',
      }),
    }),
    addPurchaseInvoce: builder.mutation({
      query: payload => ({
        url: '/api/accounting/purchases/bills/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addPurchaseInvoce'],
      invalidatesTags: ['getPurchaseInvoiceList', 'getPurchaseOrdersList'],
    }),
    deletePurchaseInvoce: builder.mutation({
      query: id => ({
        url: `/api/accounting/purchases/bills/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getPurchaseInvoiceList', 'getPurchaseOrdersList'],
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
        url: `api/accounting/purchases/bills/docs/${id}/`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['getSinglePurchaseInvoice'],
    }),
    getPaymentsAgainstPaymentInvoice: builder.query({
      query: id => ({
        url: `api/accounting/purchases/bills/${id}/payment`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetPurchaseInvoiceListQuery,
  useAddPurchaseInvoceMutation,
  useGetPurchaseInvoceMutation,
  useGetSinglePurchaseInvoiceQuery,
  useDeletePurchaseInvoceMutation,
  useEditPurchaseInvoceMutation,
  useUploadPurchaseInvoiceDocumentFileMutation,
  useDeletePurchaseInvoiceDocumentFileMutation,
  useGetPaymentsAgainstPaymentInvoiceQuery,
} = purchaseInvoiceApi;

import { privateApi } from './index';

const purchaseInvoiceApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPurchaseInvoiceList: builder.query({
      query: params => ({
        url: '/api/accounting/purchases/list/bills',
        method: 'GET',
        params,
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
      invalidatesTags: [
        'getJournalsAgainstPaymentInvoice',
        'getPurchaseInvoiceList',
        'getPurchaseOrdersList',
        'getSinglePurchaseOrder',
        'getLatestPurchaseInvoiceNumber',
        'getItemsList',
        'getItemBill',
        'getSupplierTransactions',
      ],
    }),
    deletePurchaseInvoce: builder.mutation({
      query: id => ({
        url: `/api/accounting/purchases/bills/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'getPurchaseInvoiceList',
        'getPurchaseOrdersList',
        'getSinglePurchaseOrder',
        'getLatestPurchaseInvoiceNumber',
        'getItemsList',
        'getItemBill',
        'getSupplierTransactions',
      ],
    }),
    chagePurchaseInvoiceStatusToOpen: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/bills/${id}/open`,
        method: 'GET',
      }),
      providesTags: ['chagePurchaseInvoiceStatusToOpen'],
      invalidatesTags: [
        'getPurchaseInvoiceList',
        'getSinglePurchaseInvoice',
        'getItemsList',
        'getJournalsAgainstPaymentInvoice',
        'getSupplierTransactions',
      ],
    }),

    editPurchaseInvoce: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/accounting/purchases/bills/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getJournalsAgainstPaymentInvoice',
        'addPurchaseInvoce',
        'getPurchaseInvoiceList',
        'getItemsList',
        'getItemBill',
        'getSinglePurchaseInvoice',
        'getSupplierTransactions',
      ],
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
      providesTags: ['getPaymentsAgainstPaymentInvoice'],
    }),
    getJournalsAgainstPaymentInvoice: builder.query({
      query: id => ({
        url: `api/accounting/sales/bill/${id}/journals`,
        method: 'GET',
      }),
      providesTags: ['getJournalsAgainstPaymentInvoice'],
    }),
    changeInvoiceStatusToVoid: builder.mutation({
      query: ({ id, reason }) => ({
        url: `api/accounting/purchases/bill/${id}/status?reason=${reason}`,
        method: 'GET',
      }),
      providesTags: ['changeInvoiceStatusToVoid'],
      invalidatesTags: [
        'getPurchaseInvoiceList',
        'getSinglePurchaseInvoice',
        'getJournalsAgainstPaymentInvoice',
      ],
    }),
    getLatestPurchaseInvoiceNumber: builder.query({
      query: () => ({
        url: 'api/accounting/purchases/billReferenceNum/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestPurchaseInvoiceNumber'],
    }),
  }),
});

export const {
  useGetPurchaseInvoiceListQuery,
  useAddPurchaseInvoceMutation,
  useGetPurchaseInvoceMutation,
  useGetSinglePurchaseInvoiceQuery,
  useChagePurchaseInvoiceStatusToOpenMutation,
  useDeletePurchaseInvoceMutation,
  useEditPurchaseInvoceMutation,
  useUploadPurchaseInvoiceDocumentFileMutation,
  useDeletePurchaseInvoiceDocumentFileMutation,
  useGetPaymentsAgainstPaymentInvoiceQuery,
  useGetJournalsAgainstPaymentInvoiceQuery,
  useChangeInvoiceStatusToVoidMutation,
  useGetLatestPurchaseInvoiceNumberQuery,
} = purchaseInvoiceApi;

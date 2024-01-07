import { privateApi } from './index';

const debitNotesApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getSupplierCreditsList: builder.query({
      query: params => ({
        url: 'api/accounting/purchases/list/supplierCredits',
        method: 'GET',
        params: {
          offset: params.offset,
          limit: params.limit,
        },
      }),
      providesTags: ['getSupplierCreditsList'],
    }),
    getSingleSupplierCredits: builder.query({
      query: id => ({
        url: `api/accounting/purchases/supplierCredits/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleSupplierCredits'],
    }),
    addSupplierCredits: builder.mutation({
      query: payload => ({
        url: 'api/accounting/purchases/supplierCredits/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        'getSupplierCreditsList',
        'getLatestSupplierCreditNumber',
        'getItemDebitNote',
        'getPaymentsAgainstPaymentInvoice',
        'getSuppliersList',
        'getSingleSupplier',
        'getSupplierTransactions',
      ],
    }),
    editSupplierCredits: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/supplierCredits/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: [
        'getSingleSupplierCredits',
        'getSupplierCreditsList',
        'getItemDebitNote',
        'getPaymentsAgainstPaymentInvoice',
        'getSuppliersList',
        'getSingleSupplier',
        'getSupplierTransactions',
      ],
    }),
    deleteSupplierCredits: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/supplierCredits/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        'getSupplierCreditsList',
        'getLatestSupplierCreditNumber',
        'getItemDebitNote',
        'getPaymentsAgainstPaymentInvoice',
        'getSuppliersList',
        'getSingleSupplier',
        'getSupplierTransactions',
      ],
    }),
    getSupplierCreditsDocuments: builder.query({
      query: id => ({
        url: `api/accounting/purchases/supplierCredit/${id}/docs`,
        method: 'GET',
      }),
      providesTags: ['getSupplierCreditsDocuments'],
    }),
    uploadSupplierCreditsDocuments: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/supplierCredit/${id}/uploadDoc`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSupplierCreditsDocuments'],
    }),
    deleteSupplierCreditsDocuments: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/supplierCredit/docs/${id}/`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['getSupplierCreditsDocuments'],
    }),
    refundSupplierCredits: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/suppliercredit/amountapply',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['refundSupplierCredits'],
      invalidatesTags: ['getSupplierCreditsList', 'getSingleSupplierCredits'],
    }),

    getSupplierCreditJournals: builder.query({
      query: id => ({
        url: `api/accounting/sales/supplier/credit/${id}/journals`,
        method: 'GET',
      }),
      invalidatesTags: ['getSupplierCreditJournals'],
    }),
    getLatestSupplierCreditNumber: builder.query({
      query: () => ({
        url: 'api/accounting/purchases/supplierCredits/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestSupplierCreditNumber'],
    }),
  }),
});

export const {
  useGetSupplierCreditsListQuery,
  useGetSingleSupplierCreditsQuery,
  useAddSupplierCreditsMutation,
  useEditSupplierCreditsMutation,
  useDeleteSupplierCreditsMutation,
  useGetSupplierCreditsDocumentsQuery,
  useUploadSupplierCreditsDocumentsMutation,
  useDeleteSupplierCreditsDocumentsMutation,
  useRefundSupplierCreditsMutation,
  useGetSupplierCreditJournalsQuery,
  useGetLatestSupplierCreditNumberQuery,
} = debitNotesApi;

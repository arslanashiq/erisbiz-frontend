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
  }),
});

export const {
  useGetPurchaseInvoiceListQuery,
  useAddPurchaseInvoceMutation,
  useGetSinglePurchaseInvoiceQuery,
  useDeletePurchaseInvoceMutation,
  useEditPurchaseInvoceMutation,
} = purchaseInvoiceApi;

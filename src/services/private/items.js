import { privateApi } from './index';

const itemApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getItemsList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/items/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
          is_active: params.is_active,
          item_type: params.item_type,
        },
      }),
      providesTags: ['getItemsList'],
    }),
    addItem: builder.mutation({
      query: payload => ({
        url: 'api/accounting/items/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getItemsList'],
    }),
    getSingleItem: builder.query({
      query: id => ({ url: `api/accounting/items/${id}/`, method: 'GET' }),
      providesTags: ['getSingleItem'],
    }),
    editItem: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/items/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleItem', 'getItemsList'],
    }),
    changeItemStatus: builder.mutation({
      query: id => ({
        url: `/api/accounting/items/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['getSingleItem', 'getItemsList'],
    }),

    deleteItem: builder.mutation({
      query: id => ({ url: `/api/accounting/items/${id}/`, method: 'DELETE' }),
      invalidatesTags: ['getSingleItem', 'getItemsList'],
    }),

    getItemQuotation: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/item/${id}/quotation/transactions`,
        method: 'GET',
        params: {
          status: params.status,
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getItemQuotation'],
    }),

    getItemPerformaInvoice: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/item/${id}/proinvoice/transactions`,
        method: 'GET',
        params: {
          status: params.status,
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getItemPerformaInvoice'],
    }),
    getItemInvoice: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/item/${id}/invoice/transactions`,
        method: 'GET',
        params: {
          status: params.status,
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getItemInvoice'],
    }),
    getItemCreditNote: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/item/${id}/creditnote/transactions`,
        method: 'GET',
        params: {
          status: params.status,
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getItemCreditNote'],
    }),
    getItemPurchaseOrder: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/item/${id}/purorder/transactions`,
        method: 'GET',
        params: {
          status: params.status,
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getItemPurchaseOrder'],
    }),
    getItemBill: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/item/${id}/bill/transactions`,
        method: 'GET',
        params: {
          status: params.status,
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getItemBill'],
    }),
    getItemDebitNote: builder.query({
      query: ({ id, params }) => ({
        url: `api/accounting/item/${id}/debitnote/transactions`,
        method: 'GET',
        params: {
          status: params.status,
          limit: params.limit,
          offset: params.offset,
        },
      }),
      providesTags: ['getItemDebitNote'],
    }),
  }),
});

export const {
  useGetItemsListQuery,
  useAddItemMutation,
  useEditItemMutation,
  useChangeItemStatusMutation,
  useGetSingleItemQuery,
  useDeleteItemMutation,
  useGetItemQuotationQuery,
  useGetItemPerformaInvoiceQuery,
  useGetItemInvoiceQuery,
  useGetItemCreditNoteQuery,
  useGetItemPurchaseOrderQuery,
  useGetItemBillQuery,
  useGetItemDebitNoteQuery,
} = itemApi;

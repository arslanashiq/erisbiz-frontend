import { privateApi } from './index';

const itemApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getItemsList: builder.query({
      query: params => ({
        url: 'api/accounting/list/items',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
          is_active: params.is_active,
          item_type: params.item_type,
        },
      }),
      providesTags: ['getItemsList'],
    }),
    changeItemStatus: builder.mutation({
      query: id => ({
        url: `/api/accounting/items/${id}/status`,
        method: 'GET',
      }),
      invalidatesTags: ['getItemsList'],
    }),
    getSingleItem: builder.query({
      query: id => ({ url: `api/accounting/items/${id}/`, method: 'GET' }),
    }),
    deleteItem: builder.mutation({
      query: id => ({ url: `/api/accounting/items/${id}/`, method: 'DELETE' }),
      invalidatesTags: ['getItemsList'],
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
    }),
  }),
});

export const {
  useGetItemsListQuery,
  useChangeItemStatusMutation,
  useGetSingleItemQuery,
  useDeleteItemMutation,
  useGetItemQuotationQuery,
  useGetItemPerformaInvoiceQuery,
  useGetItemInvoiceQuery,
  useGetItemCreditNoteQuery,
  useGetItemPurchaseOrderQuery,
  useGetItemBillQuery,
} = itemApi;

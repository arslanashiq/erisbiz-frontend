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
      invalidatesTags: ['getSupplierCreditsList'],
    }),
    editSupplierCredits: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/purchases/supplierCredits/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleSupplierCredits', 'getSupplierCreditsList'],
    }),
    deleteSupplierCredits: builder.mutation({
      query: id => ({
        url: `api/accounting/purchases/supplierCredits/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSupplierCreditsList'],
    }),
  }),
});

export const {
  useGetSupplierCreditsListQuery,
  useGetSingleSupplierCreditsQuery,
  useAddSupplierCreditsMutation,
  useEditSupplierCreditsMutation,
  useDeleteSupplierCreditsMutation,
} = debitNotesApi;

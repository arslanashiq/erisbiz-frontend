import { privateApi } from './index';

const quotationsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getQuotationsList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/quotations/',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getQuotationsList'],
    }),
    getSingleQuotation: builder.query({
      query: id => ({
        url: `api/accounting/sales/quotations/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleQuotation'],
    }),
    addQuotation: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/quotations/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getLatestQuatitonNumber', 'getQuotationsList'],
    }),
    editQuotation: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/quotations/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleQuotation', 'getQuotationsList', 'getLatestQuatitonNumber'],
    }),
    deleteQuotation: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/quotations/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getLatestQuatitonNumber', 'getQuotationsList'],
    }),
    getLatestQuatitonNumber: builder.query({
      query: () => ({
        url: '/api/accounting/sales/quotations/latest',
        method: 'GET',
      }),
      providesTags: ['getLatestQuatitonNumber'],
    }),
    uploadQuotationDocuments: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/quotations/${id}/uploadDoc/`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getSingleQuotation'],
    }),
    deleteQuotationDocuments: builder.mutation({
      query: ({ id }) => ({
        url: `api/accounting/sales/quotations/docs/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getSingleQuotation'],
    }),
    changeQuotationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `api/accounting/sales/quotations/${id}/statusUpdate?status=${status}`,
        method: 'GET',
      }),
      providesTags: ['changeQuotationStatus'],
      invalidatesTags: ['getSingleQuotation', 'getQuotationsList'],
    }),
  }),
});

export const {
  useGetQuotationsListQuery,
  useDeleteQuotationMutation,
  useEditQuotationMutation,
  useAddQuotationMutation,
  useGetLatestQuatitonNumberQuery,
  useGetSingleQuotationQuery,
  useUploadQuotationDocumentsMutation,
  useDeleteQuotationDocumentsMutation,
  useChangeQuotationStatusMutation,
} = quotationsApi;

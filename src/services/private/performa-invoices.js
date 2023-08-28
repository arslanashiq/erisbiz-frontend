import { privateApi } from './index';

const performaInvoiceApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getPerformaInvoicesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/list/proInvoices',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getPerformaInvoicesList'],
    }),
    deletePerformaInvoice: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/proInvoices/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetPerformaInvoicesListQuery, useDeletePerformaInvoiceMutation } = performaInvoiceApi;

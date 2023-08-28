import { privateApi } from './index';

const invoiceApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getInvoicesList: builder.query({
      query: (params = {}) => ({
        url: 'api/accounting/sales/list/invoices',
        params: {
          limit: params.limit,
          offset: params.offset || 0,
        },
      }),
      providesTags: ['getInvoicesList'],
    }),
    deleteInvoice: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/invoices/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetInvoicesListQuery, useDeleteInvoiceMutation } = invoiceApi;

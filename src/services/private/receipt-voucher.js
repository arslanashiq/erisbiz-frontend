import { privateApi } from './index';

const receiptVoucherApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getReceiptVoucherList: builder.query({
      query: params => ({
        url: 'api/accounting/sales/paymentsReceived/',
        params,
      }),
      providesTags: ['getReceiptVoucherList'],
    }),
    getSingleReceiptVoucher: builder.query({
      query: id => ({
        url: `api/accounting/sales/paymentsReceived/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getSingleReceiptVoucher'],
    }),
    addReceiptVoucher: builder.mutation({
      query: payload => ({
        url: 'api/accounting/sales/paymentsReceived/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['getReceiptVoucherList'],
    }),
    editReceiptVoucher: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/accounting/sales/paymentsReceived/${id}/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['getSingleReceiptVoucher', 'getReceiptVoucherList'],
    }),
    deleteReceiptVoucher: builder.mutation({
      query: id => ({
        url: `api/accounting/sales/paymentsReceived/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['getReceiptVoucherList'],
    }),
  }),
});

export const {
  useGetReceiptVoucherListQuery,
  useGetSingleReceiptVoucherQuery,
  useAddReceiptVoucherMutation,
  useEditReceiptVoucherMutation,
  useDeleteReceiptVoucherMutation,
} = receiptVoucherApi;

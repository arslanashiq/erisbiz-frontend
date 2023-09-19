import { privateApi } from './index';

const reportsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getSupplierPayableBalance: builder.query({
      query: params => ({
        url: 'api/report/vendor/payable/balance',
        params,
      }),
      providesTags: ['getSupplierPayableBalance'],
    }),
    getApAgingSummary: builder.query({
      query: params => ({
        url: 'api/report/ap/aging/summary',
        params,
      }),
      providesTags: ['getApAgingSummary'],
    }),
    getApAgingDetail: builder.query({
      query: params => ({
        url: 'api/report/ap/aging/details',
        params,
      }),
      providesTags: ['getApAgingDetail'],
    }),
    getPayableBillDetails: builder.query({
      query: params => ({
        url: 'api/payables/report/bill/detail',
        params,
      }),
      providesTags: ['getPayableBillDetails'],
    }),
    getPaymentMadeDetails: builder.query({
      query: params => ({
        url: 'api/payables/report/payment/made',
        params,
      }),
      providesTags: ['getPaymentMadeDetails'],
    }),
    getPurchaseOrderDetail: builder.query({
      query: params => ({
        url: 'api/payables/report/pur/order/detail',
        params: params || 'this+month',
      }),
      providesTags: ['getPurchaseOrderDetail'],
    }),
  }),
});

export const {
  useGetSupplierPayableBalanceQuery,
  useGetApAgingSummaryQuery,
  useGetApAgingDetailQuery,
  useGetPayableBillDetailsQuery,
  useGetPaymentMadeDetailsQuery,
  useGetPurchaseOrderDetailQuery,
} = reportsApi;

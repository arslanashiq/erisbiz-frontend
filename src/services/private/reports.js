import { privateApi } from './index';

const reportsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    // payables
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
    getPurchaseOrderBySupplier: builder.query({
      query: params => ({
        url: 'api/payables/report/pur/order/by/vendor',
        params: params || 'this+month',
      }),
      providesTags: ['getPurchaseOrderBySupplier'],
    }),
    getPayableSummary: builder.query({
      query: params => ({
        url: 'api/payables/report/summary',
        params: params || 'this+month',
      }),
      providesTags: ['getPayableSummary'],
    }),
    getPayableDetail: builder.query({
      query: params => ({
        url: 'api/payables/report/detail',
        params: params || 'this+month',
      }),
      providesTags: ['getPayableDetail'],
    }),
    getSupplierRefundHistory: builder.query({
      query: params => ({
        url: 'api/payables/report/refund/history',
        params: params || 'this+month',
      }),
      providesTags: ['getRefundHistory'],
    }),

    // receiveables
    getReceivableAccountBalance: builder.query({
      query: params => ({
        url: 'api/report/receive/customer/balance',
        params: params || 'this+month',
      }),
      providesTags: ['getReceivableAccountBalance'],
    }),
    getReceivableARAgingSummary: builder.query({
      query: params => ({
        url: 'api/report/ar/aging/summary',
        params: params || 'this+month',
      }),
      providesTags: ['getReceivableARAgingSummary'],
    }),
    getReceivableARAgingDetail: builder.query({
      query: params => ({
        url: 'api/report/ar/aging/detail',
        params: params || 'this+month',
      }),
      providesTags: ['getReceivableARAgingDetail'],
    }),
    getReceivableInvoiceDetail: builder.query({
      query: params => ({
        url: 'api/report/receive/invoice/details',
        params: params || 'this+month',
      }),
      providesTags: ['getReceivableInvoiceDetail'],
    }),
    getReceivableSummary: builder.query({
      query: params => ({
        url: 'api/report/receive/receiveable/summary',
        params: params || 'this+month',
      }),
      providesTags: ['getReceivableSummary'],
    }),
    getReceivableDetail: builder.query({
      query: params => ({
        url: 'api/report/receive/receiveable/details',
        params: params || 'this+month',
      }),
      providesTags: ['getReceivableDetail'],
    }),
    // activity
    getActivityLogDetail: builder.query({
      query: params => ({
        url: 'api/activity/log/report',
        params: params || 'today',
      }),
      providesTags: ['getActivityLogDetail'],
    }),
    // purchases and expenses
    getPurchaseBySupplier: builder.query({
      query: params => ({
        url: 'api/purchase/by/vendor/report',
        params: params || 'today',
      }),
      providesTags: ['getPurchaseBySupplier'],
    }),
    getPurchaseByItem: builder.query({
      query: params => ({
        url: 'api/purchase/by/item/report',
        params: params || 'today',
      }),
      providesTags: ['getPurchaseByItem'],
    }),
    getExpenseDetails: builder.query({
      query: params => ({
        url: 'api/expense/detail/report',
        params: params || 'today',
      }),
      providesTags: ['getExpenseDetails'],
    }),
    getExpenseByCategory: builder.query({
      query: params => ({
        url: 'api/expense/by/category/report',
        params: params || 'today',
      }),
      providesTags: ['getExpenseByCategory'],
    }),
  }),
});

export const {
  // payable
  useGetSupplierPayableBalanceQuery,
  useGetApAgingSummaryQuery,
  useGetApAgingDetailQuery,
  useGetPayableBillDetailsQuery,
  useGetPaymentMadeDetailsQuery,
  useGetPurchaseOrderDetailQuery,
  useGetPurchaseOrderBySupplierQuery,
  useGetPayableSummaryQuery,
  useGetPayableDetailQuery,
  useGetSupplierRefundHistoryQuery,
  // receiveables
  useGetReceivableAccountBalanceQuery,
  useGetReceivableARAgingSummaryQuery,
  useGetReceivableARAgingDetailQuery,
  useGetReceivableInvoiceDetailQuery,
  useGetReceivableSummaryQuery,
  useGetReceivableDetailQuery,
  // activity
  useGetActivityLogDetailQuery,
  // purchases and expenses
  useGetPurchaseBySupplierQuery,
  useGetPurchaseByItemQuery,
  useGetExpenseDetailsQuery,
  useGetExpenseByCategoryQuery,
} = reportsApi;

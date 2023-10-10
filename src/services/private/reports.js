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
    getSupplierBillBalanceDetail: builder.query({
      query: params => ({
        url: 'api/report/payable/vendor/balance/bill/detail',
        params,
      }),
      providesTags: ['getSupplierBillBalanceDetail'],
    }),
    getSupplierExcessPaymentBalanceDetail: builder.query({
      query: params => ({
        url: 'api/report/payable/vendor/balance/excess/payment/detail',
        params,
      }),
      providesTags: ['getSupplierExcessPaymentBalanceDetail'],
    }),
    getSupplierBalanceDetail: builder.query({
      query: params => ({
        url: 'api/report/payable/vendor/balance/detail',
        params,
      }),
      providesTags: ['getSupplierBalanceDetail'],
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
    getPayableDebitNoteDetail: builder.query({
      query: params => ({
        url: 'api/payables/report/supplierCredit/detail',
        params,
      }),
      providesTags: ['getPayableDebitNoteDetail'],
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
        params,
      }),
      providesTags: ['getPurchaseOrderDetail'],
    }),
    getPurchaseOrderBySupplier: builder.query({
      query: params => ({
        url: 'api/payables/report/pur/order/by/vendor',
        params,
      }),
      providesTags: ['getPurchaseOrderBySupplier'],
    }),
    getPayableSummary: builder.query({
      query: params => ({
        url: 'api/payables/report/summary',
        params,
      }),
      providesTags: ['getPayableSummary'],
    }),
    getPayableDetail: builder.query({
      query: params => ({
        url: 'api/payables/report/detail',
        params,
      }),
      providesTags: ['getPayableDetail'],
    }),
    getSupplierRefundHistory: builder.query({
      query: params => ({
        url: 'api/payables/report/refund/history',
        params,
      }),
      providesTags: ['getRefundHistory'],
    }),

    // receiveables
    getReceivableAccountBalance: builder.query({
      query: params => ({
        url: 'api/report/receive/customer/balance',
        params,
      }),
      providesTags: ['getReceivableAccountBalance'],
    }),
    getReceivableInvoiceBalanceAgainstCustomer: builder.query({
      query: params => ({
        url: 'api/report/receive/customer/balance/invoice/detail',
        params,
      }),
      providesTags: ['getReceivableInvoiceBalanceAgainstCustomer'],
    }),
    getReceivableCreditNoteBalanceAgainstCustomer: builder.query({
      query: params => ({
        url: 'api/report/receive/customer/balance/credit/note/detail',
        params,
      }),
      providesTags: ['getReceivableCreditNoteBalanceAgainstCustomer'],
    }),

    getReceivableBalanceDetailAgainstCustomer: builder.query({
      query: params => ({
        url: 'api/report/receive/customer/balance/detail',
        params,
      }),
      providesTags: ['getReceivableBalanceDetailAgainstCustomer'],
    }),

    getReceivableARAgingSummary: builder.query({
      query: params => ({
        url: 'api/report/ar/aging/summary',
        params,
      }),
      providesTags: ['getReceivableARAgingSummary'],
    }),
    getReceivableARAgingDetail: builder.query({
      query: params => ({
        url: 'api/report/ar/aging/detail',
        params,
      }),
      providesTags: ['getReceivableARAgingDetail'],
    }),
    getReceivableInvoiceDetail: builder.query({
      query: params => ({
        url: 'api/report/receive/invoice/details',
        params,
      }),
      providesTags: ['getReceivableInvoiceDetail'],
    }),
    getReceivableSummary: builder.query({
      query: params => ({
        url: 'api/report/receive/receiveable/summary',
        params,
      }),
      providesTags: ['getReceivableSummary'],
    }),
    getReceivableDetail: builder.query({
      query: params => ({
        url: 'api/report/receive/receiveable/details',
        params,
      }),
      providesTags: ['getReceivableDetail'],
    }),
    // activity
    getActivityLogDetail: builder.query({
      query: params => ({
        url: 'api/activity/log/report',
        params,
      }),
      providesTags: ['getActivityLogDetail'],
    }),
    // purchases and expenses
    getPurchaseBySupplier: builder.query({
      query: params => ({
        url: 'api/purchase/by/vendor/report',
        params,
      }),
      providesTags: ['getPurchaseBySupplier'],
    }),
    getPurchaseBySupplierDetail: builder.query({
      query: params => ({
        url: 'api/purchase/by/vendor/report/detail',
        params,
      }),
      providesTags: ['getPurchaseBySupplierDetail'],
    }),
    getPurchaseByItem: builder.query({
      query: params => ({
        url: 'api/purchase/by/item/report',
        params,
      }),
      providesTags: ['getPurchaseByItem'],
    }),
    getPurchaseByItemDetail: builder.query({
      query: params => ({
        url: 'api/purchase/by/item/report/detail',
        params,
      }),
      providesTags: ['getPurchaseByItemDetail'],
    }),
    getExpenseDetails: builder.query({
      query: params => ({
        url: 'api/expense/detail/report',
        params,
      }),
      providesTags: ['getExpenseDetails'],
    }),
    getExpenseByCategory: builder.query({
      query: params => ({
        url: 'api/expense/by/category/report',
        params,
      }),
      providesTags: ['getExpenseByCategory'],
    }),
    getExpenseByCategoryDetail: builder.query({
      query: params => ({
        url: 'api/expense/by/category/report/detail',
        params,
      }),
      providesTags: ['getExpenseByCategoryDetail'],
    }),
  }),
});

export const {
  // payable
  useGetSupplierPayableBalanceQuery,
  useGetSupplierBillBalanceDetailQuery,
  useGetSupplierExcessPaymentBalanceDetailQuery,
  useGetSupplierBalanceDetailQuery,
  useGetApAgingSummaryQuery,
  useGetApAgingDetailQuery,
  useGetPayableBillDetailsQuery,
  useGetPayableDebitNoteDetailQuery,
  useGetPaymentMadeDetailsQuery,
  useGetPurchaseOrderDetailQuery,
  useGetPurchaseOrderBySupplierQuery,
  useGetPayableSummaryQuery,
  useGetPayableDetailQuery,
  useGetSupplierRefundHistoryQuery,
  // receiveables
  useGetReceivableAccountBalanceQuery,
  useGetReceivableInvoiceBalanceAgainstCustomerQuery,
  useGetReceivableCreditNoteBalanceAgainstCustomerQuery,
  useGetReceivableBalanceDetailAgainstCustomerQuery,
  useGetReceivableARAgingSummaryQuery,
  useGetReceivableARAgingDetailQuery,
  useGetReceivableInvoiceDetailQuery,
  useGetReceivableSummaryQuery,
  useGetReceivableDetailQuery,
  // activity
  useGetActivityLogDetailQuery,
  // purchases and expenses
  useGetPurchaseBySupplierQuery,
  useGetPurchaseBySupplierDetailQuery,
  useGetPurchaseByItemQuery,
  useGetPurchaseByItemDetailQuery,
  useGetExpenseDetailsQuery,
  useGetExpenseByCategoryQuery,
  useGetExpenseByCategoryDetailQuery,
} = reportsApi;

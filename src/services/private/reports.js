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
    getPurchaseOrderBySupplierDetail: builder.query({
      query: params => ({
        url: 'api/payables/report/pur/order/by/vendor/detail',
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

    // sales
    getSaleByCustomer: builder.query({
      query: params => ({
        url: 'api/sales/by/customer/report',
        params,
      }),
      providesTags: ['getSaleByCustomer'],
    }),
    getSaleByCustomerDetail: builder.query({
      query: params => ({
        url: 'api/sales/by/customer/detail/report',
        params,
      }),
      providesTags: ['getSaleByCustomerDetail'],
    }),
    getSaleByItem: builder.query({
      query: params => ({
        url: 'api/sales/by/item/report',
        params,
      }),
      providesTags: ['getSaleByItem'],
    }),
    getSaleByItemDetail: builder.query({
      query: params => ({
        url: 'api/sales/by/item/detail/report',
        params,
      }),
      providesTags: ['getSaleByItemDetail'],
    }),
    getSaleBySalePerson: builder.query({
      query: params => ({
        url: 'api/sales/by/sales/person/report',
        params,
      }),
      providesTags: ['getSaleBySalePerson'],
    }),
    getSaleBySalePersonDetail: builder.query({
      query: params => ({
        url: 'api/sales/by/sales/person/detail/report',
        params,
      }),
      providesTags: ['getSaleBySalePersonDetail'],
    }),
    getSaleByType: builder.query({
      query: params => ({
        url: 'api/sales/by/type/report',
        params,
      }),
      providesTags: ['getSaleByType'],
    }),

    // receipt-voucher
    getReceiptVoucherReport: builder.query({
      query: params => ({
        url: 'api/payment/received/report',
        params,
      }),
      providesTags: ['getReceiptVoucherReport'],
    }),
    getCreditNoteDetailReport: builder.query({
      query: params => ({
        url: 'api/payment/received/creditNote/detail/report',
        params,
      }),
      providesTags: ['getCreditNoteDetailReport'],
    }),
    getRefundHistoryReport: builder.query({
      query: params => ({
        url: 'api/payment/received/refund/history/report',
        params,
      }),
      providesTags: ['getRefundHistoryReport'],
    }),
    // acountant
    getAccountTransactions: builder.query({
      query: params => ({
        url: 'api/report/accountant/account/transactions',
        params,
      }),
      providesTags: ['getAccountTransactions'],
    }),
    getAccountTypeSummary: builder.query({
      query: params => ({
        url: 'api/accountant/account/type/summary/report',
        params,
      }),
      providesTags: ['getAccountTypeSummary'],
    }),
    getGeneralLedger: builder.query({
      query: params => ({
        url: 'api/report/accountant/general/ledger',
        params,
      }),
      providesTags: ['getGeneralLedger'],
    }),
    getDetailGeneralLedger: builder.query({
      query: params => ({
        url: 'api/report/accountant/detailed/general/ledger',
        params,
      }),
      providesTags: ['getDetailGeneralLedger'],
    }),
    getJuornalReport: builder.query({
      query: params => ({
        url: 'api/accountant/journal/report',
        params,
      }),
      providesTags: ['getJuornalReport'],
    }),
    getTrialBalance: builder.query({
      query: params => ({
        url: 'api/accountant/trial/balance/report',
        params,
      }),
      providesTags: ['getTrialBalance'],
    }),
    getTrialBalanceAccountDetailReport: builder.query({
      query: params => ({
        url: 'api/accountant/chart/of/account/report/detail',
        params,
      }),
      providesTags: ['getTrialBalanceAccountDetailReport'],
    }),

    // tax
    getTaxReturn: builder.query({
      query: () => ({
        url: 'api/tax/return/',
      }),
      providesTags: ['getTaxReturn'],
    }),
    getTaxReturnDetail: builder.query({
      query: id => ({
        url: `api/tax/return/report?tax_return_id=${id}`,
      }),
      providesTags: ['getTaxReturnDetail'],
    }),

    addTaxReturn: builder.mutation({
      query: payload => ({
        url: 'api/tax/return/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['addTaxReturn'],
      invalidatesTags: ['getTaxReturn', 'getTaxReturnList'],
    }),
    changeTaxReturnStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `api/tax/return/${id}/`,
        method: 'PUT',
        body: payload,
      }),
      providesTags: ['fileTaxReturn'],
      invalidatesTags: ['getTaxReturnDetail', 'getTaxReturn', 'getTaxReturnList'],
    }),
    getTaxReturnDetailInformation: builder.query({
      query: params => ({
        url: 'api/tax/return/report/detail',
        params,
      }),
      providesTags: ['getTaxReturnDetailInformation'],
    }),

    removeTaxReturn: builder.mutation({
      query: id => ({
        url: `api/tax/return/${id}/`,
        method: 'DELETE',
      }),
      providesTags: ['removeTaxReturn'],
      invalidatesTags: ['getTaxReturn', 'getTaxReturnList'],
    }),

    getVATAudit: builder.query({
      query: params => ({
        url: 'api/vatAudit/',
        params,
      }),
      providesTags: ['getVATAudit'],
    }),

    addVATAuditFile: builder.mutation({
      query: payload => ({
        url: 'api/vatAudit/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['constGenerateVatAuditFile'],
      invalidatesTags: ['getVATAudit'],
    }),

    // financial statement
    getProfitAndLossStatement: builder.query({
      query: params => ({
        url: 'api/report/profit/loss',
        method: 'GET',
        params,
      }),
      providesTags: ['getProfitAndLossStatement'],
    }),
    getCashFlowStatement: builder.query({
      query: params => ({
        url: 'api/cash/flow/report',
        method: 'GET',
        params,
      }),
      providesTags: ['getCashFlowStatement'],
    }),
    getDetailCashFlowStatement: builder.query({
      query: params => ({
        url: 'api/accountant/chart/of/account/report/detail',
        method: 'GET',
        params,
      }),
      providesTags: ['getDetailCashFlowStatement'],
    }),
    getBalanceSheetStatement: builder.query({
      query: params => ({
        url: 'api/report/balance/sheet',
        method: 'GET',
        params,
      }),
      providesTags: ['getBalanceSheetStatement'],
    }),

    // activity
    getActivityLogs: builder.query({
      query: params => ({
        url: '/api/user/custom/logs',
        method: 'GET',
        params,
      }),
      providesTags: ['getActivityLogs'],
    }),
    getActivityLogsDetail: builder.query({
      query: id => ({
        url: `/api/user/custom/logs/${id}/`,
        method: 'GET',
      }),
      providesTags: ['getActivityLogsDetail'],
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
  useGetPurchaseOrderBySupplierDetailQuery,
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
  // sales
  useGetSaleByCustomerQuery,
  useGetSaleByCustomerDetailQuery,
  useGetSaleByItemQuery,
  useGetSaleByItemDetailQuery,
  useGetSaleBySalePersonQuery,
  useGetSaleBySalePersonDetailQuery,
  useGetSaleByTypeQuery,
  // receipt voucher
  useGetReceiptVoucherReportQuery,
  useGetCreditNoteDetailReportQuery,
  useGetRefundHistoryReportQuery,
  // accountant
  useGetAccountTransactionsQuery,
  useGetAccountTypeSummaryQuery,
  useGetGeneralLedgerQuery,
  useGetDetailGeneralLedgerQuery,
  useGetJuornalReportQuery,
  useGetTrialBalanceQuery,
  useGetTrialBalanceAccountDetailReportQuery,

  // tax
  useGetTaxReturnQuery,
  useGetTaxReturnDetailQuery,
  useGetTaxReturnDetailInformationQuery,
  useAddTaxReturnMutation,
  useChangeTaxReturnStatusMutation,
  useRemoveTaxReturnMutation,
  useGetVATAuditQuery,
  useAddVATAuditFileMutation,

  // final report
  useGetProfitAndLossStatementQuery,
  useGetCashFlowStatementQuery,
  useGetDetailCashFlowStatementQuery,
  useGetBalanceSheetStatementQuery,

  // activity
  useGetActivityLogsQuery,
  useGetActivityLogsDetailQuery,
} = reportsApi;

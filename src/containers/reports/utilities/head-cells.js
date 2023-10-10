// payables
export const supplierPaybleBalanceReportHeadCells = [
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'BILL BALANCE' },
  { title: 'EXCESS PAYMENTS' },
  { title: 'BALANCE' },
];
export const apAgingSummaryReportHeadCells = [
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'CURRENT' },
  { title: '1-15 DAYS' },
  { title: '16-30 DAYS' },
  { title: '31-45 DAYS' },
  { title: '> 45 DAYS' },
  { title: 'TOTAL' },
];
export const apAgingDetailReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION#' },
  { title: 'TYPE' },
  { title: 'SUPPLIER NAME' },
  { title: 'AGE' },
  { title: 'TOTAL' },
  { title: 'REMAINING' },
];
export const payableBillDetailsReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'BILL DATE' },
  { title: 'BILL#' },
  { title: 'CUSTOMER NAME' },
  { title: 'BILL AMOUNT' },
];
export const payableDebitNoteReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'SUPPLIER CREDIT DATE' },
  { title: 'DEBIT NOTE#' },
  { title: 'SUPPLIER NAME' },
  { title: 'AMOUNT' },
  { title: 'BALANCE AMOUNT' },
];
export const paymentMadeReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'REFERENCE#' },
  { title: 'BILL#' },
  { title: 'SUPPLIER NAME' },
  { title: 'PAYMENT MODE' },
  { title: 'PAID THROUGH' },
  { title: 'AMOUNT' },
  { title: 'UNUSED AMOUNT' },
];
export const payablePurchaseOrderDetailReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'PURCHASE ORDER NUMBER' },
  { title: 'SUPPLIER NAME' },
  { title: 'AMOUNT' },
];
export const payablePurchaseOrderBySupplierReportHeadCells = [
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'PURCHASE ORDER COUNT' },
  { title: 'AMOUNT' },
];
export const payableSummaryReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'TRANSACTION #' },
  { title: 'SUPPLIER NAME' },
  { title: 'TRANSACTION TYPE' },
  { title: 'TOTAL AMOUNT' },
  { title: 'REMAINING Amount' },
];
export const payableDetailReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'TRANSACTION #' },
  { title: 'SUPPLIER NAME' },
  { title: 'TRANSACTION TYPE' },
  { title: 'ITEM NAME' },
  { title: 'ITEM PRICE' },
  { title: 'QUANTITY ORDERED' },
  { title: 'TOTAL AMOUNT' },
];
export const supplierRefundHistoryReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'REFERENCE#' },
  { title: 'TRANSACTION #' },
  { title: 'SUPPLIER NAME' },
  { title: 'MODE' },
  { title: 'AMOUNT' },
];

// receivables
export const receivablesAccountBalanceReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'INVOICE BALANCE' },
  { title: 'AVAILABLE CREDITS' },
  { title: 'BALANCE' },
];
export const receivablesInvoiceBalanceAgainstCustomerReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION #' },
  { title: 'TRANSACTION TYPE' },
  { title: 'AMOUNT' },
  { title: 'BALANCE' },
];
export const receivablesARAgingSummaryReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'CURRENT' },
  { title: '1-15 DAYS' },
  { title: '16-30 DAYS' },
  { title: '31-45 DAYS' },
  { title: '> 45 DAYS' },
  { title: 'TOTAL' },
];
export const receivablesARAgingDetailReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION#' },
  { title: 'TYPE' },
  { title: 'CUSTOMER NAME' },
  { title: 'AGE' },
  { title: 'AMOUNT' },
  { title: 'BALANCE DUE' },
];
export const receivablesSummaryReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'TRANSACTION #' },
  { title: 'STATUS' },
  { title: 'TRANSACTION TYPE' },
  { title: 'TOTAL AMOUNT' },
  { title: 'REMAINING Amount' },
];
export const receivablesDetailReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'TRANSACTION #' },
  { title: 'STATUS' },
  { title: 'TRANSACTION TYPE' },
  { title: 'ITEM NAME' },
  { title: 'ITEM PRICE' },
  { title: 'QUANTITY ORDERED' },
  { title: 'TOTAL AMOUNT' },
];

// purchase and expenses
export const purchaseBySupplierReportHeadCells = [
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'EXPENSE COUNT' },
  { title: 'BILL COUNT' },
  { title: 'DEBIT NOTE COUNT' },
  { title: 'AMOUNT' },
];
export const purchaseBySupplierDetailReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'TRANSACTION#' },
  { title: 'AMOUNT' },
  { title: 'BALANCE AMOUNT' },
];
export const purchaseByItemReportHeadCells = [
  { title: 'ITEM NAME', style: { textAlign: 'start' } },
  { title: 'QUANTITY PURCHASED' },
  { title: 'AMOUNT' },
  { title: 'AVERAGE PRICE' },
];
export const purchaseByItemDetailReportHeadCells = [
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'QUANTITY PURCHASED' },
  { title: 'AMOUNT' },
  { title: 'AVERAGE PRICE' },
];
export const expenseDetailReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'REFERENCE#' },
  { title: 'SUPPLIER NAME' },
  { title: 'EXPENSE ACCOUNT' },
  { title: 'AMOUNT' },
  { title: 'AMOUNT WITH TAX' },
];
export const expenseByCategoryReportHeadCells = [
  { title: 'CATEGORY NAME', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'AMOUNT WITH TAX' },
];
export const expenseByCategoryDetailReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TYPE' },
  { title: 'SUPPLIER NAME' },
  { title: 'AMOUNT' },
  { title: 'AMOUNT WITH TAX' },
];

// sales
export const saleByCustomerReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'INVOICE COUNT' },
  { title: 'SALES' },
  { title: 'SALES WITH TAX' },
];
export const saleByCustomerDetailReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TYPE' },
  { title: 'STATUS' },
  { title: 'TRANSACTION NUMBER' },
  { title: 'SALES' },
  { title: 'SALES WITH TAX' },
  { title: 'BALANCE DUE' },
];
export const saleByItemReportHeadCells = [
  { title: 'ITEM NAME', style: { textAlign: 'start' } },
  { title: 'QUANTITY SOLD' },
  { title: 'AMOUNT' },
  { title: 'AVERAGE PRICE' },
];
export const saleByItemDetailReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'QUANTITY' },
  { title: 'AMOUNT' },
  { title: 'AVERAGE PRICE' },
];
export const saleBySalePersonReportHeadCells = [
  { title: 'NAME', style: { textAlign: 'start' } },
  { title: 'INVOICE COUNT' },
  { title: 'INVOICE SALES' },
  { title: 'INVOICE SALES WITH TAX' },
  { title: 'CREDIT NOTE COUNT' },
  { title: 'CREDIT NOTE SALES' },
  { title: 'CREDIT NOTE SALES WITH TAX' },
  { title: 'TOTAL SALES' },
  { title: 'TOTAL SALES WITH TAX' },
];
export const saleBySalePersonDetailReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TYPE' },
  { title: 'STATUS' },
  { title: 'NUMBER' },
  { title: 'CUSTOMER NAME' },
  { title: 'SALES' },
  { title: 'SALES WITH TAX' },
  { title: 'BALANCE DUE' },
];

// receipt voucher

export const receiptVoucherReportHeadCells = [
  { title: 'PAYMENT#', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'REFERENCE#' },
  { title: 'CUSTOMER NAME' },
  { title: 'PAYMENT MODE' },
  { title: 'INVOICE#' },
  { title: 'DEPOSIT TO' },
  { title: 'AMOUNT' },
  { title: 'UNUSED AMOUNT' },
];

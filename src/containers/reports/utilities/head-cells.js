import { tableCellHeader } from 'styles/components/custom-hooks/use-excel-sheet';

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
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'TYPE', style: { textAlign: 'start' } },
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'AGE' },
  { title: 'TOTAL' },
  { title: 'REMAINING' },
];
export const payableBillDetailsReportHeadCells = [
  { title: 'Inovice#', style: { textAlign: 'start' } },
  { title: 'Invoice Date', style: { textAlign: 'start' } },
  { title: 'Supplier Name', style: { textAlign: 'start' } },
  { title: 'Supplier Invoice #', style: { textAlign: 'start' } },
  { title: 'Gross Amount' },
  { title: 'Tax Amount' },
  { title: 'Net Amount' },
  { title: 'Due Date', style: { textAlign: 'center' } },
  { title: 'STATUS' },
];
export const payableDebitNoteReportHeadCells = [
  { title: 'DEBIT NOTE#', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'BALANCE AMOUNT' },
  { title: 'STATUS' },
];
export const paymentMadeReportHeadCells = [
  { title: 'Invoice#', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'REFERENCE#', style: { textAlign: 'start' } },
  { title: 'PAYMENT MODE', style: { textAlign: 'start' } },
  { title: 'PAID THROUGH', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'UNUSED AMOUNT' },
];
export const payablePurchaseOrderDetailReportHeadCells = [
  { title: 'PURCHASE ORDER#', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'STATUS' },
];
export const payablePurchaseOrderBySupplierReportHeadCells = [
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'PURCHASE ORDER COUNT', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
];
export const payablePurchaseOrderBySupplierDetailReportHeadCells = [
  { title: 'PURCHASE Order#', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'STATUS' },
];
export const payableSummaryReportHeadCells = [
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'TRANSACTION TYPE', style: { textAlign: 'start' } },
  { title: 'TOTAL AMOUNT' },
  { title: 'REMAINING AMOUNT' },
  { title: 'STATUS' },
];
export const payableDetailReportHeadCells = [
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'TRANSACTION TYPE', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'ITEM NAME', style: { textAlign: 'start' } },
  { title: 'ITEM PRICE' },
  { title: 'QUANTITY ORDERED' },
  { title: 'TOTAL AMOUNT' },
  { title: 'STATUS' },
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
  { title: 'TRANSACTION #', style: { textAlign: 'start' } },
  { title: 'TRANSACTION TYPE', style: { textAlign: 'start' } },
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
export const receivableInvoiceDetailsReportHeadCells = [
  { title: 'Inovice#', style: { textAlign: 'start' } },
  { title: 'Invoice Date', style: { textAlign: 'start' } },
  { title: 'Customer Name', style: { textAlign: 'start' } },
  { title: 'Gross Amount' },
  { title: 'Tax Amount' },
  { title: 'Net Amount' },
  { title: 'STATUS' },
];
export const receivablesARAgingDetailReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'TYPE', style: { textAlign: 'start' } },
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'AGE' },
  { title: 'AMOUNT' },
  { title: 'BALANCE DUE' },
];
export const receivablesSummaryReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'TRANSACTION TYPE', style: { textAlign: 'start' } },
  { title: 'TOTAL AMOUNT' },
  { title: 'REMAINING Amount' },
  { title: 'STATUS' },
];
export const receivablesDetailReportHeadCells = [
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'TRANSACTION TYPE', style: { textAlign: 'start' } },
  { title: 'ITEM NAME', style: { textAlign: 'start' } },
  { title: 'ITEM PRICE' },
  { title: 'QUANTITY ORDERED' },
  { title: 'TOTAL AMOUNT' },
  { title: 'STATUS' },
];

// purchase and expenses
export const purchaseBySupplierReportHeadCells = [
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'EXPENSE COUNT' },
  { title: 'BILL COUNT' },
  { title: 'DEBIT NOTE COUNT' },
  { title: 'AMOUNT' },
  { title: 'AMOUNT WITH TAX' },
];
export const purchaseBySupplierDetailReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'AMOUNT WITH TAX' },
  { title: 'BALANCE AMOUNT' },
  { title: 'STATUS' },
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
  { title: 'SUPPLIER NAME', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'REFERENCE#', style: { textAlign: 'start' } },
  { title: 'EXPENSE ACCOUNT', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'AMOUNT WITH TAX' },
  { title: 'STATUS' },
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
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'TYPE', style: { textAlign: 'start' } },
  { title: 'SALES' },
  { title: 'SALES WITH TAX' },
  { title: 'BALANCE DUE' },
  { title: 'STATUS' },
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
  { title: 'INVOICE#', style: { textAlign: 'start' } },
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'REFERENCE#', style: { textAlign: 'start' } },
  { title: 'PAYMENT MODE', style: { textAlign: 'start' } },
  { title: 'DEPOSIT TO', style: { textAlign: 'start' } },
  { title: 'AMOUNT' },
  { title: 'UNUSED AMOUNT' },
];
export const creditNoteDetailReportHeadCells = [
  { title: 'CREDIT NOTE#', style: { textAlign: 'start' } },
  { title: 'CREDIT DATE', style: { textAlign: 'start' } },
  { title: 'CUSTOMER NAME', style: { textAlign: 'start' } },
  { title: 'CREDIT NOTE AMOUNT' },
  { title: 'BALANCE AMOUNT' },
  { title: 'STATUS' },
];
export const customerRefundReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'REFERENCE#' },
  { title: 'TRANSACTION#' },
  { title: 'CUSTOMER NAME' },
  { title: 'MODE' },
  { title: 'AMOUNT' },
];

// accountant
export const accountTransactionReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'ACCOUNT', style: { textAlign: 'start' } },
  { title: 'Sub Account', style: { textAlign: 'start' } },
  { title: 'TYPE', style: { textAlign: 'start' } },
  { title: 'TRANSACTION#', style: { textAlign: 'start' } },
  { title: 'Remarks', style: { textAlign: 'start' } },
  { title: 'DEBIT' },
  { title: 'CREDIT' },
];
export const accountTypeSummaryReportHeadCells = [
  { title: 'Account Type', style: { textAlign: 'start' } },
  { title: 'DEBIT' },
  { title: 'CREDIT' },
];
export const generalLedgerReportHeadCells = [
  { title: 'Account', style: { textAlign: 'start' } },
  { title: 'DEBIT' },
  { title: 'CREDIT' },
  { title: 'AMOUNT' },
];
export const detailGeneralLedgerReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'ACCOUNT', style: { textAlign: 'start' } },
  { title: 'TRANSACTION DETAILS' },
  { title: 'TRANSACTION TYPE' },
  { title: 'TRANSACTION#' },
  { title: 'REFERENCE#' },
  { title: 'DEBIT' },
  { title: 'CREDIT' },
  { title: 'AMOUNT' },
];
export const journalReportHeadCells = [
  { title: 'Account Name', style: { textAlign: 'start' } },
  { title: 'DEBIT' },
  { title: 'CREDIT' },
];
export const trialBalanceReportHeadCells = [
  { title: 'Account', style: { textAlign: 'left' }, key: 'chart_of_account' },
  { title: 'DEBIT', style: { textAlign: 'right' } },
  { title: 'CREDIT', style: { textAlign: 'right' } },
];
// tax
export const taxReturnReportHeadCells = [
  { title: 'STATUS', style: { textAlign: 'start' } },
  { title: 'TAX RETURNS' },
  { title: 'FILED ON' },
  { title: 'TOTAL TAX PAYABLE' },
  { title: 'BALANCE DUE' },
  { title: 'ACTION' },
];
export const VATAuditReportHeadCells = [
  { title: 'AUDIT START DATE', style: { textAlign: 'start' } },
  { title: 'AUDIT END DATE' },
  { title: 'GENERATED BY' },
  { title: 'GENERATED DATE' },
  { title: 'AUDIT FILE' },
];
export const taxReturnDetailInformationReportHeadCells = [
  { title: 'DATE', style: { textAlign: 'start' } },
  { title: 'ENTRY#' },
  { title: 'TRANSACTION TYPE' },
  { title: 'TAXABLE AMOUNT' },
  { title: 'TAX AMOUNT' },
];

export const singleVATAuditReportHeadCells = [
  {
    value: 'Supplier Name',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'Supplier Country',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'Supplier TRN',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'Invoice Date',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'Invoice No.',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'Permit No.',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'TransactionID',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'Line No.',
    excelSheetStyle: tableCellHeader,
  },
  { value: 'Product Description', excelSheetStyle: tableCellHeader },
  { value: 'Purchase Value (AED)', excelSheetStyle: tableCellHeader },
  { value: 'VAT Value (AED)', excelSheetStyle: tableCellHeader },
  { value: 'Tax Code', excelSheetStyle: tableCellHeader },
  { value: 'VAT FCY', excelSheetStyle: tableCellHeader },
  { value: 'Purchase FCY', excelSheetStyle: tableCellHeader },
  { value: 'FCY Code', excelSheetStyle: tableCellHeader },
];
export const singleVatAuditReportTotalHeadCells = [
  {
    value: 'Transaction Count Total',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'Supply Total (AED)',
    excelSheetStyle: tableCellHeader,
  },
  {
    value: 'VAT Total (AED)',
    excelSheetStyle: tableCellHeader,
  },
];

// financial report
export const profitAndLossStatementHeadCells = [
  {
    title: 'ACCOUNT',
    style: { textAlign: 'start', fontSize: 12 },
  },
  {
    title: 'TOTAL',
    style: { fontSize: 12 },
  },
];
// activity
export const activityLogsHeadCells = [
  {
    title: 'DATE',
    style: { textAlign: 'left' },
  },
  {
    title: 'Activity',
    style: { textAlign: 'left' },
  },
  {
    title: 'Description',
    style: { textAlign: 'left' },
  },
  // {
  //   title: 'User Name',
  //   style: { textAlign: 'left' },
  // },
];
export const activityLogsExcelHeadCells = [
  {
    title: 'DATE',
    style: { textAlign: 'left' },
  },
  {
    title: 'Request Method',
    style: { textAlign: 'left' },
  },
  {
    title: 'ACTIVITY DETAILS',
  },
  { title: 'SUPPLIER ACCOUNT' },
  {
    title: 'DESCRIPTION',
    style: { textAlign: 'left' },
  },
  {
    title: 'ACTION PERFORMED BY',
    style: { textAlign: 'left' },
  },
];

export const vatReturnDetailTableCellStyle = { border: '1px solid lightgrey' };

export const taxReturnDetailTableHeadCells = [
  {
    title: '#',
    style: { textAlign: 'start', ...vatReturnDetailTableCellStyle },
  },
  {
    title: 'DESCRIPTION',
    style: { ...vatReturnDetailTableCellStyle, textAlign: 'start' },
  },
  {
    title: 'TAXABLE AMOUNT',
    style: { ...vatReturnDetailTableCellStyle },
  },
  {
    title: 'TAX AMOUNT',
    style: { ...vatReturnDetailTableCellStyle },
  },
];
export const taxReturnDetailTableHeadCellsWithoutTablableAmount = [
  {
    title: '#',
    style: { textAlign: 'start', ...vatReturnDetailTableCellStyle },
  },
  {
    title: 'DESCRIPTION',
    style: { ...vatReturnDetailTableCellStyle, textAlign: 'start' },
  },

  {
    title: 'TAX AMOUNT',
    style: { ...vatReturnDetailTableCellStyle },
  },
];

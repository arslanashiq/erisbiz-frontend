// export const supplierPaybleBalanceReportHeadCells = [
//   {
//     id: 'supplier__supplier_name',
//     numeric: false,
//     disablePadding: true,
//     label: 'SUPPLIER NAME',
//     align: 'left',
//     isLink: true,
//     handleLink: row => `/pages/accounting/purchase/suppliers/${row.supplier__id}/detail`,
//   },
//   {
//     id: 'bill_balance',
//     numeric: true,
//     disablePadding: false,
//     label: 'BILL BALANCE',
//     align: 'right',
//     isLink: true,
//     handleLink: row => {
//       const query = window.location.search;

//       if (query && query.length > 0) {
//         return `/pages/reports/supplierBalances/bill/detail${window.location.search}&supplier_id=${row.supplier__id}`;
//       }
//       return `/pages/reports/supplierBalances/bill/detail?supplier_id=${row.supplier__id}`;
//     },
//   },
//   {
//     id: 'credit_balance',
//     numeric: true,
//     disablePadding: false,
//     label: 'EXCESS PAYMENTS',
//     align: 'right',
//     isLink: true,
//     handleLink: row => {
//       const query = window.location.search;
//       if (query && query.length > 0) {
//         return `/pages/reports/supplierBalances/detail${query}&supplier_id=${row.supplier__id}`;
//       }
//       return `/pages/reports/supplierBalances/detail?supplier_id=${row.supplier__id}`;
//     },
//   },
//   {
//     id: 'balance',
//     numeric: true,
//     disablePadding: false,
//     label: 'BALANCE',
//     align: 'right',
//     mergeCell: true,
//   },
// ];
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
export const payableBillDetailsReportHeadCells = [
  { title: 'status', style: { textAlign: 'start' } },
  { title: 'BILL DATE' },
  { title: 'DUE DATE' },
  { title: 'BILL#' },
  { title: 'SUPPLIER NAME' },
  { title: 'BILL AMOUNT' },
];
export const payablePurchaseOrderDetailReportHeadCells = [
  { title: 'status', style: { textAlign: 'start' } },
  { title: 'DATE' },
  { title: 'PURCHASE ORDER NUMBER' },
  { title: 'SUPPLIER NAME' },
  { title: 'AMOUNT' },
];

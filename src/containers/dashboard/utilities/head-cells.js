export const currentMonthSalesHeadCells = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: true,
    isDate: true,
  },
  {
    id: 'invoice_formatted_number',
    disablePadding: false,
    label: 'Invoice #',
    align: 'left',
  },
  {
    id: 'without_change_grand_total',
    disablePadding: false,
    label: 'Amount',
    align: 'left',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const productCategoryStockPositionHeadCells = [
  {
    id: 'category_name',
    numeric: false,
    disablePadding: true,
    label: 'Category',
    align: 'left',
    isLink: true,
  },
  {
    id: 'item_count',
    disablePadding: false,
    label: 'Total Stock',
    align: 'left',
  },
];
export const totalReceivablesHeadCells = [
  {
    id: 'invoice_formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Customer',
    align: 'left',
    isLink: true,
  },
  {
    id: 'branch_name',
    disablePadding: false,
    label: 'Open Account',
    align: 'left',
  },
];

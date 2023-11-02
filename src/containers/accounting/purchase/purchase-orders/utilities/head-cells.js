import { handleGetStatusBaseClass } from 'utilities/status-base-style';

export const purchaseOrderHeadCells = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },
  {
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier Name',
    align: 'left',
  },
  {
    id: 'pur_order_num',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order Number',
    align: 'center',
    isLink: true,
  },

  {
    id: 'created_by_employee_name',
    numeric: true,
    disablePadding: false,
    label: 'Add By',
    align: 'left',
  },

  {
    id: 'without_change_amount_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount Total',
    align: 'left',
  },
  {
    id: 'currency_symbol',
    numeric: true,
    disablePadding: false,
    label: 'Currency',
    align: 'left',
  },
  {
    id: 'without_change_vat_total',
    numeric: true,
    disablePadding: false,
    label: 'VAT Total',
    align: 'center',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    class: handleGetStatusBaseClass,
  },
];

export const test = '';

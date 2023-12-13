import formatAmount from 'utilities/formatAmount';
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
    label: 'Supplier ',
    align: 'left',
  },
  {
    id: 'pur_order_num',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order',
    align: 'left',
    isLink: true,
  },

  {
    id: 'without_change_amount_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    cellValueAction: (value, currencySymbol) => `${currencySymbol}${formatAmount(value)}`,
  },
  {
    id: 'without_change_vat_total',
    numeric: true,
    disablePadding: false,
    label: 'VAT',
    align: 'left',
    cellValueAction: (value, currencySymbol) => `${currencySymbol}${formatAmount(value)}`,
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

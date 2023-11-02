import { handleGetStatusBaseClass } from 'utilities/status-base-style';

export const quotationsHeadCell = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'quotation_formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Quotation Number',
    align: 'left',
    isLink: true,
  },
  {
    id: 'customer_info',
    numeric: true,
    disablePadding: false,
    label: 'Customer Name',
    align: 'left',
    cellValueAction: customerInfo => customerInfo.customer_name,
  },
  // {
  //   id: 'sales_person',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Sale Person',
  //   align: 'right',
  // },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    class: handleGetStatusBaseClass,
  },
  // {
  //   id: 'created_by_employee_name',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Added By',
  //   align: 'right',
  // },
  {
    id: 'without_change_amount_total',
    numeric: true,
    disablePadding: false,
    label: 'Gross Total',
    align: 'left',
    mergeCell: true,
  },
  {
    id: 'without_change_vat_total',
    numeric: true,
    disablePadding: false,
    label: 'VAT',
    align: 'center',
    mergeCell: true,
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
    align: 'center',
    mergeCell: true,
  },
];

export const test = '';

export const performaInvoiceHeadCell = [
  {
    id: 'pro_invoice_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'pro_invoice_formatted_number',
    numeric: false,
    disablePadding: true,
    label: 'Invoice Number',
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
    class: value => {
      const temp = value.toLowerCase();
      if (temp === 'invoiced') return 'color-primary';
      if (temp === 'draft') return 'color-silver';
      if (temp === 'cancelled') return 'color-danger';

      return '';
    },
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
    align: 'left',
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

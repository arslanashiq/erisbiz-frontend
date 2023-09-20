export const invoiceHeadCell = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'invoice_formatted_number',
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
    align: 'right',
    cellValueAction: customerInfo => customerInfo.customer_name,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'right',
  },
  {
    id: 'created_by_employee_name',
    numeric: true,
    disablePadding: false,
    label: 'Added By',
    align: 'right',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'right',
    class: value => {
      const temp = value.toLowerCase();
      if (temp === 'invoiced') return 'color-primary';
      if (temp === 'draft') return 'color-silver';
      if (temp === 'cancelled') return 'color-danger';

      return '';
    },
  },

  {
    id: 'without_change_amount_total',
    numeric: true,
    disablePadding: false,
    label: 'Gross Total',
    align: 'center',
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
    label: 'Total (FCY)',
    align: 'center',
    mergeCell: true,
  },
  {
    id: 'bcy_grand_total_invoice_currency',
    disablePadding: false,
    label: 'Total (BCY)',
    align: 'center',
    mergeCell: true,
  },
];
export const test = '';

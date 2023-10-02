import moment from 'moment';

export const taxReturnsHeadCell = [
  {
    id: 'tax_returns',
    numeric: false,
    disablePadding: true,
    label: 'Tax Return',
    align: 'left',
    date: true,
  },
  {
    id: 'total_tax_payable',
    numeric: false,
    disablePadding: true,
    label: 'Total Tax Payable',
    align: 'left',
    mergeCell: true,
    // cellValueAction: tax => formatAmount(tax),
  },
  {
    id: 'amount_due',
    numeric: true,
    disablePadding: false,
    label: 'Balance Due',
    align: 'left',
    mergeCell: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    class: value => {
      if (!value) return '';
      const temp = value.toLowerCase();
      if (temp === 'invoiced') return 'color-primary';
      if (temp === 'draft') return 'color-silver';
      if (temp === 'cancelled') return 'color-danger';

      return '';
    },
  },
];
export const taxReturnsPaymentsHeadCell = [
  {
    id: 'tax_return',
    numeric: false,
    disablePadding: true,
    label: 'Tax Return',
    align: 'left',
    date: true,
    cellValueAction: tax => moment(tax.filed_on).format('MMMM-YYYY'),
  },
  {
    id: 'payment_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
  },
  {
    id: 'amount_applied',
    numeric: true,
    disablePadding: false,
    label: 'Amount Paid',
    align: 'left',
    mergeCell: true,
  },
];

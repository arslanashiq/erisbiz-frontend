export const quotationsHeadCell = [
  {
    id: 'quotation_date',
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
    id: 'sales_account_name',
    numeric: true,
    disablePadding: false,
    label: 'Sales Account Name',
    align: 'right',
  },
  {
    id: 'sales_company_name',
    numeric: true,
    disablePadding: false,
    label: 'Company Name',
    align: 'right',
  },
  {
    id: 'sales_person',
    numeric: true,
    disablePadding: false,
    label: 'Sale Person',
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
    id: 'created_by_employee_name',
    numeric: true,
    disablePadding: false,
    label: 'Added By',
    align: 'right',
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
    id: 'grand_total_aed',
    disablePadding: false,
    label: 'Total (BCY)',
    align: 'center',
    mergeCell: true,
  },
];

export const test = '';

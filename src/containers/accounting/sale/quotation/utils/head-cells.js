/* eslint-disable */
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
    id: 'quotation_num',
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
      else if (temp === 'draft') return 'color-silver';
      else if (temp === 'cancelled') return 'color-danger';

      return '';
    },
  },
];

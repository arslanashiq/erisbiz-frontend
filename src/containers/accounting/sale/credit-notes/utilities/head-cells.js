export const creditNoteHeadCells = [
  {
    id: 'credit_note_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'invoice_num_with_suffix',
    numeric: false,
    disablePadding: true,
    label: 'Sale Invoice Number',
    align: 'left',
  },
  {
    id: 'credit_note_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Credit Note Number',
    align: 'left',
    isLink: true,
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
      if (!value) return '';
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
];

export const test = '';

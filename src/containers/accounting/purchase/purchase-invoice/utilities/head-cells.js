export const purchaseInvoiceHeadCells = [
  {
    id: 'bill_date',
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
    id: 'bill_num',
    numeric: true,
    disablePadding: false,
    label: 'Bill Number',
    align: 'left',
    isLink: true,
  },

  {
    id: 'bill_formated_number',
    numeric: true,
    disablePadding: false,
    label: 'Refrence #',
    align: 'left',
  },

  {
    id: 'due_date',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
    align: 'left',
    date: true,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
    style: value => {
      if (value.includes('overdue')) {
        return {
          color: 'red',
        };
      }
      return {};
    },
  },
  {
    id: 'currency_symbol',
    numeric: true,
    disablePadding: false,
    label: 'currency',
    align: 'left',
  },
  {
    id: 'without_change_grand_total',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
  },
];

export const paymentsAgainstPurchaseInvoiceHeadCells = [
  {
    id: 'payment_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    date: true,
  },
  {
    id: 'payment_number',
    numeric: true,
    disablePadding: false,
    label: 'Payment',
    isLink: true,
    align: 'left',
    handleLink: data => `/pages/accounting/purchase/payment-voucher/${data.payment_id}/detail`,
  },
  {
    id: 'reference_number',
    numeric: true,
    disablePadding: false,
    label: 'Reference#',
    align: 'left',
  },

  {
    id: 'payment_mode',
    numeric: true,
    disablePadding: false,
    label: 'Payment Mode',
    align: 'left',
  },

  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    mergeCell: true,
  },
];

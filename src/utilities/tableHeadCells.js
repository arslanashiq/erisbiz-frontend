/* eslint-disable no-else-return */
export const BankingHeadCells = [
  {
    id: 'bank_account_name',
    numeric: false,
    disablePadding: true,
    label: 'Account Name',
    align: 'left',
    isLink: true,
  },
  {
    id: 'bank_name',
    disablePadding: false,
    label: 'Bank Name',
    align: 'left',
  },
  {
    id: 'account_number',
    disablePadding: false,
    label: 'Account Number',
  },
  {
    id: 'is_active',
    disablePadding: false,
    label: 'Status',
    align: 'left',
    cellValueAction: value => {
      if (value === true) return 'Activated';
      return 'Deactivated';
    },
  },
];
export const bankTransactionsHeadCells = [
  {
    id: 'transaction_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    // date: true,
  },
  {
    id: 'reference_number',
    disablePadding: false,
    label: 'Reference Number',
    align: 'left',
  },
  {
    id: 'bcy_debit',
    disablePadding: false,
    label: 'Debit',
  },
  {
    id: 'bcy_credit',
    disablePadding: false,
    label: 'Credit',
  },
  {
    id: 'amount_without_tax',
    disablePadding: false,
    label: 'Amount',
  },
];
export const itemsHeadCell = [
  {
    id: 'item_name',
    numeric: false,
    disablePadding: true,
    label: 'Item Name',
    align: 'left',
    isLink: true,
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Item Type',
    align: 'right',
  },
  {
    id: 'sale_description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
    align: 'right',
  },
  {
    id: 'is_active',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'right',
  },
];

export const brandsHeadCells = [
  {
    id: 'brand_name',
    numeric: false,
    disablePadding: true,
    label: 'Brand Name',
    align: 'left',
    isLink: false,
  },
  {
    id: 'brand_region',
    numeric: true,
    disablePadding: false,
    label: 'Region/Country',
    align: 'left',
  },
];
export const supplierHeadCells = [
  {
    id: 'supplier_name',
    numeric: false,
    disablePadding: true,
    label: 'Supplier Name',
    align: 'left',
    isLink: false,
  },
  {
    id: 'primary_contact_phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
    align: 'left',
  },
  {
    id: 'primary_contact_mobile',
    numeric: true,
    disablePadding: false,
    label: 'Mobile',
    align: 'left',
  },

  {
    id: 'primary_contact_email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
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
    id: 'payables',
    numeric: true,
    disablePadding: false,
    label: 'Payables',
    align: 'left',
  },
];

export const purchaseOrderHeadCells = [
  {
    id: 'pur_order_date',
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
    label: 'currency',
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
    style: value => {
      if (value === 'issued') {
        return {
          color: 'green',
        };
      } else if (value === 'closed') {
        return { color: 'red' };
      } else {
        return {};
      }
    },
  },
];

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
  {
    id: 'amount_due_bill_currency',
    numeric: true,
    disablePadding: false,
    label: 'Due Amount',
    align: 'left',
  },
];
export const supplierCreditHeadCells = [
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
    id: 'debit_note_number',
    numeric: true,
    disablePadding: false,
    label: 'Debit Note Number',
    align: 'left',
  },
  {
    id: 'bill_num',
    numeric: true,
    disablePadding: false,
    label: 'Bill Number',
    align: 'left',
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
  {
    id: 'amount_due_bill_currency',
    numeric: true,
    disablePadding: false,
    label: 'Balance',
    align: 'left',
  },
];

export const expensesHeadCells = [
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
    id: 'expense_amount',
    numeric: true,
    disablePadding: false,
    label: 'Expense Amount',
    align: 'left',
  },
  {
    id: 'refrence',
    numeric: true,
    disablePadding: false,
    label: 'Refrence #',
    align: 'left',
  },
  {
    id: 'padid_through',
    numeric: true,
    disablePadding: false,
    label: 'Paid Through',
    align: 'left',
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
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
  },
];

export const itemInventoryAdjustmentTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'inventory_number',
    numeric: true,
    disablePadding: false,
    label: 'Inventory Number',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemQuotationTransactionHeadCells = [
  {
    id: 'quotation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'quotation_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Qutation #',
    align: 'left',
  },
  {
    id: 'event',
    numeric: true,
    disablePadding: false,
    label: 'Event',
    align: 'left',
  },
  {
    id: 'grand_total_aed',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemPerformaInvoiceTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'performa-Invoice',
    numeric: true,
    disablePadding: false,
    label: 'Performa Invoice #',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemInvoiceTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'invoice',
    numeric: true,
    disablePadding: false,
    label: 'Invoice #',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemCreditNoteTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'credit_note',
    numeric: true,
    disablePadding: false,
    label: 'Credit Note #',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemPurchaseOrderTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'purchase_order',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order #',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemBillTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'bill',
    numeric: true,
    disablePadding: false,
    label: 'Bill #',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];
export const itemDebitNoteTransactionHeadCells = [
  {
    id: 'qutation_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'debit_note',
    numeric: true,
    disablePadding: false,
    label: 'Debit Note #',
    align: 'left',
  },
  {
    id: 'reason',
    numeric: true,
    disablePadding: false,
    label: 'Reason',
    align: 'left',
  },
  {
    id: 'item_type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
    align: 'left',
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'left',
  },
];

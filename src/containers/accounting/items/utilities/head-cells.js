/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Typography } from '@mui/material';

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
    align: 'left',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
    align: 'left',
    style: () => ({
      maxWidth: '200px',
    }),
    cellValueAction: description => {
      if (!description) return '';
      return (
        <Typography noWrap sx={{ fontSize: 14 }}>
          {description}
        </Typography>
      );
    },
  },
  {
    id: 'is_active',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'right',
  },
];

// item transactions cells
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
    id: 'date',
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
    isLink: true,
    handleLink: row => `/pages/accounting/sales/quotations/${row.uuid}/detail`,
  },

  {
    id: 'gross_total_amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    formatAmount: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemProformaInvoiceTransactionHeadCells = [
  {
    id: 'pro_invoice_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'pro_invoice_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Qutation #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/sales/proforma-invoice/${row.id}/detail`,
  },

  {
    id: 'gross_total_amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    formatAmount: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemInvoiceTransactionHeadCells = [
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
    id: 'invoice_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Qutation #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/sales/sale-invoice/${row.id}/detail`,
  },

  {
    id: 'gross_total_amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    formatAmount: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemCreditNoteTransactionHeadCells = [
  {
    id: 'credit_note_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'credit_note_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'CREDIT NOTE #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/sales/credit-notes/${row.id}/detail`,
  },
  {
    id: 'gross_total_amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'center',
    formatAmount: true,
  },

  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
    align: 'center',
  },
];
export const itemPurchaseOrderTransactionHeadCells = [
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
    id: 'pur_order_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Purchase Order #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/purchase-orders/${row.id}/detail`,
  },
  {
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier ',
    align: 'center',
  },
  {
    id: 'gross_total_amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
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
    id: 'bill_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'bill_formated_number',
    numeric: true,
    disablePadding: false,
    label: 'Bill #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/purchase-invoice/${row.id}/detail`,
  },
  {
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier ',
    align: 'left',
  },
  {
    id: 'gross_total_amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    align: 'left',
    formatAmount: true,
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
    id: 'supplier_credit_date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
    align: 'left',
    isLink: false,
    date: true,
  },

  {
    id: 'supplier_credit_formatted_number',
    numeric: true,
    disablePadding: false,
    label: 'Debit Note #',
    align: 'left',
    isLink: true,
    handleLink: row => `/pages/accounting/purchase/debit-notes/${row.id}/detail`,
  },
  {
    id: 'supplier_name',
    numeric: true,
    disablePadding: false,
    label: 'Supplier ',
    align: 'left',
  },
  {
    id: 'gross_total_amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    formatAmount: true,
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

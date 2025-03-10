/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentVoucherHeadCells = [
  {
    id: 'payment_date',
    disablePadding: true,
    label: 'Date',
    date: true,
  },
  {
    id: 'supplier_name',
    disablePadding: true,
    label: 'Supplier ',
    align: 'left',
    sliceLength: 30,
  },
  {
    id: 'payment_num',
    disablePadding: true,
    label: 'Payment #',
    align: 'left',
    cellValueAction: (_, __, row) => (
      <Link to={`${row.uuid || row.id}/detail`} style={{ textDecoration: 'none' }}>
        {row.payment_formatted_number || row.payment_num}
      </Link>
    ),
    isLink: true,
  },
  {
    id: 'reference_num',
    disablePadding: true,
    label: 'Reference #',
  },
  {
    id: 'payment_mode',
    disablePadding: true,
    label: 'Mode',
  },
  {
    id: 'total',
    disablePadding: true,
    align: 'left',
    label: 'Amount',
    formatAmount: true,
  },
  {
    id: 'over_payment',
    disablePadding: true,
    align: 'left',
    label: 'Unused Amount',
    formatAmount: true,
  },
];

export const UnPaidBillsHeadCells = [
  {
    id: 'bill_date',
    disablePadding: true,
    label: 'Date',
    date: true,
  },
  {
    id: 'bill_num',
    disablePadding: true,
    label: 'Bill No',
    align: 'left',
    defaultValue: '-',
  },
  {
    id: 'pur_order_num',
    disablePadding: true,
    label: 'Purchase Order',
    align: 'left',
    defaultValue: '-',
  },
  {
    id: 'grand_total',
    disablePadding: true,
    label: 'Bill Amount',
    defaultValue: '0',
    formatAmount: true,
  },
  {
    id: 'amount_due',
    disablePadding: true,
    label: 'Amount Due',
    defaultValue: '0',
    formatAmount: true,
  },
  {
    id: 'payment',
    disablePadding: true,
    align: 'left',
    label: 'Payment',
    isInput: true,
  },
];

export const test = '';

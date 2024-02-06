import { customerOpeningBalanceName, supplierOpeningBalanceName } from './constants';

export const getLinkByTransactionType = (type, id) => {
  if (!type || !id) return false;
  if (type === supplierOpeningBalanceName) {
    return `/pages/accounting/purchase/suppliers/${id}/detail`;
  }
  if (type === customerOpeningBalanceName) {
    return `/pages/accounting/sales/customers/${id}/detail`;
  }
  if (type === 'Bill') {
    return `/pages/accounting/purchase/purchase-invoice/${id}/detail`;
  }
  if (type === 'Supplier Payment') {
    return `/pages/accounting/purchase/payment-voucher/${id}/detail`;
  }
  if (type === 'Debit Note') {
    return `/pages/accounting/purchase/debit-notes/${id}/detail`;
  }
  if (type === 'Expense' || type === 'Expense Paid') {
    return `/pages/accounting/purchase/expenses/${id}/detail`;
  }
  if (type === 'Invoice') {
    return `/pages/accounting/sales/sale-invoice/${id}/detail`;
  }
  if (type === 'Customer Receipt') {
    return `/pages/accounting/sales/receipt-voucher/${id}/detail`;
  }
  if (type === 'Credit Note') {
    return `/pages/accounting/sales/credit-notes/${id}/detail`;
  }
  return false;
};

export const salesTransactionTypeLink = (type, id) => {
  if (type === 'Excess Payment') {
    return `/pages/accounting/sales/receipt-voucher/${id}/detail`;
  }
  return getLinkByTransactionType(type, id);
};
export const PurchaseTransactionTypeLink = (type, id) => {
  if (type === 'Excess Payment') {
    return `/pages/accounting/purchase/payment-voucher/${id}/detail`;
  }
  return getLinkByTransactionType(type, id);
};

export const getTransactionTypeName = type => {
  if (type === 'Expense' || type === 'Expense Paid') {
    return 'Expense';
  }
  if (type === 'Bill') {
    return 'Purchase Invoice';
  }
  if (type === 'Debit Note') {
    return 'Purchase Debit Note';
  }
  if (type === 'Supplier Payment') {
    return 'Payment Voucher';
  }
  if (type === 'Customer Receipt') {
    return 'Receipt Voucher';
  }
  return type;
};

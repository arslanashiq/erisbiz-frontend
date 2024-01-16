import { supplierOpeningBalanceName } from 'utilities/constants';

export const getLinkByType = item => {
  if (item.type === 'Bill') {
    return `/pages/accounting/purchase/purchase-invoice/${item.id}/detail`;
  }
  if (item.type === 'Excess Payment') {
    return `/pages/accounting/purchase/payment-voucher/${item.id}/detail`;
  }
  if (item.type === 'Debit Note') {
    return `/pages/accounting/purchase/debit-notes/${item.id}/detail`;
  }
  if (item.type === supplierOpeningBalanceName) {
    return `/pages/accounting/purchase/suppliers/${item.id}/detail`;
  }
  return false;
};

export const test = '';

export const test = '';
const greenColor = { color: 'green' };
const redColor = { color: 'red' };
const greyColor = { color: 'grey' };
const orangeColor = { color: '#DF5520' };
const yellowColor = { color: '#E7CF7E' };

export const handleGetStatusBaseStyle = status => {
  if (!status) return '';
  const value = status.toLowerCase();
  // purchase order
  if (value === 'issued') return greenColor;
  if (value === 'closed') return redColor;

  //   purchase invoice
  if (value === 'paid') return greenColor;
  if (value.includes('due')) return redColor;
  if (value === 'draft') return greyColor;

  //   supplier credit note
  if (value.includes('overdue')) return redColor;

  // quotations
  if (value === 'approved') return greenColor;
  if (value === 'declined') return redColor;
  if (value === 'invoiced') return yellowColor;
  if (value === 'cancelled') return redColor;
  if (value === 'proforma-invoiced') return orangeColor;

  // sale invoice
  if (value === 'paid') return greenColor;
  if (value === 'partially paid') return yellowColor;

  // receipt voucher
  if (value === 'open') return greenColor;

  return {};
};
export const handleGetStatusBaseClass = status => {
  if (!status) return '';
  const value = status.toLowerCase();
  // purchase order
  if (value === 'issued') return 'color-primary';
  if (value === 'closed') return 'color-danger';

  //   purchase invoice
  if (value === 'paid') return 'color-primary';
  if (value.includes('due')) return 'color-danger';
  if (value === 'draft') return 'clr-grey';

  //   supplier credit note
  if (value.includes('overdue')) return 'color-danger';

  // quotations
  if (value === 'approved') return 'color-primary';
  if (value === 'declined') return 'color-danger';
  if (value === 'invoiced') return 'color-yellow';
  if (value === 'cancelled') return 'color-danger';
  if (value === 'proforma-invoiced') return 'color-orange';

  // sale invoice
  if (value === 'paid') return 'color-primary';
  if (value === 'partially paid') return 'color-yellow';

  // receipt voucher
  if (value === 'open') return 'color-primary';

  return {};
};

import moment from 'moment';

export const receiptVoucherInitialValues = {
  account: '',
  payment_num: 1,
  payment_date: moment().format('YYYY-MM-DD'),
  payment_mode: '',
  total: 0,
  chart_of_account: '',
  reference_num: '',
  remarks: '',
  invoice_payments: [],
  unused_amount: 0,
  status: 'draft',
  // extra
  used_amount: 0,
};
export const test = '';

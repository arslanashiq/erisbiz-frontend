import moment from 'moment';

export const receiptVoucherInitialValues = {
  date: moment().format('YYYY-MM-DD'),
  bill_payments: [],
  supplier_id: '',
  payment_date: '',
  total: 0,
  payment_mode: '',
  chart_of_account_id: '',
  reference_num: '',
  remarks: '',
  unused_amount: 0,
  used_amount: 0,
};
export const test = '';

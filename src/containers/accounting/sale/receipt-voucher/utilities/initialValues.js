import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

export const receiptVoucherInitialValues = {
  account: '',
  payment_num: 1,
  payment_date: moment().format(DATE_FORMAT),
  payment_mode: '',
  total: 0,
  chart_of_account: '',
  reference_num: '',
  remarks: '',
  invoice_payments: [],
  unused_amount: 0,
  status: 'open',
  // extra
  used_amount: 0,
  debit_account: '',
};
export const test = '';

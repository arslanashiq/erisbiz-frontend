import moment from 'moment';
import { DATE_FORMATE_ADD } from 'utilities/constants';

export const PurchaseVoucherInitialValues = {
  bill_payments: [],
  supplier_id: '',
  payment_date: moment().format(DATE_FORMATE_ADD),
  total: 0,
  payment_mode: '',
  chart_of_account_id: '',
  reference_num: '',
  remarks: '',
  unused_amount: 0,
  used_amount: 0,
};

export const test = '';

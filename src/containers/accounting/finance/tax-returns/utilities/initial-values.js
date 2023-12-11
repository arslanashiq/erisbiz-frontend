import moment from 'moment';

export const taxPaymentsInitialValues = {
  paid_through_account: '',
  amount_applied: '',
  payment_date: moment().format('YYYY-MM-DD'),
  reference_num: '',
  notes: '',
  is_reclaimed: false,
  tax_return_id: '',
};

export const test = '';

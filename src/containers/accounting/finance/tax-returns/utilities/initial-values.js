import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

export const taxPaymentsInitialValues = {
  paid_through_account: '',
  amount_applied: '',
  payment_date: moment().format(DATE_FORMAT),
  reference_num: '',
  notes: '',
  is_reclaimed: false,
  tax_return_id: '',
};

export const test = '';

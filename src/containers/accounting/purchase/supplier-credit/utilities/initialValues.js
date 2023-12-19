import moment from 'moment';
import { NEW_PURCHASE_ITEM_OBJECT } from 'utilities/constants';

export const supplierCreditsInitialValues = {
  debit_account_number: '',
  bill_id: '',
  supplier_id: '',
  supplier_credit_date: moment().format('YYYY-MM-DD'),
  supplier_credit_items: [NEW_PURCHASE_ITEM_OBJECT],
  remarks: '',
};

export const test = '';

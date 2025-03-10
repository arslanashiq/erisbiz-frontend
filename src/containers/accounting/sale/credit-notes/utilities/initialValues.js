import moment from 'moment';
import { DATE_FORMAT, NEW_PURCHASE_ITEM_OBJECT } from 'utilities/constants';

export const creditNoteInitialValues = {
  voucher_num: '',
  account_num: '',
  credit_account_num: '',
  credit_note_date: moment().format(DATE_FORMAT),
  customer_notes: '',
  invoice: '',
  credit_note_items: [NEW_PURCHASE_ITEM_OBJECT],
  status: 'open',
};
export const test = '';

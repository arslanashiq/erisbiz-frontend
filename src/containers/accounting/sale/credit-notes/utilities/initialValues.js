import moment from 'moment';

export const creditNoteInitialValues = {
  voucher_num: '',
  account_num: '',
  credit_account_num: '',
  credit_note_date: moment().format('YYYY-MM-DD'),
  customer_notes: '',
  invoice: '',
  credit_note_items: [{}],
};
export const test = '';

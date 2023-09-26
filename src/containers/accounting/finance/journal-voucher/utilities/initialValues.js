import moment from 'moment';

export const journalVoucherInitialValues = {
  journal_num: '',
  reference_num: '',
  journal_date: moment().format('YYYY-MM-DD'),
  notes: '',
  remarks: '',
  total: 0,
  journal_items: [
    {
      chart_of_account: 0,
      debit: 0,
      credit: 0,
      description: '',
    },
    {
      chart_of_account: 0,
      debit: 0,
      credit: 0,
      description: '',
    },
  ],
};
export const test = '';

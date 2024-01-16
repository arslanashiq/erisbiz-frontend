import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

export const journalVoucherInitialValues = {
  journal_num: '',
  reference_num: '',
  journal_date: moment().format(DATE_FORMAT),
  notes: '',
  remarks: '',
  total: 0,
  journal_items: [
    {
      chart_of_account: '',
      debit: 0,
      credit: 0,
      description: '',
    },
    {
      chart_of_account: '',
      debit: 0,
      credit: 0,
      description: '',
    },
  ],
};
export const test = '';

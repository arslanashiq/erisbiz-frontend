import moment from 'moment';
import { DATE_FORMAT, NEW_PURCHASE_ITEM_OBJECT } from 'utilities/constants';

export const quotationsInitialValues = {
  quotation_num: '',
  quotation_formatted_number: '',
  date: moment().format(DATE_FORMAT),
  quotation_docs: [],
  location: '',
  remarks: '',
  sales_person: '',
  customers: '',
  status: 'draft',
  quotation_items: [NEW_PURCHASE_ITEM_OBJECT],
};
export const test = '';

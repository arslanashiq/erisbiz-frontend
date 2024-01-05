import moment from 'moment';
import { NEW_PURCHASE_ITEM_OBJECT } from 'utilities/constants';

export const saleInvoiceInitialValues = {
  // new
  customer: '',
  pro_invoice: '',
  quotation: '',
  invoice_formatted_number: '',
  date: moment().format('YYYY-MM-DD'),
  sales_person: '',
  location: '',
  remarks: '',
  invoice_docs: [],
  invoice_items: [NEW_PURCHASE_ITEM_OBJECT],
};

export const test = '';

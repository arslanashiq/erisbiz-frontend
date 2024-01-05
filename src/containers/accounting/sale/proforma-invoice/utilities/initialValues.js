import moment from 'moment';
import { NEW_PURCHASE_ITEM_OBJECT } from 'utilities/constants';

export const proformaInvoicesInitialValues = {
  customer: '',
  pro_invoice_formatted_number: '',
  pro_invoice_date: moment().format('YYYY-MM-DD'),
  sales_person: '',
  remarks: '',
  quotation: '',
  location: '',
  pro_invoice_items: [NEW_PURCHASE_ITEM_OBJECT],
  pro_invoice_docs: [],
};

export const test = '';

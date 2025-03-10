import moment from 'moment';
import { DATE_FORMAT } from 'utilities/constants';

export const customerFormInitialValues = {
  customer_name: '',
  email: '',
  contact_person: '',
  contact: '',
  vat_reg_no: '',
  reference_num: '',
  invoice_country: 'United Arab Emirates',
  invoice_city: '',
  invoice_address_line1: '',
  invoice_address_line2: '',
  invoice_latitude: '',
  invoice_longitude: '',
  invoice_po_box: '',
  delivery_country: 'United Arab Emirates',
  delivery_city: '',
  delivery_address_line1: '',
  delivery_address_line2: '',
  delivery_latitude: '',
  delivery_longitude: '',
  delivery_po_box: '',
  notes: '',
  comments_on_transactions: '',
  set_credit_limit: 0,
  set_credit_terms: 'immediately',
  delivery_terms: '',
  opening_balance: 0,
  sales_company_contact: [],
  days_after_invoice: 0,
  credit_limit: true,
  credit_terms: true,
  is_credit: true,
  opening_balance_date: moment().format(DATE_FORMAT),
};

export const test = '';

import moment from 'moment';

export const supplierInitialValues = {
  supplier_name: '',
  website: '',
  notes: '',
  bank_name: '',
  contact_person: '',
  email: '',
  reference_num: '',
  account_number: '',
  IBAN: '',
  swift_code: '',
  mobile_num: '',
  bank_branch: '',
  bank_country: '',
  limit: 1,
  tax_treatment: '',
  trn: '',
  source_of_supply: '',
  currency: 'AED',
  currency_id: '',
  opening_balance: 0,
  is_credit: 'true',
  opening_balance_date: moment().format('YYYY-MM-DD'),
  exchange_rate: 1,
  payment_terms: 'Net 0',
  bill_addr_street_one: '',
  bill_addr_country: '',
  bill_addr_city: '',
  bill_addr_state: '',
  bill_addr_zipcode: '',
  ship_addr_street_one: '',
  ship_addr_country: '',
  ship_addr_city: '',
  ship_addr_state: '',
  ship_addr_zipcode: '',
  remarks: '',
  supplier_contacts: [],
  vat_number: '',
  comments_on_transactions: '',
  address_line1: '',
  address_line2: '',
  latitude: '',
  longitude: '',
  city: '',
  set_credit_limit: false,
  set_credit_terms: false,
  days_after_invoice: 0,
  is_import_agent: false,
  is_reverse_charge: false,
  credit_limit: false,
  credit_terms: false,
};
export const test = '';

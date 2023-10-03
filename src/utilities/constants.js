// API URL for the backend
export const RECAPTCHA_PRIVATE_KEY = process.env.REACT_APP_PRIVATE_RECAPTCHA_KEY;
// export const API_URL = process.env.REACT_APP_API_URL;
// export const API_URL = 'https://stagingcrm.beyonderissolutions.com';
// export const API_URL = 'https://0e81-2400-adc5-1e5-1900-2b20-4653-1a54-e80c.ngrok-free.app';
export const API_URL = 'https://erisbiz.beyonderissolutions.com/';
// export const API_URL = 'http://16.24.36.173:8000';
// export const API_URL = 'http://192.168.18.12:8000/';

export const ROWS_PER_PAGE = 20;

export const EMAIL_REGEX =
  /^(([^`~!$%^&*?/|}{#=<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// /^[^<>()[\]\\,;:\%#^\s@\"$&!@\*\+]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;

// HR ROLES
export const HR_CONTROLLER = 'hr_controller';
export const HR_MANAGER = 'hr_manager';
export const HR_STAFF = 'hr_staff';

// ACCOUNTING ROLES
export const ACCOUNTING_CONTROLLER = 'accounting_controller';
export const ACCOUNTING_MANAGER = 'accounting_manager';
export const ACCOUNTING_STAFF = 'accounting_staff';

// OPERATIONS ROLES
export const OPERATIONS_CONTROLLER = 'operations_controller';
export const OPERATIONS_MANAGER = 'operations_manager';
export const OPERATIONS_STAFF = 'operations_staff';

// SUPER USER
export const SUPER_USER = 'superuser';

export const DATE_FORMAT = 'DD-MMMM-YYYY';
export const DATE_FORMAT_PRINT = 'DD MMM YYYY';
export const DATE_FILTER_REPORT = 'DD MMM YYYY';

// ITEM TYPE
export const ITEM_TYPES = [
  { value: 'Goods', label: 'Goods' },
  { value: 'Service', label: 'Service' },
];

export const ITEM_STATUS_OOPTIONS = [
  { value: true, label: 'Active' },
  { value: false, label: 'Inactive' },
];

export const CURRENCY_ID = 2;

export const VAT_RERVERSE_CHARGES = [
  { value: '0', label: 'The Supplier is an important Agent' },
  { value: '1', label: 'VAT Reverse Charges' },
];

export const VAT_CHARGES = [
  { label: 'Zero Rate (0%)', value: 3, percent: 0 },
  { label: 'Standard Rate (5%)', value: 13, percent: 5 },
  { label: 'Tax Exempt (0%)', value: 16, percent: 0 },
  { label: 'Out of Scope (0%)', value: 17, percent: 0 },
];
export const DRAWER_WIDTH = 240;

export const DEFAULT_IMG = 'https://stagingcrm.beyonderissolutions.com/img/avatar.png';

export const NEW_PURCHASE_ITEM_OBJECT = {
  item: '',
  quantity: 0,
  price: 0,
  total: 0,
  discount: 0,
  vat: 0,
  net_amount: 0,
};

export const PAYMENT_MODE = [
  {
    label: 'Cash',
    value: 'Cash',
  },
  {
    label: 'Credit Card',
    value: 'Credit Card',
  },
  {
    label: 'Bank Transfer',
    value: 'Bank Transfer',
  },
  {
    label: 'Bank',
    value: 'Bank',
  },
];

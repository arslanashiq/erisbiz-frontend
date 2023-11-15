// API URL for the backend
export const RECAPTCHA_PRIVATE_KEY = process.env.REACT_APP_PRIVATE_RECAPTCHA_KEY;
export const API_URL = process.env.REACT_APP_API_URL;
// export const API_URL = 'https://stagingcrm.beyonderissolutions.com';
// export const API_URL = 'https://erisbiz.beyonderissolutions.com/';
// export const API_URL = 'http://192.168.18.12:8000/';

export const ROWS_PER_PAGE = 20;

export const EMAIL_REGEX =
  /^(([^`~!$%^&*?/|}{#=<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_AND_NUMBER_REGEX = /^[a-zA-Z0-9 ]*$/;
export const NAME_REGEX = /^[a-zA-Z ]*$/;
export const INTEGER_REGEX = /^[0-9]*$/;
export const DECIMAL_REGEX = /^[0-9.]*$/;
export const IBAN_REGIX = /^[A-Z]{2}[a-zA-Z\d]+$/;

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
export const DATE_FORMATE_ADD = 'yyyy-MM-DD';

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
  // { label: 'Tax Exempt (0%)', value: 16, percent: 0 },
  // { label: 'Out of Scope (0%)', value: 17, percent: 0 },
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

export const COMPANY_NAME = 'Luxury Events and VIP Travel DMCC';

export const testDataForReports = {
  beginning_cash_balance: {
    total_balance: 0,
  },
  net_income: {
    total_balance: 9475.64,
  },
  data: [
    {
      type: 'Stock',
      name: 'Inventory Assets',
      id: 890,
      parent_account: null,
      date_range_balance: -3481.25,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: -3481.25,
    },
    {
      type: 'Other Current Asset',
      name: 'Input VAT',
      id: 3,
      parent_account: null,
      date_range_balance: 0,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: 0,
    },
    {
      type: 'Other Current Liability',
      name: 'Other Current Liabilities',
      id: 337,
      parent_account: null,
      date_range_balance: 1000,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: 1000,
    },
    {
      type: 'Other Current Liability',
      name: 'GCC VAT Payable',
      id: 12,
      parent_account: null,
      date_range_balance: 310227.52,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: 310227.52,
    },
    {
      type: 'Other Current Liability',
      name: 'Output VAT',
      id: 14,
      parent_account: null,
      date_range_balance: -311186.49,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: -311186.49,
    },
    {
      type: 'Other Current Liability',
      name: 'Accruals and Other Current Liabilities',
      id: 340,
      parent_account: 337,
      date_range_balance: 1210,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: 1210,
    },
    {
      type: 'Other Current Liability',
      name: 'Accrued Expense - Salaries and Wages',
      id: 341,
      parent_account: 340,
      date_range_balance: -1392,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: -1392,
    },
    {
      type: 'Other Current Liability',
      name: 'Other Current Liabilities',
      id: 337,
      parent_account: null,
      date_range_balance: 0,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: 0,
    },
    {
      type: 'Other Current Liability',
      name: 'Accruals and Other Current Liabilities',
      id: 340,
      parent_account: 337,
      date_range_balance: 0,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: 0,
    },
  ],
  start_date: '2023-01-01',
  end_date: '2023-12-31',
  receivable: {
    id: 8,
    date_range_balance: -4944.7,
    till_start_date_balance: 0,
    total_balance: -4944.7,
  },
  payable: {
    id: 21,
    date_range_balance: 525.49,
    till_start_date_balance: 0,
    total_balance: 525.49,
  },
};

export const getSpaces = value => {
  let spaces = '';
  for (let i = 0; i <= value * 5; i += 1) {
    spaces += ' ';
  }
  return spaces;
};

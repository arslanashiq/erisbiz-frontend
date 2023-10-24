// API URL for the backend
export const RECAPTCHA_PRIVATE_KEY = process.env.REACT_APP_PRIVATE_RECAPTCHA_KEY;
// export const API_URL = process.env.REACT_APP_API_URL;
// export const API_URL = 'https://stagingcrm.beyonderissolutions.com';
export const API_URL = 'https://erisbiz.beyonderissolutions.com/';
// export const API_URL = 'http://192.168.0.148:8000/';

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

export const COMPANY_NAME = 'Luxury Events and VIP Travel DMCC';

export const testData = {
  data: [
    {
      name: 'Hassan Shahzad Gondal',
      id: 965,
      type: 'Accounts Receivable',
      group: 'Asset',
      parent_account: 949,
      date_range_balance: 12,
      till_start_date_balance: 12,
      is_debit: true,
      total_balance: 12,
    },
    {
      name: 'Test Account',
      id: 949,
      type: 'Accounts Receivable',
      group: 'Asset',
      parent_account: null,
      date_range_balance: 18,
      till_start_date_balance: 18,
      is_debit: true,
      total_balance: 18,
    },
    {
      name: 'Inventory Assets',
      id: 890,
      type: 'Stock',
      group: 'Asset',
      parent_account: null,
      date_range_balance: 3433.31,
      till_start_date_balance: 3433.31,
      is_debit: true,
      total_balance: 3433.31,
    },
    {
      name: 'Bank-ENBD',
      id: 418,
      type: 'Bank',
      group: 'Asset',
      parent_account: null,
      date_range_balance: -260.07,
      till_start_date_balance: -260.07,
      is_debit: true,
      total_balance: -260.07,
    },
    {
      name: 'Test CASH account',
      id: 414,
      type: 'Cash',
      group: 'Asset',
      parent_account: null,
      date_range_balance: -3600,
      till_start_date_balance: -3600,
      is_debit: true,
      total_balance: -3600,
    },
    {
      name: 'Test BANK ENBD(Euro)',
      id: 415,
      type: 'Cash',
      group: 'Asset',
      parent_account: 414,
      date_range_balance: -60,
      till_start_date_balance: -60,
      is_debit: true,
      total_balance: -60,
    },
    {
      name: 'Input VAT',
      id: 3,
      type: 'Other Current Asset',
      group: 'Asset',
      parent_account: null,
      date_range_balance: 0,
      till_start_date_balance: 0,
      is_debit: true,
      total_balance: 0,
    },
    {
      name: 'AED',
      id: 979,
      type: 'Bank',
      group: 'Asset',
      parent_account: null,
      date_range_balance: 23.09,
      till_start_date_balance: 23.09,
      is_debit: true,
      total_balance: 23.09,
    },
    {
      name: 'Accounts Receivable',
      id: 8,
      type: 'Accounts Receivable',
      group: 'Asset',
      parent_account: null,
      date_range_balance: -33698.21,
      till_start_date_balance: -33698.21,
      is_debit: true,
      total_balance: -33698.21,
    },
    {
      name: 'TEST',
      id: 911,
      type: 'Bank',
      group: 'Asset',
      parent_account: null,
      date_range_balance: 140,
      till_start_date_balance: 140,
      is_debit: true,
      total_balance: 140,
    },
    {
      name: 'Hassan',
      id: 953,
      type: 'Bank',
      group: 'Asset',
      parent_account: null,
      date_range_balance: -10,
      till_start_date_balance: -10,
      is_debit: true,
      total_balance: -10,
    },
    {
      name: 'Cash in Bank',
      id: 364,
      type: 'Cash',
      group: 'Asset',
      parent_account: null,
      date_range_balance: -300,
      till_start_date_balance: -300,
      is_debit: true,
      total_balance: -300,
    },
    {
      name: 'Account',
      id: 963,
      type: 'Bank',
      group: 'Asset',
      parent_account: null,
      date_range_balance: 43265.14,
      till_start_date_balance: 43265.14,
      is_debit: true,
      total_balance: 43265.14,
    },
    {
      name: 'Cash and Cash Equivalents',
      id: 912,
      type: 'Cash',
      group: 'Asset',
      parent_account: null,
      date_range_balance: -200,
      till_start_date_balance: -200,
      is_debit: true,
      total_balance: -200,
    },
    {
      name: 'AUD bank',
      id: 975,
      type: 'Bank',
      group: 'Asset',
      parent_account: null,
      date_range_balance: -65.35,
      till_start_date_balance: -65.35,
      is_debit: true,
      total_balance: -65.35,
    },
    {
      name: 'Other Current Liabilities',
      id: 337,
      type: 'Other Current Liability',
      group: 'Liability',
      parent_account: null,
      date_range_balance: 1000,
      till_start_date_balance: 1000,
      is_debit: true,
      total_balance: 1000,
    },
    {
      name: 'GCC VAT Payable',
      id: 12,
      type: 'Other Current Liability',
      group: 'Liability',
      parent_account: null,
      date_range_balance: 310227.52,
      till_start_date_balance: 310227.52,
      is_debit: true,
      total_balance: 310227.52,
    },
    {
      name: 'Output VAT',
      id: 14,
      type: 'Other Current Liability',
      group: 'Liability',
      parent_account: null,
      date_range_balance: -311186.49,
      till_start_date_balance: -311186.49,
      is_debit: true,
      total_balance: -311186.49,
    },
    {
      name: 'Accruals and Other Current Liabilities',
      id: 340,
      type: 'Other Current Liability',
      group: 'Liability',
      parent_account: 337,
      date_range_balance: 1210,
      till_start_date_balance: 1210,
      is_debit: true,
      total_balance: 1210,
    },
    {
      name: 'Accrued Expense - Salaries and Wages',
      id: 341,
      type: 'Other Current Liability',
      group: 'Liability',
      parent_account: 340,
      date_range_balance: -1392,
      till_start_date_balance: -1392,
      is_debit: true,
      total_balance: -1392,
    },
    {
      name: 'Accounts Payable',
      id: 21,
      type: 'Accounts Payable',
      group: 'Liability',
      parent_account: null,
      date_range_balance: 525.49,
      till_start_date_balance: 525.49,
      is_debit: true,
      total_balance: 525.49,
    },
    {
      name: 'ABL',
      id: 983,
      type: 'Bank',
      group: 'Asset',
      parent_account: null,
      date_range_balance: 31.26,
      till_start_date_balance: 31.26,
      is_debit: true,
      total_balance: 31.26,
    },
    {
      name: 'Current Year Earnings',
      id: 'profit loss report',
      type: 'Equity',
      group: 'Equity',
      parent_account: null,
      start_date: '2023-01-01',
      is_debit: false,
      date_range_balance: -8846.92,
      till_start_date_balance: 0,
      total_balance: 8846.92,
    },
    {
      name: 'Retained Earning',
      id: 'profit loss report earning',
      type: 'Equity',
      group: 'Equity',
      parent_account: null,
      opening_blc: 0,
      is_debit: false,
      date_range_balance: 0,
      till_start_date_balance: 0,
      total_balance: 0,
      current_year_earning_till_start_date: 0,
    },
  ],
  start_date: '2023-01-01',
  end_date: '2023-12-31',
};

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
  start_date: '2023-10-26',
  end_date: '2023-10-26',
  data: [
    {
      chart_of_account: 'Cost of Sales',
      parent_account: null,
      balance: 534.86,
      is_debit: true,
      chart_of_account_id: 55,
      group: 'Expense',
      type: 'cost_of_sales',
    },
    {
      chart_of_account: 'Rent Expense',
      parent_account: null,
      balance: 220,
      is_debit: true,
      chart_of_account_id: 423,
      group: 'Expense',
      type: 'expense',
    },
    {
      chart_of_account: 'Exchange Gain or Loss',
      parent_account: null,
      balance: 20.28,
      is_debit: true,
      chart_of_account_id: 56,
      group: 'Expense',
      type: 'other_expense',
    },
    {
      chart_of_account: 'Sales',
      parent_account: null,
      balance: 10250.78,
      is_debit: false,
      chart_of_account_id: 28,
      group: 'Income',
      type: 'income',
    },
    {
      chart_of_account: 'Hassan Shahzad Gondal',
      parent_account: 949,
      balance: 12,
      is_debit: true,
      chart_of_account_id: 965,
      group: 'Asset',
      type: 'accounts_receivable',
    },
    {
      chart_of_account: 'Test Account',
      parent_account: null,
      balance: 18,
      is_debit: true,
      chart_of_account_id: 949,
      group: 'Asset',
      type: 'accounts_receivable',
    },
    {
      chart_of_account: 'Inventory Assets',
      parent_account: null,
      balance: 3481.25,
      is_debit: true,
      chart_of_account_id: 890,
      group: 'Asset',
      type: 'stock',
    },
    {
      chart_of_account: 'Bank-ENBD',
      parent_account: null,
      balance: 260.07,
      is_debit: false,
      chart_of_account_id: 418,
      group: 'Asset',
      type: 'bank',
    },
    {
      chart_of_account: 'Test CASH account',
      parent_account: null,
      balance: 3600,
      is_debit: false,
      chart_of_account_id: 414,
      group: 'Asset',
      type: 'cash',
    },
    {
      chart_of_account: 'Test BANK ENBD(Euro)',
      parent_account: 414,
      balance: 60,
      is_debit: false,
      chart_of_account_id: 415,
      group: 'Asset',
      type: 'cash',
    },
    {
      chart_of_account: 'Input VAT',
      parent_account: null,
      balance: 0,
      is_debit: true,
      chart_of_account_id: 3,
      group: 'Asset',
      type: 'other_current_asset',
    },
    {
      chart_of_account: 'AED',
      parent_account: null,
      balance: 34.69,
      is_debit: false,
      chart_of_account_id: 979,
      group: 'Asset',
      type: 'bank',
    },
    {
      chart_of_account: 'Accounts Receivable',
      parent_account: null,
      balance: 4944.7,
      is_debit: true,
      chart_of_account_id: 8,
      group: 'Asset',
      type: 'accounts_receivable',
    },
    {
      chart_of_account: 'TEST',
      parent_account: null,
      balance: 140,
      is_debit: true,
      chart_of_account_id: 911,
      group: 'Asset',
      type: 'bank',
    },
    {
      chart_of_account: 'Hassan',
      parent_account: null,
      balance: 10,
      is_debit: false,
      chart_of_account_id: 953,
      group: 'Asset',
      type: 'bank',
    },
    {
      chart_of_account: 'Cash in Bank',
      parent_account: null,
      balance: 300,
      is_debit: false,
      chart_of_account_id: 364,
      group: 'Asset',
      type: 'cash',
    },
    {
      chart_of_account: 'Account',
      parent_account: null,
      balance: 5280.38,
      is_debit: true,
      chart_of_account_id: 963,
      group: 'Asset',
      type: 'bank',
    },
    {
      chart_of_account: 'Cash and Cash Equivalents',
      parent_account: null,
      balance: 200,
      is_debit: false,
      chart_of_account_id: 912,
      group: 'Asset',
      type: 'cash',
    },
    {
      chart_of_account: 'AUD bank',
      parent_account: null,
      balance: 65.35,
      is_debit: false,
      chart_of_account_id: 975,
      group: 'Asset',
      type: 'bank',
    },
    {
      chart_of_account: 'Other Current Liabilities',
      parent_account: null,
      balance: 1000,
      is_debit: false,
      chart_of_account_id: 337,
      group: 'Liability',
      type: 'other_current_liability',
    },
    {
      chart_of_account: 'GCC VAT Payable',
      parent_account: null,
      balance: 310227.52,
      is_debit: false,
      chart_of_account_id: 12,
      group: 'Liability',
      type: 'other_current_liability',
    },
    {
      chart_of_account: 'Output VAT',
      parent_account: null,
      balance: 311186.49,
      is_debit: true,
      chart_of_account_id: 14,
      group: 'Liability',
      type: 'other_current_liability',
    },
    {
      chart_of_account: 'Accruals and Other Current Liabilities',
      parent_account: 337,
      balance: 1210,
      is_debit: false,
      chart_of_account_id: 340,
      group: 'Liability',
      type: 'other_current_liability',
    },
    {
      chart_of_account: 'Accrued Expense - Salaries and Wages',
      parent_account: 340,
      balance: 1392,
      is_debit: true,
      chart_of_account_id: 341,
      group: 'Liability',
      type: 'other_current_liability',
    },
    {
      chart_of_account: 'Accounts Payable',
      parent_account: null,
      balance: 525.49,
      is_debit: false,
      chart_of_account_id: 21,
      group: 'Liability',
      type: 'accounts_payable',
    },
    {
      chart_of_account: 'ABL',
      parent_account: null,
      balance: 11.67,
      is_debit: true,
      chart_of_account_id: 983,
      group: 'Asset',
      type: 'bank',
    },
  ],
};

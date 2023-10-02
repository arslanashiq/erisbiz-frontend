export const dummyChartOfAccounts = [
  {
    id: 963,
    account_name: 'Account',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 21,
    account_name: 'Accounts Payable',
    parent_account_name: null,
    account_type: 'Accounts Payable',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 8,
    account_name: 'Accounts Receivable',
    parent_account_name: null,
    account_type: 'Accounts Receivable',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 418,
    account_name: 'Bank-ENBD',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'EUR',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 422,
    account_name: 'Bank_ENBD',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 912,
    account_name: 'Cash and Cash Equivalents',
    parent_account_name: null,
    account_type: 'Cash',
    parent_account: null,
    is_locked: false,
    currency: '',
    child_accounts: [
      {
        id: 913,
        account_name: 'Dummy Cash in Bank account',
        parent_account_name: 'Cash and Cash Equivalents',
        account_type: 'Cash',
        parent_account: 912,
        is_locked: false,
        currency: '',
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
    ],
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 364,
    account_name: 'Cash in Bank',
    parent_account_name: null,
    account_type: 'Cash',
    parent_account: null,
    is_locked: false,
    currency: '',
    child_accounts: [
      {
        id: 366,
        account_name: 'Cash in Bank -  MCB EUR',
        parent_account_name: 'Cash in Bank',
        account_type: 'Cash',
        parent_account: 364,
        is_locked: false,
        currency: '',
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
      {
        id: 367,
        account_name: 'Cash in Bank -  MCB USD',
        parent_account_name: 'Cash in Bank',
        account_type: 'Cash',
        parent_account: 364,
        is_locked: false,
        currency: '',
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
      {
        id: 968,
        account_name: 'Test cash',
        parent_account_name: 'Cash in Bank',
        account_type: 'Cash',
        parent_account: 364,
        is_locked: false,
        currency: '',
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
      {
        id: 970,
        account_name: 'Test1',
        parent_account_name: 'Cash in Bank',
        account_type: 'Cash',
        parent_account: 364,
        is_locked: false,
        currency: '',
        child_accounts: [
          {
            id: 971,
            account_name: 'Test2',
            parent_account_name: 'Test1',
            account_type: 'Cash',
            parent_account: 970,
            is_locked: false,
            currency: '',
            child_accounts: [
              {
                id: 972,
                account_name: 'Test3',
                parent_account_name: 'Test2',
                account_type: 'Cash',
                parent_account: 971,
                is_locked: false,
                currency: '',
                child_accounts: [
                  {
                    id: 973,
                    account_name: 'Test4',
                    parent_account_name: 'Test3',
                    account_type: 'Cash',
                    parent_account: 972,
                    is_locked: false,
                    currency: '',
                    level: 4,
                    isLastChild: true,
                    lineToRemoveIndex: 0,
                  },
                ],
                level: 3,
                isLastChild: true,
                lineToRemoveIndex: 0,
              },
            ],
            level: 2,
            isLastChild: true,
            lineToRemoveIndex: 0,
          },
        ],
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
    ],
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 55,
    account_name: 'Cost of Sales',
    parent_account_name: null,
    account_type: 'Cost of Sales',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 56,
    account_name: 'Exchange Gain or Loss',
    parent_account_name: null,
    account_type: 'Other Expense',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 12,
    account_name: 'GCC VAT Payable',
    parent_account_name: null,
    account_type: 'Other Current Liability',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 29,
    account_name: 'General Income',
    parent_account_name: null,
    account_type: 'Income',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 953,
    account_name: 'Hassan',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'PKR',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 954,
    account_name: 'Hassan9',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 3,
    account_name: 'Input VAT',
    parent_account_name: null,
    account_type: 'Other Current Asset',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 30,
    account_name: 'Interest Income',
    parent_account_name: null,
    account_type: 'Income',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 890,
    account_name: 'Inventory Assets',
    parent_account_name: null,
    account_type: 'Stock',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 334,
    account_name: 'Marketing and Administrative Expenses',
    parent_account_name: null,
    account_type: 'Expense',
    parent_account: null,
    is_locked: true,
    currency: '',
    child_accounts: [
      {
        id: 335,
        account_name: 'Administrative Expenses',
        parent_account_name: 'Marketing and Administrative Expenses',
        account_type: 'Expense',
        parent_account: 334,
        is_locked: true,
        currency: '',
        child_accounts: [
          {
            id: 336,
            account_name: 'Salaries and Wages',
            parent_account_name: 'Administrative Expenses',
            account_type: 'Expense',
            parent_account: 335,
            is_locked: true,
            currency: '',
            level: 2,
            isLastChild: true,
            lineToRemoveIndex: 0,
          },
        ],
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
    ],
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 27,
    account_name: 'Other Charges',
    parent_account_name: null,
    account_type: 'Income',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 337,
    account_name: 'Other Current Liabilities',
    parent_account_name: null,
    account_type: 'Other Current Liability',
    parent_account: null,
    is_locked: true,
    currency: '',
    child_accounts: [
      {
        id: 340,
        account_name: 'Accruals and Other Current Liabilities',
        parent_account_name: 'Other Current Liabilities',
        account_type: 'Other Current Liability',
        parent_account: 337,
        is_locked: true,
        currency: '',
        child_accounts: [
          {
            id: 341,
            account_name: 'Accrued Expense - Salaries and Wages',
            parent_account_name: 'Accruals and Other Current Liabilities',
            account_type: 'Other Current Liability',
            parent_account: 340,
            is_locked: true,
            currency: '',
            level: 2,
            isLastChild: true,
            lineToRemoveIndex: 0,
          },
        ],
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
    ],
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 14,
    account_name: 'Output VAT',
    parent_account_name: null,
    account_type: 'Other Current Liability',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 363,
    account_name: 'Petty cash',
    parent_account_name: null,
    account_type: 'Cash',
    parent_account: null,
    is_locked: false,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 333,
    account_name: 'Prepaid Expense',
    parent_account_name: null,
    account_type: 'Other Current Asset',
    parent_account: null,
    is_locked: false,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 423,
    account_name: 'Rent Expense',
    parent_account_name: null,
    account_type: 'Expense',
    parent_account: null,
    is_locked: false,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 23,
    account_name: 'Retained Earnings',
    parent_account_name: null,
    account_type: 'Equity',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 28,
    account_name: 'Sales',
    parent_account_name: null,
    account_type: 'Income',
    parent_account: null,
    is_locked: true,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 911,
    account_name: 'TEST',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 949,
    account_name: 'Test Account',
    parent_account_name: null,
    account_type: 'Accounts Receivable',
    parent_account: null,
    is_locked: false,
    currency: '',
    child_accounts: [
      {
        id: 965,
        account_name: 'Hassan Shahzad Gondal',
        parent_account_name: 'Test Account',
        account_type: 'Accounts Receivable',
        parent_account: 949,
        is_locked: false,
        currency: '',
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
      {
        id: 964,
        account_name: 'hassan',
        parent_account_name: 'Test Account',
        account_type: 'Accounts Receivable',
        parent_account: 949,
        is_locked: false,
        currency: '',
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
    ],
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 948,
    account_name: 'Test Bank Account',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 414,
    account_name: 'Test CASH account',
    parent_account_name: null,
    account_type: 'Cash',
    parent_account: null,
    is_locked: false,
    currency: '',
    child_accounts: [
      {
        id: 415,
        account_name: 'Test BANK ENBD(Euro)',
        parent_account_name: 'Test CASH account',
        account_type: 'Cash',
        parent_account: 414,
        is_locked: false,
        currency: '',
        level: 1,
        isLastChild: false,
        lineToRemoveIndex: -1,
      },
    ],
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 956,
    account_name: 'dummy cost of sales',
    parent_account_name: null,
    account_type: 'Cost of Sales',
    parent_account: null,
    is_locked: false,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 959,
    account_name: 'kjdsaflf',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 955,
    account_name: 'mcb lahore+3',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'ARS',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 960,
    account_name: 'mcb lahore+4',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 961,
    account_name: 'mcb lahore+5',
    parent_account_name: null,
    account_type: 'Bank',
    parent_account: null,
    is_locked: false,
    currency: 'AED',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 966,
    account_name: 'sds',
    parent_account_name: null,
    account_type: 'Other Current Asset',
    parent_account: null,
    is_locked: false,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
  {
    id: 889,
    account_name: 'test equity',
    parent_account_name: null,
    account_type: 'Equity',
    parent_account: null,
    is_locked: false,
    currency: '',
    level: 0,
    isLastChild: false,
    lineToRemoveIndex: -1,
  },
];
export const test = '';

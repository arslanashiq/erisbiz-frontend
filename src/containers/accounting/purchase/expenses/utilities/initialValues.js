import moment from 'moment';

export const expensesInitialValues = {
  expense_account_id: '', // expense Account
  expense_date: moment().format('YYYY-MM-DD'),
  total_without_tax: 0, // amount
  paid_through_account_id: '', // paid Through
  supplier_id: '',
  tax_rate_id: 3, // tax
  reference_num: '',
  notes: '',
  //   extra fields
  total: 0, // amout after tax
  tax_rate: '',
  exchange_rate: 1,
  tax_rate_perc: '',
  currency: 'AED',
  sales_account_id: '',
  type: 'expense',
};

export const test = '';

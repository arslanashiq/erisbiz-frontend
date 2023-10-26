import moment from 'moment';

export const supplierCreditsInitialValues = {
  debit_account_number: '',
  bill_id: '',
  supplier_id: '',
  supplier_credit_date: moment().format('YYYY-MM-DD'),
  supplier_credit_items: [
    {
      item: '',
      quantity: 0,
      price: 0,
      total: 0,
      discount: 0,
      vat: 0,
      net_amount: 0,
    },
  ],
  remarks: '',
};

export const test = '';

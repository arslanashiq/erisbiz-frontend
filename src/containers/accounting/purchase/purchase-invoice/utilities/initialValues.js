import moment from 'moment';

export const purchaseInvoiceInitialValues = {
  supplier_id: '',
  pur_order_formatted_number: '',
  due_date: moment().format('YYYY-MM-DD'),
  credit_account: '',
  location: '',
  attachment: '',
  supplier_invoice_num: '',
  invoice_num: '',
  bill_items: [
    {
      num_units: 0,
      num_nights: 0,
      unit_price_ex_vat: 0,
      gross_amount: 0,
      discount: 0,
      vat_amount: 0,
      net_amount: 0,
      account_code: '',
      service_type: '',
    },
  ],
  notes: '',
};

export const test = '';

import moment from 'moment';

export const receiptVoucherInitialValues = {
  date: moment().format('YYYY-MM-DD'),
  location: '',
  customer_id: '',
  exchange_rate: 1,
  attachment: '',
  remarks: '',
  currency: 'AED',
  pur_order_items: [
    {
      service_type: 'Apple',
      currency: 1,
      num_units: 0,
      num_nights: 0,
      unit_price_ex_vat: 0,
      gross_amount: 0,
      discount: 0,
      vat_amount: 0,
      net_amount: 0,
    },
  ],

  pur_order_suffix: 'LPO',
  pur_order_docs: [
    {
      doc_file: '',
      doc_type: '',
      doc_name: '',
      doc_size_bytes: 0,
    },
  ],
};
export const test = '';

import moment from 'moment';

export const purchaseOrderInitialValues = {
  pur_order_num: '',
  date: moment().format('yyyy-MM-DD'),
  location: '',
  supplier_id: '',
  reference_num: '',
  exchange_rate: 1,
  attachment: '',
  remarks: '',
  currency: 'AED',
  pur_order_items: [
    {
      service_type: '',
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
  pur_order_docs: [],
};

export const test = '';

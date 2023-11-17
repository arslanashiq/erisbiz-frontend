import moment from 'moment';
import { DATE_FORMATE_ADD } from 'utilities/constants';

export const purchaseOrderInitialValues = {
  pur_order_num: '',
  date: moment().format(DATE_FORMATE_ADD),
  location: '',
  supplier_id: '',
  reference_num: '',
  exchange_rate: 1,
  attachment: '',
  remarks: '',
  pur_order_items: [
    {
      service_type: '',
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

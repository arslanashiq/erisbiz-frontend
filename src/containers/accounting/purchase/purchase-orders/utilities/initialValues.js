import moment from 'moment';
import { DATE_FORMATE_ADD, NEW_PURCHASE_ITEM_OBJECT } from 'utilities/constants';

export const purchaseOrderInitialValues = {
  pur_order_num: '',
  date: moment().format(DATE_FORMATE_ADD),
  location: '',
  supplier_id: '',
  reference_num: '',
  exchange_rate: 1,
  attachment: '',
  remarks: '',
  pur_order_items: [NEW_PURCHASE_ITEM_OBJECT],

  pur_order_suffix: 'LPO',
  pur_order_docs: [],
};

export const test = '';

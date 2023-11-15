import moment from 'moment';

export const quotationsInitialValues = {
  quotation_num: '',
  quotation_formatted_number: '',
  date: moment().format('YYYY-MM-DD'),
  quotation_docs: [],
  location: '',
  remarks: '',
  sales_person: '',
  customers: '',
  status: 'draft',
  quotation_items: [
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
};
export const test = '';

import moment from 'moment';

export const proformaInvoicesInitialValues = {
  customer: '',
  pro_invoice_date: moment().format('YYYY-MM-DD'),
  sales_person: '',
  remarks: '',
  quotation: '',
  location: '',
  pro_invoice_items: [
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
  pro_invoice_docs: [],
};

export const test = '';

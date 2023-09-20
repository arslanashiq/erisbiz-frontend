import moment from 'moment';

export const saleInvoiceInitialValues = {
  // new
  customer: '',
  pro_invoice: '',
  quotation: '',
  date: moment().format('YYYY-MM-DD'),
  sales_person: '',
  location: '',
  remarks: '',
  invoice_docs: [],
  invoice_items: [
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

export const supplierFormTabsList = [
  'Communication',
  'Bank & Transfer',
  'Contact Information',
  'Comments & Notes',
];

export const supplierPaymentInfo = [
  { value: 'invoice_date', label: 'Day After Invoice Date' },
  { value: 'next_month', label: 'End of Next Month' },
  { value: 'immediately', label: 'Immediately' },
];

export const supplierFilterInitialValues = {
  supplier_name: '',
  email: '',
  primary_contact_phone: '',
  primary_contact_mobile: '',
};
export const supplierFiltersOptionsList = [
  {
    name: 'supplier_name',
    fullWidth: true,
    placeholder: 'Supplier Name',
  },
  {
    name: 'email',
    fullWidth: true,
    placeholder: 'Email',
  },

  {
    name: 'mobile_num',
    fullWidth: true,
    placeholder: 'Mobiler Number',
    type: 'number',
  },
];

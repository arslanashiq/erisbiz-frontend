export const supplierFormTabsList = [
  'Communication',
  'Bank & Transfer',
  'Contact Information',
  'Comments & Notes',
];

export const supplierPaymentInfo = [
  { value: 'invoice_date', label: 'Day After Invoice Date' },
  { value: 'next_month', label: 'End of Next Month' },
  { value: 'immediately', label: 'Imedietly' },
];

export const supplierFilterInitialValues = {
  supplier_name: '',
  primary_contact_email: '',
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
    name: 'primary_contact_email',
    fullWidth: true,
    placeholder: 'Email',
  },
  {
    name: 'primary_contact_phone',
    fullWidth: true,
    placeholder: 'Phone Number',
    type: 'number',
  },
  {
    name: 'primary_contact_mobile',
    fullWidth: true,
    placeholder: 'Mobiler Number',
    type: 'number',
  },
];

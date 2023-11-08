import * as Yup from 'yup';

export const bankFormValidationSchema = Yup.object({
  bank_name: Yup.string().max(50, 'Cannot exceed 50 characters').required('Bank Name is required'),
  account_number: Yup.string()
    .matches(/^[0-9]*$/, 'Enter numbers only')
    .max(50, 'Cannot exceed 50 characters')
    .required('Account Number is required'),
  branch_name: Yup.string().required('Branch Name is required'),

  IBAN: Yup.string()
    .matches(/^[A-Z]{2}[a-zA-Z\d]+$/, 'Invalid IBAN')
    .max(50, 'Cannot exceed 50 characters')
    .required('IBAN is required'),

  swift_code: Yup.string().max(50, 'Cannot exceed 50 chracters').required('Swift Code is required'),

  gl_number: Yup.string()
    .matches(/^[0-9]*$/, 'Enter numbers only')
    .required('GL Number is required'),
  notes: Yup.string().max(255, 'Cannot exceed 255 chracters'),
});
export const test = '';

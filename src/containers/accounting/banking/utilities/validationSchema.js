import * as Yup from 'yup';
import { IBAN_REGIX, INTEGER_REGEX, NAME_AND_NUMBER_REGEX, NAME_REGEX } from 'utilities/constants';

export const bankFormValidationSchema = Yup.object({
  bank_name: Yup.string()
    .matches(NAME_REGEX, 'Use alphabets only')
    .max(50, 'Cannot exceed 50 characters')
    .required('Bank Name is required'),

  account_number: Yup.string()
    .matches(INTEGER_REGEX, 'Enter numbers only')
    .max(20, 'Cannot exceed 20 characters')
    .required('Account Number is required'),

  branch_name: Yup.string().matches(NAME_REGEX, 'Use alphabets only').required('Branch Name is required'),

  IBAN: Yup.string()
    .matches(IBAN_REGIX, 'Invalid IBAN')
    .max(23, 'Cannot exceed 23 characters')
    .required('IBAN is required'),

  swift_code: Yup.string()
    .matches(NAME_AND_NUMBER_REGEX, 'No spaces or special character allowded')
    .max(50, 'Cannot exceed 50 chracters')
    .required('Swift Code is required'),

  gl_number: Yup.string().matches(INTEGER_REGEX, 'Enter numbers only').required('GL Number is required'),

  notes: Yup.string().max(255, 'Cannot exceed 255 characters'),
});
export const test = '';

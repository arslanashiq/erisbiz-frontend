import { IBAN_REGIX, INTEGER_REGEX, NAME_AND_NUMBER_REGEX, NAME_REGEX } from 'utilities/constants';
import * as Yup from 'yup';

export const chartOfAccountFormValidationSchema = Yup.object({
  account_name: Yup.string().required('Account Name is required'),
  account_type: Yup.string().required('Account Type is required'),

  account_number: Yup.string().when('is_bank', {
    is: true,
    then: () => Yup.string()
      .matches(INTEGER_REGEX, 'Enter numbers only')
      .max(20, 'Cannot exceed 20 characters')
      .required('Account Number is required'),
  }),
  IBAN: Yup.string().when('is_bank', {
    is: true,
    then: () => Yup.string()
      .matches(IBAN_REGIX, 'Invalid IBAN')
      .max(23, 'Cannot exceed 23 characters')
      .required('IBAN is required'),
  }),
  bank_name: Yup.string().when('is_bank', {
    is: true,
    then: () => Yup.string()
      .matches(NAME_REGEX, 'Use alphabets only')
      .max(50, 'Cannot exceed 50 characters')
      .required('Bank Name is required'),
  }),

  branch_name: Yup.string().when('is_bank', {
    is: true,
    then: () => Yup.string().matches(NAME_REGEX, 'Use alphabets only').required('Branch Name is required'),
  }),
  swift_code: Yup.string().when('is_bank', {
    is: true,
    then: () => Yup.string()
      .matches(NAME_AND_NUMBER_REGEX, 'No spaces or special character allowded')
      .max(50, 'Cannot exceed 50 chracters')
      .required('Swift Code is required'),
  }),
});
export const test = '';

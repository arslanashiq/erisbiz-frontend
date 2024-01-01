import {
  EMAIL_REGEX,
  IBAN_REGIX,
  INTEGER_REGEX,
  NAME_AND_NUMBER_REGEX,
  NAME_REGEX,
} from 'utilities/constants';
import * as Yup from 'yup';

export const supplierFormValidationSchema = Yup.object({
  supplier_name: Yup.string().max(100, 'Cannot exceed 100 characters').required('Supplier Name is required'),
  email: Yup.string().matches(EMAIL_REGEX, 'Must be a valid Email').required('Email is required'),
  latitude: Yup.number('Must be a number'),
  longitude: Yup.number('Must be a number'),
  set_credit_limit: Yup.number().when('credit_limit', {
    is: true,
    then: () => Yup.number().min(1, 'Required').required('Required'),
  }),
  set_credit_terms: Yup.string().when('credit_terms', {
    is: true,
    then: () => Yup.string().required(' Choose 1 option'),
  }),
  days_after_invoice: Yup.number().when('set_credit_terms', {
    is: 'invoice_date',
    then: () => Yup.number().min(1, 'Days must be greater tha 1').required('required'),
  }),

  bank_name: Yup.string().matches(NAME_REGEX, 'Use alphabets only').max(50, 'Cannot exceed 50 characters'),

  account_number: Yup.string()
    .nullable()
    .matches(INTEGER_REGEX, 'Enter numbers only')
    .max(50, 'Cannot exceed 50 characters'),
  branch_name: Yup.string().matches(NAME_REGEX, 'Use alphabets only'),

  IBAN: Yup.string().matches(IBAN_REGIX, 'Invalid IBAN').max(50, 'Cannot exceed 50 characters'),

  swift_code: Yup.string()
    .matches(NAME_AND_NUMBER_REGEX, 'No spaces or special character allowded')
    .max(50, 'Cannot exceed 50 chracters'),
});
export const test = '';

import { EMAIL_REGEX, IBAN_REGIX } from 'utilities/constants';
import * as Yup from 'yup';

export const supplierFormValidationSchema = Yup.object({
  supplier_name: Yup.string().max(100, 'Cannot exceed 100 characters').required('Supplier Name is required'),
  email: Yup.string().matches(EMAIL_REGEX, 'Must be a valid Email').required('Email is required'),
  account_default: Yup.string().min(1).required('Account Default is required'),
  latitude: Yup.number('Must be a number').required('Latitude is required'),
  longitude: Yup.number('Must be a number').required('Longitude is required'),
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
  account_number: Yup.number('Must be a valid Account Number').required('Account Number is required'),
  IBAN: Yup.string().matches(IBAN_REGIX, 'Must be a valid IBAN'),
});
export const test = '';

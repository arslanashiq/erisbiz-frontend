import { EMAIL_REGEX } from 'utilities/constants';
import * as Yup from 'yup';

export const supplierFormValidationSchema = Yup.object({
  supplier_name: Yup.string().max(100, 'Cannot exceed 100 characters').required('Supplier Name is required'),
  email: Yup.string().matches(EMAIL_REGEX, 'Must be a valid Email').required('Email is Required'),
  account_default: Yup.string().required('Account Default is required'),
  latitude: Yup.number('Must be a number').required('Location is Required'),
  longitude: Yup.number('Must be a number').required('Location is Required'),
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
});
export const test = '';

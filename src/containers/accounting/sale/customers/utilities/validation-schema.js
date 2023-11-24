import { EMAIL_REGEX } from 'utilities/constants';
import * as Yup from 'yup';

export const customerFormValidationSchema = Yup.object({
  customer_name: Yup.string().required('Customer Name is required'),
  email: Yup.string().matches(EMAIL_REGEX, 'Invalid email address').required('Email is required'),
  vat_reg_no: Yup.string().required('VAT Reg No is required'),
  reference_num: Yup.string().required('Reference is required'),
  invoice_country: Yup.string().required('Country is required'),
  delivery_country: Yup.string().required('Country is required'),
  set_credit_limit: Yup.number('Must be a valid Number').when('credit_limit', {
    is: true,
    then: () => Yup.number().min(1, 'Must be greate than 1').required('Required'),
  }),
  set_credit_terms: Yup.string().when('credit_terms', {
    is: true,
    then: () => Yup.string().required(' Choose 1 option'),
  }),
  days_after_invoice: Yup.number().when('set_credit_terms', {
    is: 'invoice_date',
    then: () => Yup.number().min(1, 'Days must be greater than 1').required('required'),
  }),
});
export const test = '';

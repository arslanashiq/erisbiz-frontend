import { EMAIL_REGEX } from 'utilities/constants';
import * as Yup from 'yup';

export const customerFormValidationSchema = Yup.object({
  customer_name: Yup.string().required('Customer Name is required'),
  email: Yup.string().matches(EMAIL_REGEX, 'Invalid email address').required('Email is required'),
  vat_reg_no: Yup.string().required('VAT Reg No is required'),
  reference_num: Yup.string().required('Reference is required'),
  invoice_country: Yup.string().required('Country is required'),
  delivery_country: Yup.string().required('Country is required'),
});
export const test = '';

import { EMAIL_REGEX } from 'utilities/constants';
import * as Yup from 'yup';

export const supplierFormValidationSchema = Yup.object({
  supplier_name: Yup.string().max(100, 'Cannot exceed 100 characters').required('Supplier Name is required'),
  email: Yup.string().matches(EMAIL_REGEX, 'Must be a valid Email').required('Email is Required'),
  account_default: Yup.string()
    .required('Account Default is required'),
  latitude: Yup.number('Must be a number').required('Location is Required'),
  longitude: Yup.number('Must be a number').required('Location is Required'),
});
export const test = '';

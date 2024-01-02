import * as Yup from 'yup';

export const chartOfAccountFormValidationSchema = Yup.object({
  account_name: Yup.string().required('Account Name is required'),
  account_type: Yup.string().required('Account Type is required'),
  account_number: Yup.string().when('is_bank', {
    is: true,
    then: () => Yup.string().required('Account Number is required'),
  }),
});
export const test = '';

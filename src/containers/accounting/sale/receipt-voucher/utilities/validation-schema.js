import { maxDecimalPoints } from 'utilities/constants';
import * as Yup from 'yup';

export const receiptVoucherFormValidationSchema = Yup.object({
  account: Yup.string().required('Customer is required'),
  chart_of_account: Yup.string().required('Deposit is required'),
  total: Yup.number()
    .min(0, 'Amount must be greater than 0')
    .test('maxDecimalPoints', 'Amount can have up to two decimal points', maxDecimalPoints)
    .required('Amount is required'),
  payment_mode: Yup.string().required('Payment Mode is required'),
  debit_account: Yup.string().required('Debit Account is required'),
  invoice_payments: Yup.array().of(
    Yup.object().shape({
      amount_applied: Yup.number()
        .min(0, 'Payment Must be greater than 0')
        .max(Yup.ref('amount_due'), 'Must be less than Amount Due')
        .test('maxDecimalPoints', 'Payment can have up to two decimal points', maxDecimalPoints)
        .required('Payment is required'),
    })
  ),
  remarks: Yup.string().max(255, 'Must be less than 255 characters'),
});
export const test = '';

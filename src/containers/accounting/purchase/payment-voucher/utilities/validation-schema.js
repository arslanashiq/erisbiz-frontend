import { maxDecimalPoints } from 'utilities/constants';
import * as Yup from 'yup';

export const paymentVoucherFormValidationSchema = Yup.object({
  supplier_id: Yup.string().required('Supplier is required'),
  chart_of_account_id: Yup.string().required('Paid Through is required'),
  total: Yup.number()
    .min(0, 'Amount must be greater than 0')
    .test('maxDecimalPoints', 'Amount can have up to two decimal points', maxDecimalPoints)
    .required('Payment Mode is required'),
  payment_mode: Yup.string().required('Amount is required'),
  bill_payments: Yup.array().of(
    Yup.object().shape({
      amount_applied: Yup.number()
        .min(0, 'Payment Must be greater than 0')
        .max(Yup.ref('amount_due'), 'Must be less than Amount Due')
        .test('maxDecimalPoints', 'Payment can have up to two decimal points', maxDecimalPoints)
        .required('Payment is require'),
    })
  ),
  credit_account_id: Yup.string().required('Credit Account is required'),
});
export const test = '';

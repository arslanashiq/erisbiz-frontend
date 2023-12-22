import * as Yup from 'yup';

export const receiptVoucherFormValidationSchema = Yup.object({
  account: Yup.string().required('Customer is required'),
  chart_of_account: Yup.string().required('Deposit is required'),
  total: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
  payment_mode: Yup.string().required('Payment Mode is required'),
  invoice_payments: Yup.array().of(
    Yup.object().shape({
      amount_applied: Yup.number()
        .min(0, 'Payment Must be greater than 0')
        .max(Yup.ref('amount_due'), 'Must be less than Amount Due')
        .required('Payment is required'),
    })
  ),
});
export const test = '';

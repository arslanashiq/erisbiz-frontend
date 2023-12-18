import * as Yup from 'yup';

export const paymentVoucherFormValidationSchema = Yup.object({
  supplier_id: Yup.string().required('Supplier is required'),
  chart_of_account_id: Yup.string().required('Paid Through is required'),
  total: Yup.number().min(1, 'Amount must be greater than 0').required('Payment Mode is required'),
  payment_mode: Yup.string().required('Amount is required'),
  bill_payments: Yup.array().of(
    Yup.object().shape({
      amount_applied: Yup.number()
        .min(0, 'Payment Must be greater than 0')
        .max(Yup.ref('amount_due'), 'Must be less than Amount Due')
        .required('Payment is require'),
    })
  ),
});
export const test = '';

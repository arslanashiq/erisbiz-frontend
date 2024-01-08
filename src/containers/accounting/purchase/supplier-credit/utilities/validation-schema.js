import * as Yup from 'yup';

export const supplierCreditFormValidationSchema = Yup.object({
  bill_id: Yup.string().required('Purchase Invoice is required'),
  supplier_id: Yup.string().required('Supplier is required'),
  debit_account_number: Yup.string().required('Debit Account is required'),
  supplier_credit_items: Yup.array().of(
    Yup.object().shape({
      discount: Yup.number().min(0, 'Must be a greater or equall to 0'),
      num_nights: Yup.number()
        .required('Required')
        .integer('Value must be an integer (without decimal)')
        .max(Yup.ref('invoice_num_nights'), 'Must be less than Purchase Invoice Item Quantity')
        .min(1, 'Must be more than 0')
        .test('max-digits', 'Maximum 10 digits are allowed', value => `${value}`.length <= 10),
    })
  ),
});
export const test = '';

import * as Yup from 'yup';

export const expensesFormValidationSchema = Yup.object({
  expense_account_id: Yup.string().required('Expense Account is required'),
  total_without_tax: Yup.number('Must be a valid Number')
    .min(1, 'Must be greate than 0')
    .required('Amount is required'),
  paid_through_account_id: Yup.string().required('Paid Through is required'),
  tax_rate_id: Yup.string().required('Tax Rate is required'),
  supplier_id: Yup.string().required('Supplier is required'),
});
export const test = '';

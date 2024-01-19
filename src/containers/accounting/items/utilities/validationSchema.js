import * as Yup from 'yup';

export const itemFormValidationSchema = Yup.object({
  item_name: Yup.string().max(50, 'Cannot exceed 50 characters').required('Item Name is required'),
  cost_price: Yup.number('Must be a number')
    .max(Yup.ref('sale_price'), 'Must Be Less than item Sale Price')
    .min(0, 'Must be Positive Number')
    .required('Cost price is required')
    .when('item_type', {
      is: 'Goods',
      then: () => Yup.number('Must be a number')
        .max(Yup.ref('sale_price'), 'Must Be Less than item Sale Price')
        .min(1, 'Must be Positive Number')
        .required('Cost price is required'),
    }),
  item_type: Yup.string().required(),
  sku_hs_code: Yup.string(),
  sale_price: Yup.number('Must be a number')
    .min(Yup.ref('cost_price'), 'Must Be Less than item Cost Price')
    .positive('Must be Positive Number')
    .required('Sale price is required'),
  is_active: Yup.bool().required('Required'),
  account_no: Yup.string().required('GL Number is required'),
  bar_code: Yup.string(),
  unit: Yup.string(),
  recorder: Yup.string(),
  description: Yup.string(),
  part_number: Yup.string(),

  brand: Yup.string().when('item_type', {
    is: 'Goods',
    then: () => Yup.string().required('Brand is required'),
  }),
  category: Yup.string().when('item_type', {
    is: 'Goods',
    then: () => Yup.string().required('Category is required'),
  }),

  supplier: Yup.number()
    .positive()
    .when('item_type', {
      is: 'Goods',
      then: () => Yup.number().positive().required('Supplier is required'),
    }),
});
export const test = '';

import * as Yup from 'yup';

export const itemFormValidationSchema = Yup.object({
  item_name: Yup.string().max(50, 'Cannot exceed 50 characters').required('Required'),
  sku_hs_code: Yup.string(),
  sale_price: Yup.number('Must be a number').positive('Must be Positive Number').required('Required'),
  cost_price: Yup.number('Must be a number').positive('Must be Positive Number').required('Required'),
  item_type: Yup.string().required(),
  is_active: Yup.bool().required('Required'),
  account_no: Yup.string(),
  bar_code: Yup.string(),
  unit: Yup.string(),
  recorder: Yup.string(),
  description: Yup.string(),
  // item_image: Yup.o(),
  part_number: Yup.string(),
  supplier: Yup.number().positive(),
  brand: Yup.number().positive(),
});
export const test = '';

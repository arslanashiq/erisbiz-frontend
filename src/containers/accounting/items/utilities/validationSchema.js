import { NAME_AND_NUMBER_REGEX } from 'utilities/constants';
import * as Yup from 'yup';

export const itemFormValidationSchema = Yup.object({
  item_name: Yup.string().max(50, 'Cannot exceed 50 characters').required('Item Name is required'),
  sku_hs_code: Yup.string().matches(NAME_AND_NUMBER_REGEX, 'SKU/HS code must be alpha numeric'),
  category: Yup.string().required('Category is required'),
  sale_price: Yup.number('Must be a number')
    .positive('Must be Positive Number')
    .required('Sale price is required'),
  cost_price: Yup.number('Must be a number')
    .positive('Must be Positive Number')
    .required('Cost price is required'),
  item_type: Yup.string().required(),
  is_active: Yup.bool().required('Required'),
  account_no: Yup.string().required('GL Number is required'),
  bar_code: Yup.string(),
  unit: Yup.string(),
  recorder: Yup.string(),
  description: Yup.string(),
  // item_image: Yup.o(),
  part_number: Yup.string().matches(NAME_AND_NUMBER_REGEX, 'Part Number must be alpha numeric'),
  supplier: Yup.number().positive().required('Supplier is required'),
  brand: Yup.string().required('Brand is required'),
});
export const test = '';

import * as Yup from 'yup';

export const supplierFormValidationSchema = Yup.object({
  supplier_name: Yup.string().max(100, 'Cannot exceed 100 characters').required('Supplier Name is required'),
  sku_hs_code: Yup.string(),

  account_default: Yup.string().required('Account Default is required'),
});
export const test = '';

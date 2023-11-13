import * as Yup from 'yup';

export const brandsFormValidationSchema = Yup.object({
  brand_name: Yup.string().required('Brand Name is required'),
  brand_region: Yup.string().required('Brand Region is required'),
});
export const test = '';
